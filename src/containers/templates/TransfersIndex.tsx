import { FC, useEffect, useReducer } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Fab, Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {
  initialTransfersState,
  transfersActionTypes,
  transfersReducer,
} from 'reducers/transfers';
import { fetchTransfers, TRANSFERS_DATA, TRANSFER } from 'apis/transfers';
import { REQUEST_STATE } from 'states';
import DisplayTransfers from 'components/organisms/DisplayTransfers';

const TransfersIndex: FC = () => {
  const [transfersState, transferDispatch] = useReducer(
    transfersReducer,
    initialTransfersState,
  );
  const plannedTransfers: TRANSFER[] = [];
  const pastTransfers: TRANSFER[] = [];

  useEffect(() => {
    transferDispatch({ type: transfersActionTypes.FETCHING });
    fetchTransfers()
      .then((data: void | TRANSFERS_DATA) => {
        console.log(data);
        transferDispatch({
          type: transfersActionTypes.FETCH_SUCCESS,
          payload: {
            transfers: data?.transfers ?? [],
          },
        });
        data?.transfers.map((transfer) =>
          transfer.completed
            ? pastTransfers.push(transfer)
            : plannedTransfers.push(transfer),
        );
      })

      .catch(() => 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {transfersState.fetchState === REQUEST_STATE.LOADING ? (
        <>ロード中</>
      ) : (
        <>
          {plannedTransfers.length ? (
            <>
              <div>予定中の移動</div>
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
              <div>過去の移動</div>
              <DisplayTransfers transfers={pastTransfers} />
            </>
          ) : null}
        </>
      )}
    </>
  );
};
export default TransfersIndex;
