import { REQUEST_STATE } from 'states';
import { TRANSFER_SHOW_DATA } from 'apis/transfers';

type TransferShowState = {
  fetchState: string;
  transfer: TRANSFER_SHOW_DATA;
};

const emptyTransfer: TRANSFER_SHOW_DATA = {
  id: 0,
  date: null,
  completed: null,
  transferEntries: [],
};

export const initialTransferState: TransferShowState = {
  fetchState: REQUEST_STATE.INITIAL,
  transfer: emptyTransfer,
};

type ValueOf<T> = T[keyof T];
export type TransferAction = {
  type: ValueOf<typeof transferActionTypes>;
  payload?: { transfer: void | TRANSFER_SHOW_DATA };
};

export const transferActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
};

export const transferReducer = (
  state: TransferShowState,
  action: TransferAction,
): TransferShowState => {
  switch (action.type) {
    case transferActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case transferActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        transfer: action.payload?.transfer ?? emptyTransfer,
      };
    default:
      throw new Error();
  }
};
