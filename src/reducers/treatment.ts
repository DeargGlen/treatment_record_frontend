import { REQUEST_STATE } from 'states';
import { TREATMENT_SHOW_DATA } from 'apis/treatments';

type TreatmentShowState = {
  fetchState: string;
  treatment: TREATMENT_SHOW_DATA;
};

const emptyTreatment: TREATMENT_SHOW_DATA = {
  id: 0,
  individualId: null,
  datetime: null,
  bodyTemperature: null,
  symptom: null,
  content: null,
  userId: null,
  userName: null,
  created_at: null,
  treatComments: [],
};

export const initialState: TreatmentShowState = {
  fetchState: REQUEST_STATE.INITIAL,
  treatment: emptyTreatment,
};

type ValueOf<T> = T[keyof T];
export type TreatmentAction = {
  type: ValueOf<typeof treatmentActionTypes>;
  payload?: { treatment: void | TREATMENT_SHOW_DATA };
};

export const treatmentActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
};

export const treatmentReducer = (
  state: TreatmentShowState,
  action: TreatmentAction,
): TreatmentShowState => {
  switch (action.type) {
    case treatmentActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case treatmentActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        treatment: action.payload?.treatment ?? emptyTreatment,
      };
    default:
      throw new Error();
  }
};
