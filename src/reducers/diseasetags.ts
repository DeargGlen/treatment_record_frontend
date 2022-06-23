import { REQUEST_STATE } from 'states';
import { DISEASE_TAG } from 'apis/diseasetags';

type DiseaseTagState = {
  fetchState: string;
  diseaseTagsList: DISEASE_TAG[];
};

const emptyDiseaseTagsList: DISEASE_TAG[] = [];
export const initialDiseaseTagState: DiseaseTagState = {
  fetchState: REQUEST_STATE.INITIAL,
  diseaseTagsList: emptyDiseaseTagsList,
};

type ValueOf<T> = T[keyof T];
type DiseaseTagsAction = {
  type: ValueOf<typeof diseaseTagsActionTypes>;
  payload?: { diseaseTags: void | DISEASE_TAG[] };
};

export const diseaseTagsActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
};

export const diseaseTagsReducer = (
  state: DiseaseTagState,
  action: DiseaseTagsAction,
): DiseaseTagState => {
  switch (action.type) {
    case diseaseTagsActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case diseaseTagsActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        diseaseTagsList: action.payload?.diseaseTags ?? emptyDiseaseTagsList,
      };
    default:
      throw new Error();
  }
};
