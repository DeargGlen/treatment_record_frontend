import { REQUEST_STATE } from 'states';
import { COMMENT } from 'apis/comments';

type TreatCommentState = {
  fetchState: string;
  treatCommentsList: COMMENT[];
};
export const initialState: TreatCommentState = {
  fetchState: REQUEST_STATE.INITIAL,
  treatCommentsList: [],
};
const emptyTreatCommentsList: COMMENT[] = [];

type ValueOf<T> = T[keyof T];
type TreatCommentsAction = {
  type: ValueOf<typeof treatCommentsActionTypes>;
  payload?: { treatComments: void | COMMENT[] };
};

export const treatCommentsActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
};

export const treatCommentsReducer = (
  state: TreatCommentState,
  action: TreatCommentsAction,
): TreatCommentState => {
  switch (action.type) {
    case treatCommentsActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case treatCommentsActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        treatCommentsList:
          action.payload?.treatComments ?? emptyTreatCommentsList,
      };
    default:
      throw new Error();
  }
};
