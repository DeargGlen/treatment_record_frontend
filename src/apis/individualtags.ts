import Cookies from 'js-cookie';
import {
  individualTagCreate,
  individualTagsIndex,
  individualTagDestroy,
} from 'urls';

import client from './client';

export type INDIVIDUAL_TAG = {
  id: number;
  name: string;
};

export type INDIVIDUAL_TAG_POST_PROPS = {
  name: string;
};

type INDIVIDUAL_TAG_SHOW_DATA = {
  individualTags: INDIVIDUAL_TAG;
};

type INDIVIDUAL_TAG_SHOW_RES = {
  data: INDIVIDUAL_TAG_SHOW_DATA;
};

export type INDIVIDUAL_TAG_DATA = {
  individualTags: INDIVIDUAL_TAG[];
};

type INDIVIDUAL_TAG_RES = {
  data: INDIVIDUAL_TAG_DATA;
};

export type INDIVIDUAL_ENTRY = {
  id: number;
  individualId: number;
  individualTagId: number;
};

type INDIVIDUAL_ENTRY_POST_PROPS = {
  individualId: number;
  individualTagId: number;
};

export interface IndividualTagOptionType {
  id?: number;
  inputValue?: string;
  name: string;
}

export const fetchIndividualTags = () =>
  client
    .get(individualTagsIndex, {
      headers: {
        'access-token': Cookies.get('_access_token') || '',
        client: Cookies.get('_client') || '',
        uid: Cookies.get('_uid') || '',
      },
    })
    .then((res: INDIVIDUAL_TAG_RES) => res.data)
    // eslint-disable-next-line no-console
    .catch((e) => console.error(e));

export const postIndividualTag = (params: INDIVIDUAL_TAG_POST_PROPS) =>
  client
    .post(
      individualTagCreate,
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
    .then((res: INDIVIDUAL_TAG_SHOW_RES) => res.data)
    .catch((e) => {
      throw e;
    });

export const postIndividualEntries = (params: INDIVIDUAL_ENTRY_POST_PROPS[]) =>
  client
    .post(individualTagCreate, params, {
      headers: {
        'access-token': Cookies.get('_access_token') || '',
        client: Cookies.get('_client') || '',
        uid: Cookies.get('_uid') || '',
      },
    })
    .then((res: INDIVIDUAL_TAG_SHOW_RES) => res.data)
    .catch((e) => {
      throw e;
    });

export const destroyIndividualTag = (tagId: number) =>
  client
    .delete(individualTagDestroy(tagId), {
      headers: {
        'access-token': Cookies.get('_access_token') || '',
        client: Cookies.get('_client') || '',
        uid: Cookies.get('_uid') || '',
      },
    })
    .then((res: INDIVIDUAL_TAG_SHOW_RES) => res.data)
    .catch((e) => {
      throw e;
    });
