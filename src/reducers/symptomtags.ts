import { REQUEST_STATE } from 'states';
import { SYMPTOM_TAG } from 'apis/symptomtags';

type SymptomTagState = {
  fetchState: string;
  symptomTagsList: SYMPTOM_TAG[];
};

const emptySymptomTagsList: SYMPTOM_TAG[] = [];
export const initialSymptomTagState: SymptomTagState = {
  fetchState: REQUEST_STATE.INITIAL,
  symptomTagsList: emptySymptomTagsList,
};

type ValueOf<T> = T[keyof T];
type SymptomTagsAction = {
  type: ValueOf<typeof symptomTagsActionTypes>;
  payload?: { symptomTags: void | SYMPTOM_TAG[] };
};

export const symptomTagsActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
};

export const symptomTagsReducer = (
  state: SymptomTagState,
  action: SymptomTagsAction,
): SymptomTagState => {
  switch (action.type) {
    case symptomTagsActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case symptomTagsActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        symptomTagsList: action.payload?.symptomTags ?? emptySymptomTagsList,
      };
    default:
      throw new Error();
  }
};
