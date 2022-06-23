import Cookies from 'js-cookie';
import { symptomTagCreate, symptomTagsIndex, symptomTagDestroy } from 'urls';

import client from './client';

export type SYMPTOM_TAG = {
  id: number;
  name: string;
};

export type SYMPTOM_TAG_POST_PROPS = {
  name: string;
};

type SYMPTOM_TAG_SHOW_DATA = {
  symptomTags: SYMPTOM_TAG;
};

type SYMPTOM_TAG_SHOW_RES = {
  data: SYMPTOM_TAG_SHOW_DATA;
};

export type SYMPTOM_TAG_DATA = {
  symptomTags: SYMPTOM_TAG[];
};

type SYMPTOM_TAG_RES = {
  data: SYMPTOM_TAG_DATA;
};

export type SYMPTOM_ENTRY = {
  id: number;
  treatmentId: number;
  symptomTagId: number;
};

type SYMPTOM_ENTRY_POST_PROPS = {
  treatmentId: number;
  symptomTagId: number;
};

export interface SymptomTagOptionType {
  id?: number;
  inputValue?: string;
  name: string;
}

export const fetchSymptomTags = () =>
  client
    .get(symptomTagsIndex, {
      headers: {
        'access-token': Cookies.get('_access_token') || '',
        client: Cookies.get('_client') || '',
        uid: Cookies.get('_uid') || '',
      },
    })
    .then((res: SYMPTOM_TAG_RES) => res.data)
    .catch(() => ({ symptomTags: [] }));

export const postSymptomTag = (params: SYMPTOM_TAG_POST_PROPS) =>
  client
    .post(
      symptomTagCreate,
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
    .then((res: SYMPTOM_TAG_SHOW_RES) => res.data)
    .catch((e) => {
      throw e;
    });

export const postSymptomEntries = (params: SYMPTOM_ENTRY_POST_PROPS[]) =>
  client
    .post(symptomTagCreate, params, {
      headers: {
        'access-token': Cookies.get('_access_token') || '',
        client: Cookies.get('_client') || '',
        uid: Cookies.get('_uid') || '',
      },
    })
    .then((res: SYMPTOM_TAG_SHOW_RES) => res.data)
    .catch((e) => {
      throw e;
    });

export const destroySymptomTag = (tagId: number) =>
  client
    .delete(symptomTagDestroy(tagId), {
      headers: {
        'access-token': Cookies.get('_access_token') || '',
        client: Cookies.get('_client') || '',
        uid: Cookies.get('_uid') || '',
      },
    })
    .then((res: SYMPTOM_TAG_SHOW_RES) => res.data)
    .catch((e) => {
      throw e;
    });
