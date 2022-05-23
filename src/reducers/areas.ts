import { REQUEST_STATE } from 'states';
import { AREA_WITH_BARNS } from 'apis/locations';

type AreaState = {
  fetchState: string;
  areasList: AREA_WITH_BARNS[];
};

const emptyAreasList: AREA_WITH_BARNS[] = [];
export const initialAreaState: AreaState = {
  fetchState: REQUEST_STATE.INITIAL,
  areasList: emptyAreasList,
};

type ValueOf<T> = T[keyof T];
type AreaAction = {
  type: ValueOf<typeof areasActionTypes>;
  payload?: { areas: void | AREA_WITH_BARNS[] };
};

export const areasActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
};

export const areasReducer = (
  state: AreaState,
  action: AreaAction,
): AreaState => {
  switch (action.type) {
    case areasActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case areasActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        areasList: action.payload?.areas ?? emptyAreasList,
      };
    default:
      throw new Error();
  }
};
