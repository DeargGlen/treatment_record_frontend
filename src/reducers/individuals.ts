import { REQUEST_STATE } from 'states';
import { INDIVIDUAL } from 'apis/individuals';

type IndividualState = {
  fetchState: string;
  individualsList: void | INDIVIDUAL[];
};
export const initialState: IndividualState = {
  fetchState: REQUEST_STATE.INITIAL,
  individualsList: [],
};

type ValueOf<T> = T[keyof T];
type IndividualAction = {
  type: ValueOf<typeof individualsActionTypes>;
  payload?: { individuals: void | INDIVIDUAL[] };
};

export const individualsActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
};

export const individualsReducer = (
  state: IndividualState,
  action: IndividualAction,
): IndividualState => {
  switch (action.type) {
    case individualsActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case individualsActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        individualsList: action.payload!.individuals,
      };
    default:
      throw new Error();
  }
};
