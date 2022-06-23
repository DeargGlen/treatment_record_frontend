import { REQUEST_STATE } from 'states';
import { TRANSFER } from 'apis/transfers';

type TransferState = {
  fetchState: string;
  transfersList: TRANSFER[];
};
export const initialTransfersState: TransferState = {
  fetchState: REQUEST_STATE.INITIAL,
  transfersList: [],
};
const emptyTransfersList: TRANSFER[] = [];

type ValueOf<T> = T[keyof T];
type TransferAction = {
  type: ValueOf<typeof transfersActionTypes>;
  payload?: { transfers: void | TRANSFER[] };
};

export const transfersActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
};

export const transfersReducer = (
  state: TransferState,
  action: TransferAction,
): TransferState => {
  switch (action.type) {
    case transfersActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case transfersActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        transfersList: action.payload?.transfers ?? emptyTransfersList,
      };
    default:
      throw new Error();
  }
};
