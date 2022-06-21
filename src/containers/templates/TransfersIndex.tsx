import { FC, useEffect, useReducer } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Fab, Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {
  initialTransfersState,
  transfersActionTypes,
  transfersReducer,
} from 'reducers/transfers';
import { fetchTransfers, TRANSFERS_DATA } from 'apis/transfers';
import { REQUEST_STATE } from 'states';

const TransfersIndex: FC = () => {
  const [transfersState, transferDispatch] = useReducer(
    transfersReducer,
    initialTransfersState,
  );

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
      })

      .catch(() => 1);
  }, []);

  return (
    <>
      {transfersState.fetchState === REQUEST_STATE.LOADING ? (
        <>ロード中</>
      ) : (
        <>
          <div style={{ fontSize: 24, textAlign: 'center' }}>
            予定している移動はありません
          </div>

          <Tooltip title={<Typography fontSize={15}>移動の登録</Typography>}>
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
    </>
  );
};

export default TransfersIndex;
