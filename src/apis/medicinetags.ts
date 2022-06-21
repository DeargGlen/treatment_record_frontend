import Cookies from 'js-cookie';
import { medicineTagCreate, medicineTagsIndex, medicineTagDestroy } from 'urls';

import client from './client';

export type MEDICINE_DISPLAY = {
  id: number;
  name: string;
  medicineTagId: number;
  amount: number;
  amountType: number;
};

export type INITIAL_MEDICINE = {
  id: number;
  tag: number;
  amount: number;
  amountType: number;
};

export type MEDICINE_TAG = {
  id: number;
  name: string;
};

export interface MedicineTagOptionType {
  id?: number;
  inputValue?: string;
  tag?: number;
  name: string;
}

export type MEDICINE_TAG_POST_PROPS = {
  name: string;
};

type MEDICINE_TAG_SHOW_DATA = {
  medicineTags: MEDICINE_TAG;
};

type MEDICINE_TAG_SHOW_RES = {
  data: MEDICINE_TAG_SHOW_DATA;
};

export type MEDICINE_TAG_DATA = {
  medicineTags: MEDICINE_TAG[];
};

type MEDICINE_TAG_RES = {
  data: MEDICINE_TAG_DATA;
};

export type MEDICINE_ENTRY = {
  id: number;
  treatmentId: number;
  medicineTagId: number;
};

type MEDICINE_ENTRY_POST_PROPS = {
  treatmentId: number;
  medicineTagId: number;
};

export const fetchMedicineTags = () =>
  client
    .get(medicineTagsIndex, {
      headers: {
        'access-token': Cookies.get('_access_token') || '',
        client: Cookies.get('_client') || '',
        uid: Cookies.get('_uid') || '',
      },
    })
    .then((res: MEDICINE_TAG_RES) => res.data)
    // eslint-disable-next-line no-console
    .catch((e) => console.error(e));

export const postMedicineTag = (params: MEDICINE_TAG_POST_PROPS) =>
  client
    .post(
      medicineTagCreate,
      {
        name: params.name,
      },
      {
        headers: {
          'access-token': Cookies.get('_access_token') || '',
          client: Cookies.get('_client') || '',
          uid: Cookies.get('_uid') || '',
        },
      },
    )
    .then((res: MEDICINE_TAG_SHOW_RES) => res.data)
    .catch((e) => {
      throw e;
    });

export const postMedicineEntries = (params: MEDICINE_ENTRY_POST_PROPS[]) =>
  client
    .post(medicineTagCreate, params, {
      headers: {
        'access-token': Cookies.get('_access_token') || '',
        client: Cookies.get('_client') || '',
        uid: Cookies.get('_uid') || '',
      },
    })
    .then((res: MEDICINE_TAG_SHOW_RES) => res.data)
    .catch((e) => {
      throw e;
    });

export const destroyMedicineTag = (tagId: number) =>
  client
    .delete(medicineTagDestroy(tagId), {
      headers: {
        'access-token': Cookies.get('_access_token') || '',
        client: Cookies.get('_client') || '',
        uid: Cookies.get('_uid') || '',
      },
    })
    .then((res: MEDICINE_TAG_SHOW_RES) => res.data)
    .catch((e) => {
      throw e;
    });
