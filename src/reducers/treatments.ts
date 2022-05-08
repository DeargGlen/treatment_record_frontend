import { REQUEST_STATE } from 'states';
import { TREATMENT } from 'apis/treatments';

type TreatmentState = {
  fetchState: string;
  treatmentsList: void | TREATMENT[];
};
export const initialState: TreatmentState = {
  fetchState: REQUEST_STATE.INITIAL,
  treatmentsList: [],
};

type ValueOf<T> = T[keyof T];
type TreatmentAction = {
  type: ValueOf<typeof treatmentsActionTypes>;
  payload?: { treatments: void | TREATMENT[] };
};

export const treatmentsActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
};

export const treatmentsReducer = (
  state: TreatmentState,
  action: TreatmentAction,
): TreatmentState => {
  switch (action.type) {
    case treatmentsActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case treatmentsActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        treatmentsList: action.payload!.treatments,
      };
    default:
      throw new Error();
  }
};
