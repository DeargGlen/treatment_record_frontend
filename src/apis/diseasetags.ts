import Cookies from 'js-cookie';
import { diseaseTagCreate, diseaseTagDestroy, diseaseTagsIndex } from 'urls';

import client from './client';

export type DISEASE_TAG = {
  id: number;
  name: string;
};

export type DISEASE_TAG_POST_PROPS = {
  name: string;
};

type DISEASE_TAG_SHOW_DATA = {
  diseaseTags: DISEASE_TAG;
};

type DISEASE_TAG_SHOW_RES = {
  data: DISEASE_TAG_SHOW_DATA;
};

export type DISEASE_TAG_DATA = {
  diseaseTags: DISEASE_TAG[];
};

type DISEASE_TAG_RES = {
  data: DISEASE_TAG_DATA;
};

export type DISEASE_ENTRY = {
  id: number;
  treatmentId: number;
  diseaseTagId: number;
};

type DISEASE_ENTRY_POST_PROPS = {
  treatmentId: number;
  diseaseTagId: number;
};

export interface DiseaseTagOptionType {
  id?: number;
  inputValue?: string;
  name: string;
}

export const fetchDiseaseTags = () =>
  client
    .get(diseaseTagsIndex, {
      headers: {
        'access-token': Cookies.get('_access_token') || '',
        client: Cookies.get('_client') || '',
        uid: Cookies.get('_uid') || '',
      },
    })
    .then((res: DISEASE_TAG_RES) => res.data)
    // eslint-disable-next-line no-console
    .catch((e) => console.error(e));

export const postDiseaseTag = (params: DISEASE_TAG_POST_PROPS) =>
  client
    .post(
      diseaseTagCreate,
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
    .then((res: DISEASE_TAG_SHOW_RES) => res.data)
    .catch((e) => {
      throw e;
    });

export const postDiseaseEntries = (params: DISEASE_ENTRY_POST_PROPS[]) =>
  client
    .post(diseaseTagCreate, params, {
      headers: {
        'access-token': Cookies.get('_access_token') || '',
        client: Cookies.get('_client') || '',
        uid: Cookies.get('_uid') || '',
      },
    })
    .then((res: DISEASE_TAG_SHOW_RES) => res.data)
    .catch((e) => {
      throw e;
    });

export const destroyDiseaseTag = (tagId: number) =>
  client
    .delete(diseaseTagDestroy(tagId), {
      headers: {
        'access-token': Cookies.get('_access_token') || '',
        client: Cookies.get('_client') || '',
        uid: Cookies.get('_uid') || '',
      },
    })
    .then((res: DISEASE_TAG_SHOW_RES) => res.data)
    .catch((e) => {
      throw e;
    });
