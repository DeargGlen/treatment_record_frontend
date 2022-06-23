import { REQUEST_STATE } from 'states';
import { MEDICINE_TAG } from 'apis/medicinetags';

type MedicineTagState = {
  fetchState: string;
  medicineTagsList: MEDICINE_TAG[];
};

const emptyMedicineTagsList: MEDICINE_TAG[] = [];
export const initialMedicineTagState: MedicineTagState = {
  fetchState: REQUEST_STATE.INITIAL,
  medicineTagsList: emptyMedicineTagsList,
};

type ValueOf<T> = T[keyof T];
type MedicineTagsAction = {
  type: ValueOf<typeof medicineTagsActionTypes>;
  payload?: { medicineTags: void | MEDICINE_TAG[] };
};

export const medicineTagsActionTypes = {
  FETCHING: 'FETCHING',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
};

export const medicineTagsReducer = (
  state: MedicineTagState,
  action: MedicineTagsAction,
): MedicineTagState => {
  switch (action.type) {
    case medicineTagsActionTypes.FETCHING:
      return {
        ...state,
        fetchState: REQUEST_STATE.LOADING,
      };
    case medicineTagsActionTypes.FETCH_SUCCESS:
      return {
        fetchState: REQUEST_STATE.OK,
        medicineTagsList: action.payload?.medicineTags ?? emptyMedicineTagsList,
      };
    default:
      throw new Error();
  }
};
