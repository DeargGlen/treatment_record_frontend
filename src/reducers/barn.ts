import { REQUEST_STATE } from 'states';
import { BARN_SHOW_DATA } from 'apis/locations';

type BarnState = {
  fetchState: string;
  barn: BARN_SHOW_DATA;
};

const emptyBarn: BARN_SHOW_DATA = {
  id: null,
  name: '',
  blocks: [],
};

export const initialBarnState: BarnState = {
  fetchState: REQUEST_STATE.INITIAL,
  barn: emptyBarn,
};

type ValueOf<T> = T[keyof T];
type BarnAction = {
  type: ValueOf<typeof barnActionTypes>;
  payload?: { barn: void | BARN_SHOW_DATA };
};

export const barnActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
};

export const barnReducer = (
  state: BarnState,
  action: BarnAction,
): BarnState => {
  switch (action.type) {
    case barnActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case barnActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        barn: action.payload?.barn ?? emptyBarn,
      };
    default:
      throw new Error();
  }
};
