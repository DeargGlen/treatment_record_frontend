import { FC, useState, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  IconButton,
} from '@mui/material';
import styled from 'styled-components';
import {
  fetchIndividualsOnlyUnshipped,
  INDIVIDUALS_DATA,
  updateIndividual,
} from 'apis/individuals';
import {
  initialIndividualsState,
  individualsActionTypes,
  individualsReducer,
} from 'reducers/individuals';
import { TRANSFER_INDIVIDUAL } from 'apis/transfers';
import EarTagImage from 'images/ear.png';
import ClearIcon from '@mui/icons-material/Clear';
import { SelectTransferIndividualsDialog } from 'components/molecules/SelectTransferIndividualsDialog';

const RowIndividual = styled.div`
  display: flex;
  justify-content: right;
`;
const WrapBox = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const UpdateShipped: FC = () => {
  const [selectedIndividuals, setSelectedIndividuals] = useState<
    TRANSFER_INDIVIDUAL[]
  >([]);

  const handleDeleteSelected = (id: string) => {
    setSelectedIndividuals(
      selectedIndividuals.filter((individual) => id !== individual.id),
    );
  };
  const navigate = useNavigate();

  const onSubmit = () => {
    selectedIndividuals.forEach((elem) => {
      updateIndividual({ individualId: elem.id, shipped: true })
        .then()
        .catch((e) => console.log(e));
    });

    navigate('/settings');
  };
  const [individualDialogOpen, setIndividualDialogOpen] = useState(false);
  const handleDialogClose = (List: TRANSFER_INDIVIDUAL[]) => {
    setSelectedIndividuals(List);
    setIndividualDialogOpen(false);
  };

  const [completeOpen, setCompleteOpen] = useState(false);
  const handleCompleteClose = () => {
    setCompleteOpen(false);
  };
  const handleClickComplete = () => {
    setCompleteOpen(true);
  };
  const handleComplete = () => {
    setCompleteOpen(false);
    onSubmit();
  };

  const [individualsState, individualsDispatch] = useReducer(
    individualsReducer,
    initialIndividualsState,
  );

  useEffect(() => {
    individualsDispatch({ type: individualsActionTypes.FETCHING });
    fetchIndividualsOnlyUnshipped()
      .then((data: void | INDIVIDUALS_DATA) => {
        individualsDispatch({
          type: individualsActionTypes.FETCH_SUCCESS,
          payload: {
            individuals: data?.individuals,
          },
        });
      })

      .catch(() => 1);
  }, []);

  return (
    <>
      <Container maxWidth="sm">
        <div style={{ fontSize: 24, textAlign: 'center' }}>治療記録の登録</div>
        <Box>
          <WrapBox>
            <div>出荷する牛：</div>
            <div style={{ textAlign: 'right' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIndividualDialogOpen(true)}
              >
                出荷する牛を選択
              </Button>
              {selectedIndividuals.length ? (
                <Divider
                  style={{
                    width: 120,
                    marginTop: 10,
                    marginLeft: 'auto',
                    marginRight: '0',
                  }}
                />
              ) : null}
              {selectedIndividuals.map((individual) => (
                <div key={individual.id}>
                  <RowIndividual>
                    <img
                      src={EarTagImage}
                      alt="tag-number"
                      width="21"
                      style={{ marginTop: 9.5, marginBottom: 9.5 }}
                    />
                    <p style={{ lineHeight: '40px' }}>
                      {individual.id.slice(5, 9)}
                    </p>
                    <IconButton
                      onClick={() => handleDeleteSelected(individual.id)}
                    >
                      <ClearIcon />
                    </IconButton>
                  </RowIndividual>
                  <Divider
                    style={{ width: 120, marginLeft: 'auto', marginRight: '0' }}
                  />
                </div>
              ))}
            </div>
          </WrapBox>
          <WrapBox>
            <div style={{ textAlign: 'right' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleClickComplete()}
              >
                決定
              </Button>
            </div>
          </WrapBox>
        </Box>
      </Container>
      {individualDialogOpen && (
        <SelectTransferIndividualsDialog
          isOpen={individualDialogOpen}
          onClose={handleDialogClose}
          selectedIndividuals={selectedIndividuals}
          individualsList={individualsState.individualsList}
        />
      )}
      <Dialog onClose={handleCompleteClose} open={completeOpen}>
        <DialogTitle>出荷済みにしますか？</DialogTitle>
        <DialogActions>
          <Button onClick={handleCompleteClose}>いいえ</Button>
          <Button onClick={handleComplete} autoFocus>
            はい
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateShipped;
