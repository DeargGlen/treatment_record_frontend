import { FC, useState, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import {
  Box,
  TextField,
  Button,
  Container,
  Divider,
  IconButton,
} from '@mui/material';
import styled from 'styled-components';
import {
  fetchIndividualsOnlyUnshipped,
  INDIVIDUALS_DATA,
} from 'apis/individuals';
import {
  initialIndividualsState,
  individualsActionTypes,
  individualsReducer,
} from 'reducers/individuals';
import {
  initialAreaState,
  areasActionTypes,
  areasReducer,
} from 'reducers/areas';
import { initialBarnState, barnActionTypes, barnReducer } from 'reducers/barn';
import {
  postTransfer,
  TRANSFER_INDIVIDUAL,
  TRANSFER_POST_PROPS,
} from 'apis/transfers';
import {
  fetchAreas,
  AREAS_DATA,
  fetchBarn,
  BARN_SHOW_DATA,
} from 'apis/locations';
import EarTagImage from 'images/ear.png';
import ClearIcon from '@mui/icons-material/Clear';
import { SelectTransferIndividualsDialog } from 'components/molecules/SelectTransferIndividualsDialog';
import SelectTransferLocation from 'components/molecules/SelectTransferLocation';
import { SelectLocationDialog } from 'components/molecules/SelectLocationDialog';
import { SelectBlockDialog } from 'components/molecules/SelectBlockDialog';

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;
const RowIndividual = styled.div`
  display: flex;
  justify-content: right;
`;
const WrapBox = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const NewTransfer: FC = () => {
  const [date, setDate] = useState<string>();
  const [selectedIndividuals, setSelectedIndividuals] = useState<
    TRANSFER_INDIVIDUAL[]
  >([]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setDate(event.target.value);
  };
  const handleDeleteSelected = (id: string) => {
    setSelectedIndividuals(
      selectedIndividuals.filter((individual) => id !== individual.id),
    );
  };
  const [individualDialogOpen, setIndividualDialogOpen] = useState(false);
  const handleDialogClose = (List: TRANSFER_INDIVIDUAL[]) => {
    setSelectedIndividuals(List);
    setIndividualDialogOpen(false);
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

  const [areasState, areaDispatch] = useReducer(areasReducer, initialAreaState);
  const [barnState, barnDispatch] = useReducer(barnReducer, initialBarnState);
  const [barnId, setBarnId] = useState(0);
  const [blockId, setBlockId] = useState(0);
  const [barnName, setBarnName] = useState('');
  const [areaName, setAreaName] = useState('');
  const [blockNo, setBlockNo] = useState('');
  const [tmpIndividualId, setTmpIndividualId] = useState('');

  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);

  useEffect(() => {
    areaDispatch({ type: areasActionTypes.FETCHING });
    fetchAreas()
      .then((data: void | AREAS_DATA) => {
        areaDispatch({
          type: areasActionTypes.FETCH_SUCCESS,
          payload: {
            areas: data?.areas,
          },
        });
      })

      .catch(() => 1);
  }, []);

  useEffect(() => {
    if (barnId === 0) {
      return;
    }

    barnDispatch({ type: barnActionTypes.FETCHING });
    fetchBarn(barnId ?? 0)
      .then((data: void | BARN_SHOW_DATA) => {
        barnDispatch({
          type: barnActionTypes.FETCH_SUCCESS,
          payload: {
            barn: data,
          },
        });
      })
      .catch(() => 1);
  }, [barnId]);

  const handleLocationClose = (
    value: number,
    barnNameValue: string,
    areaNameValue: string,
    willOpenBlockDialog: boolean,
  ) => {
    setLocationDialogOpen(false);
    setBlockDialogOpen(willOpenBlockDialog);
    setSelectedIndividuals(
      selectedIndividuals.map((ind) =>
        ind.id === tmpIndividualId
          ? {
              ...ind,
              afterAreaName: areaNameValue,
              afterBarnName: barnNameValue,
            }
          : ind,
      ),
    );
    setBarnId(value);
    setAreaName(areaNameValue);
    setBarnName(barnNameValue);
  };

  const handleBlockClose = (blockIdValue: number, blockNoValue: string) => {
    setBlockDialogOpen(false);
    setBlockNo(blockNoValue);
    setSelectedIndividuals(
      selectedIndividuals.map((ind) =>
        ind.id === tmpIndividualId
          ? {
              ...ind,
              afterBlockNo: blockNoValue,
              afterBlockId: blockIdValue,
            }
          : ind,
      ),
    );
  };

  const handleClickSelect = (individual: TRANSFER_INDIVIDUAL) => {
    setTmpIndividualId(individual.id);
    setBarnName(individual.prevBarnName ?? '');
    setAreaName(individual.prevAreaName ?? '');
    setBlockId(individual.prevBlockId);
    setBlockNo(individual.prevBlockNo ?? '');

    setLocationDialogOpen(true);
  };

  const navigate = useNavigate();

  const [emptyInSelectedIndividualsExists, setEmptyInIndividualsExists] =
    useState(false);
  useEffect(() => {
    if (selectedIndividuals.length) {
      setEmptyInIndividualsExists(
        selectedIndividuals.some(
          (element) => typeof element.afterBlockId === 'undefined',
        ),
      );
    } else {
      setEmptyInIndividualsExists(true);
    }
  }, [selectedIndividuals]);

  const onSubmit = () => {
    const individualEntries: string[] = [];
    const prevBlockIdEntries: number[] = [];
    const afterBlockIdEntries: number[] = [];
    selectedIndividuals.forEach((elem) => {
      individualEntries.push(elem.id);
      prevBlockIdEntries.push(elem.prevBlockId);
      afterBlockIdEntries.push(elem.afterBlockId ?? 0);
    });
    postTransfer({
      date: date ?? '',
      completed: false,
      individualEntries,
      prevBlockIdEntries,
      afterBlockIdEntries,
    })
      .then(() => navigate('/transfers'))
      .catch(() => null);
  };

  return (
    <>
      <Container maxWidth="sm">
        <div style={{ fontSize: 24, textAlign: 'center' }}>移動予定の登録</div>
        <Box>
          <WrapBox>
            <div>
              日付：
              <Row>
                <TextField
                  type="date"
                  required
                  value={date ?? ''}
                  onChange={handleChange}
                  name="date"
                  variant="standard"
                  sx={{ width: 110 }}
                />
              </Row>
            </div>
          </WrapBox>
          <WrapBox>
            <div>移動する牛：</div>
            <div style={{ textAlign: 'right' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIndividualDialogOpen(true)}
              >
                移動する牛を選択
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
            <div>場所の選択：</div>
            {selectedIndividuals.length ? (
              <SelectTransferLocation
                transfer={selectedIndividuals}
                handleClickSelect={handleClickSelect}
              />
            ) : null}
          </WrapBox>
          <WrapBox>
            <div style={{ textAlign: 'right' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => onSubmit()}
                disabled={emptyInSelectedIndividualsExists || date === null}
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
      {locationDialogOpen && (
        <SelectLocationDialog
          isOpen={locationDialogOpen}
          onClose={handleLocationClose}
          selectedBarnId={barnId}
          selectedBarnName={barnName}
          selectedAreaName={areaName}
          areasList={areasState.areasList}
        />
      )}
      {blockDialogOpen && (
        <SelectBlockDialog
          isOpen={blockDialogOpen}
          onClose={handleBlockClose}
          selectedBlockId={blockId}
          selectedBlockNo={blockNo}
          barn={barnState.barn}
        />
      )}
    </>
  );
};

export default NewTransfer;
