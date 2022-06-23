import { FC, useState, useEffect, useReducer } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Fab,
  Tooltip,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  initialTransfersState,
  transfersActionTypes,
  transfersReducer,
} from 'reducers/transfers';
import {
  fetchTransfers,
  TRANSFERS_DATA,
  TRANSFER,
  updateTransfer,
  destroyTransfer,
} from 'apis/transfers';
import { REQUEST_STATE } from 'states';
import DisplayTransfers from 'components/molecules/DisplayTransfers';
import styled from 'styled-components';
import { updateIndividual } from 'apis/individuals';

const Row = styled.div`
  display: flex;
  justify-content: right;
`;

const TransfersIndex: FC = () => {
  const [transfersState, transferDispatch] = useReducer(
    transfersReducer,
    initialTransfersState,
  );
  const [plannedTransfers, setPlannedTransfers] = useState<TRANSFER[]>([]);
  const [pastTransfers, setPastTransfers] = useState<TRANSFER[]>([]);
  const [changedCount, setChangedCount] = useState(0);
  const [completeOpen, setCompleteOpen] = useState(false);
  const [destroyOpen, setDestroyOpen] = useState(false);
  const handleDeleteClose = () => {
    setDestroyOpen(false);
  };
  const handleCompleteClose = () => {
    setCompleteOpen(false);
  };
  const handleClickComplete = () => {
    setCompleteOpen(true);
  };
  const handleClickDelete = () => {
    setDestroyOpen(true);
  };
  const handleComplete = () => {
    setCompleteOpen(false);
    const individualIdList: string[] = [];
    const blockIdList: number[] = [];
    plannedTransfers.forEach((transfer) => {
      transfer.transferEntries.forEach((entry) => {
        individualIdList.push(entry.individualId);
        blockIdList.push(entry.afterBlockId);
      });
    });
    updateTransfer({
      id: plannedTransfers[0].id,
      completed: true,
    })
      .then(() => {
        individualIdList.forEach((id, index) => {
          updateIndividual({ individualId: id, blockId: blockIdList[index] })
            .then(() => setChangedCount(changedCount + 1))
            .catch(() => null);
        });
      })
      .catch(() => null);
  };
  const handleDestroy = () => {
    setDestroyOpen(false);
    destroyTransfer(plannedTransfers[0].id)
      .then(() => setChangedCount(changedCount + 1))
      .catch(() => null);
  };

  useEffect(() => {
    transferDispatch({ type: transfersActionTypes.FETCHING });
    fetchTransfers()
      .then((data: void | TRANSFERS_DATA) => {
        transferDispatch({
          type: transfersActionTypes.FETCH_SUCCESS,
          payload: {
            transfers: data?.transfers ?? [],
          },
        });
        setPlannedTransfers(
          data?.transfers.filter((transfer) => transfer?.completed === false) ??
            [],
        );
        setPastTransfers(
          data?.transfers.filter((transfer) => transfer?.completed === true) ??
            [],
        );
      })

      .catch(() => 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changedCount]);

  return (
    <>
      {transfersState.fetchState === REQUEST_STATE.LOADING ? (
        <>
          <div style={{ fontSize: 24, textAlign: 'center' }}>予定中の移動</div>
        </>
      ) : (
        <>
          {plannedTransfers.length ? (
            <>
              <div style={{ fontSize: 24, textAlign: 'center' }}>
                予定中の移動
              </div>
              <Row>
                <IconButton
                  aria-label="delete"
                  sx={{ marginRight: 1, height: 40, width: 40 }}
                  onClick={handleClickDelete}
                >
                  <DeleteIcon />
                </IconButton>
                <Button variant="contained" onClick={handleClickComplete}>
                  完了
                </Button>
              </Row>
              <DisplayTransfers transfers={plannedTransfers} />
            </>
          ) : (
            <>
              <div style={{ fontSize: 24, textAlign: 'center' }}>
                予定している移動はありません
              </div>
              <Tooltip
                title={<Typography fontSize={15}>移動の登録</Typography>}
              >
                <Fab
                  color="primary"
                  aria-label="add"
                  component={RouterLink}
                  to="/transfers/new"
                  sx={{ position: 'fixed', bottom: 85, right: 20 }}
                >
                  <AddIcon />
                </Fab>
              </Tooltip>
            </>
          )}
          {pastTransfers.length ? (
            <>
              <div style={{ fontSize: 24, textAlign: 'center' }}>
                過去の移動
              </div>
              <DisplayTransfers transfers={pastTransfers} />
            </>
          ) : null}
        </>
      )}
      <Dialog onClose={handleDeleteClose} open={destroyOpen}>
        <DialogTitle>移動の予定を取り消しますか？</DialogTitle>
        <DialogActions>
          <Button onClick={handleDeleteClose}>いいえ</Button>
          <Button onClick={handleDestroy} autoFocus>
            はい
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog onClose={handleCompleteClose} open={completeOpen}>
        <DialogTitle>移動を完了しますか？</DialogTitle>
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
export default TransfersIndex;
