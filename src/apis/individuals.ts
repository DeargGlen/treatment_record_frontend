import {
  individualsIndex,
  individualShow,
  individualCreate,
  individualDestroy,
  individualUpdate,
  individualsIndexOnlyUnshipped,
  individualsIndexOnlyShipped,
} from 'urls/index';
import { TREATMENT } from 'apis/treatments';
import Cookies from 'js-cookie';
import client from 'apis/client';
import { IndividualTagOptionType } from './individualtags';

export type INDIVIDUAL = {
  id: string;
  dateOfBirth: string;
  age: number | null;
  sex: number;
  category: number;
  breedType: number;
  motherId?: string | null;
  fatherName?: string | null;
  grandfatherName?: string | null;
  grandGrandfatherName?: string | null;
  dateOfIntroduction: string | null;
  areaName: string | null;
  barnName: string | null;
  no: string | null;
  blockId: number | null;
  shipped: boolean;
  created_at: string | null;
  updated_at: string | null;
  individualTags: IndividualTagOptionType[];
};

export type INDIVIDUALS_DATA = {
  individuals: INDIVIDUAL[];
};
type INDIVIDUALS_RES = {
  data: INDIVIDUALS_DATA;
};
type INDIVIDUAL_TAG = {
  id: number;
  name: string;
  individualTagId: number;
};

export type INDIVIDUAL_SHOW_DATA = {
  id: string | null;
  dateOfBirth: string | null;
  age: number | null;
  sex: number | null;
  category: number | null;
  breedType: number | null;
  motherId?: string | null;
  fatherName?: string | null;
  grandfatherName?: string | null;
  grandGrandfatherName?: string | null;
  dateOfIntroduction: string | null;
  areaName: string | null;
  barnName: string | null;
  no: string | null;
  blockId: number | null;
  created_at?: string | null;
  updated_at?: string | null;
  treatments?: TREATMENT[];
  individualTags?: INDIVIDUAL_TAG[];
};
type INDIVIDUAL_SHOW_RES = {
  data: INDIVIDUAL_SHOW_DATA;
};

type INDIVIDUAL_POST_PROPS = {
  individualId: string;
  dateOfBirth?: string;
  sex?: number | null;
  category?: number | null;
  breedType?: number | null;
  motherId?: string;
  fatherName?: string;
  grandfatherName?: string;
  grandGrandfatherName?: string;
  dateOfIntroduction?: string;
  blockId?: number;
  individualTags?: number[];
  shipped?: boolean;
};

export const fetchIndividuals = () =>
  client
    .get(individualsIndex, {
      headers: {
        'access-token': Cookies.get('_access_token') || '',
        client: Cookies.get('_client') || '',
        uid: Cookies.get('_uid') || '',
      },
    })
    .then((res: INDIVIDUALS_RES) => res.data)
    .catch(() => ({ individuals: [] }));

export const fetchIndividualsOnlyUnshipped = () =>
  client
    .get(individualsIndexOnlyUnshipped, {
      headers: {
        'access-token': Cookies.get('_access_token') || '',
        client: Cookies.get('_client') || '',
        uid: Cookies.get('_uid') || '',
      },
    })
    .then((res: INDIVIDUALS_RES) => res.data)
    .catch(() => ({ individuals: [] }));

export const fetchIndividualsOnlyShipped = () =>
  client
    .get(individualsIndexOnlyShipped, {
      headers: {
        'access-token': Cookies.get('_access_token') || '',
        client: Cookies.get('_client') || '',
        uid: Cookies.get('_uid') || '',
      },
    })
    .then((res: INDIVIDUALS_RES) => res.data)
    .catch(() => ({ individuals: [] }));

export const fetchIndividual = (individualId: string) =>
  client
    .get(individualShow(individualId), {
      headers: {
        'access-token': Cookies.get('_access_token') || '',
        client: Cookies.get('_client') || '',
        uid: Cookies.get('_uid') || '',
      },
    })
    .then((res: INDIVIDUAL_SHOW_RES) => res.data)
    .catch(() => ({
      id: null,
      dateOfBirth: '',
      age: null,
      sex: null,
      category: null,
      breedType: null,
      dateOfIntroduction: null,
      areaName: null,
      barnName: null,
      no: null,
      blockId: null,
    }));

export const postIndividual = (params: INDIVIDUAL_POST_PROPS) =>
  client
    .post(
      individualCreate,
      {
        id: params.individualId,
        date_of_birth: params.dateOfBirth,
        sex: params.sex,
        category: params.category,
        breed_type: params.breedType,
        mother_id: params.motherId,
        father_name: params.fatherName,
        grandfather_name: params.grandfatherName,
        grand_grandfather_name: params.grandGrandfatherName,
        date_of_introduction: params.dateOfIntroduction,
        block_id: params.blockId,
        individual_tags: params.individualTags,
      },
      {
        headers: {
          'access-token': Cookies.get('_access_token') || '',
          client: Cookies.get('_client') || '',
          uid: Cookies.get('_uid') || '',
        },
      },
    )
    .then((res: INDIVIDUAL_SHOW_RES) => res.data)
    .catch((e) => {
      throw e;
    });

export const updateIndividual = (params: INDIVIDUAL_POST_PROPS) =>
  client
    .put(
      individualUpdate(params.individualId),
      {
        date_of_birth: params.dateOfBirth,
        sex: params.sex,
        category: params.category,
        breed_type: params.breedType,
        mother_id: params.motherId,
        father_name: params.fatherName,
        grandfather_name: params.grandfatherName,
        grand_grandfather_name: params.grandGrandfatherName,
        date_of_introduction: params.dateOfIntroduction,
        block_id: params.blockId,
        individual_tags: params.individualTags,
        shipped: params.shipped,
      },
      {
        headers: {
          'access-token': Cookies.get('_access_token') || '',
          client: Cookies.get('_client') || '',
          uid: Cookies.get('_uid') || '',
        },
      },
    )
    .then((res: INDIVIDUAL_SHOW_RES) => res.data)
    .catch((e) => {
      throw e;
    });

export const destroyIndividual = (individualId: string) =>
  client
    .delete(individualDestroy(individualId), {
      headers: {
        'access-token': Cookies.get('_access_token') || '',
        client: Cookies.get('_client') || '',
        uid: Cookies.get('_uid') || '',
      },
    })
    .then((res: INDIVIDUAL_SHOW_RES) => res)
    .catch(() => null);
