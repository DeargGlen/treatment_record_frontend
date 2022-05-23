import { REQUEST_STATE } from 'states';
import { INDIVIDUAL_SHOW_DATA } from 'apis/individuals';

type IndividualState = {
  fetchState: string;
  individual: INDIVIDUAL_SHOW_DATA;
};

const emptyIndividual: INDIVIDUAL_SHOW_DATA = {
  id: null,
  dateOfBirth: null,
  age: null,
  sex: 3,
  category: 4,
  breedType: 2,
  motherId: null,
  fatherName: null,
  grandfatherName: null,
  dateOfIntroduction: null,
  areaName: null,
  barnName: null,
  no: null,
  created_at: null,
  updated_at: null,
  treatments: [],
};

export const initialState: IndividualState = {
  fetchState: REQUEST_STATE.INITIAL,
  individual: emptyIndividual,
};

type ValueOf<T> = T[keyof T];
type IndividualAction = {
  type: ValueOf<typeof individualActionTypes>;
  payload?: { individual: void | INDIVIDUAL_SHOW_DATA };
};

export const individualActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
};

export const individualReducer = (
  state: IndividualState,
  action: IndividualAction,
): IndividualState => {
  switch (action.type) {
    case individualActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case individualActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        individual: action.payload?.individual ?? emptyIndividual,
      };
    default:
      throw new Error();
  }
};
