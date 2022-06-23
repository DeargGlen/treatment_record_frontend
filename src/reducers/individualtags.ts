import { REQUEST_STATE } from 'states';
import { INDIVIDUAL_TAG } from 'apis/individualtags';

type IndividualTagState = {
  fetchState: string;
  individualTagsList: INDIVIDUAL_TAG[];
};

const emptyIndividualTagsList: INDIVIDUAL_TAG[] = [];
export const initialIndividualTagState: IndividualTagState = {
  fetchState: REQUEST_STATE.INITIAL,
  individualTagsList: emptyIndividualTagsList,
};

type ValueOf<T> = T[keyof T];
type IndividualTagsAction = {
  type: ValueOf<typeof individualTagsActionTypes>;
  payload?: { individualTags: void | INDIVIDUAL_TAG[] };
};

export const individualTagsActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
};

export const individualTagsReducer = (
  state: IndividualTagState,
  action: IndividualTagsAction,
): IndividualTagState => {
  switch (action.type) {
    case individualTagsActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case individualTagsActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        individualTagsList:
          action.payload?.individualTags ?? emptyIndividualTagsList,
      };
    default:
      throw new Error();
  }
};
