import { individualsIndex, individualShow, individualCreate } from 'urls/index';
import { TREATMENT } from 'apis/treatments';
import Cookies from 'js-cookie';
import client from './client';

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
  dateOfIntroduction: string | null;
  name: string | null;
  no: string | null;
  created_at: string | null;
  updated_at: string | null;
};

export type INDIVIDUALS_DATA = {
  individuals: INDIVIDUAL[];
};
type INDIVIDUALS_RES = {
  data: INDIVIDUALS_DATA;
};

export type INDIVIDUAL_SHOW_DATA = {
  id: string | null;
  dateOfBirth: string | null;
  age: number | null;
  sex: number;
  category: number;
  breedType: number;
  motherId?: string | null;
  fatherName?: string | null;
  grandfatherName?: string | null;
  dateOfIntroduction: string | null;
  name: string | null;
  no: string | null;
  created_at: string | null;
  updated_at: string | null;
  treatments: TREATMENT[];
};
type INDIVIDUAL_SHOW_RES = {
  data: INDIVIDUAL_SHOW_DATA;
};

type INDIVIDUAL_POST_PROPS = {
  individualId: string;
  dateOfBirth: string;
  sex: string;
  category: string;
  breedType: string;
  motherId?: string;
  fatherName?: string;
  grandfatherName?: string;
  dateOfIntroduction: string;
  blockId: number;
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
    .catch((e) => {
      console.error(e);
    });

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
    .catch((e) => console.error(e));

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
        date_of_introduction: params.dateOfIntroduction,
        block_id: params.blockId,
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
