import { REQUEST_STATE } from 'states';
import { INDIVIDUAL } from 'apis/individuals';

type IndividualState = {
  fetchState: string;
  individualsList: INDIVIDUAL[];
};

const emptyIndividualsList: INDIVIDUAL[] = [];
export const initialIndividualsState: IndividualState = {
  fetchState: REQUEST_STATE.INITIAL,
  individualsList: emptyIndividualsList,
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
        individualsList: action.payload?.individuals ?? emptyIndividualsList,
      };
    default:
      throw new Error();
  }
};
