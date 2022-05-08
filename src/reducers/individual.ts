import { REQUEST_STATE } from 'states';
import { INDIVIDUAL_SHOW_DATA } from 'apis/individuals';

type IndividualState = {
  fetchState: string;
  individualList: void | INDIVIDUAL_SHOW_DATA;
};
export const initialState: IndividualState = {
  fetchState: REQUEST_STATE.INITIAL,
  individualList: {
    id: null,
    date_of_birth: null,
    age: null,
    sex: null,
    category: null,
    breed_type: null,
    mother_id: null,
    father_name: null,
    grandfather_name: null,
    date_of_introduction: null,
    name: null,
    No: null,
    created_at: null,
    updated_at: null,
    treatments: [],
  },
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
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        individualList: action.payload!.individual,
      };
    default:
      throw new Error();
  }
};
