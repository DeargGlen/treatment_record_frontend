import { treatmentsIndex, treatmentCreate } from 'urls/index';
import Cookies from 'js-cookie';
import client from './client';

export type TREATMENT = {
  id: number;
  individualId: string;
  datetime: string;
  bodyTemperature: number;
  symptom: string;
  content: string;
  userId: number;
  userName: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type TREATMENT_POST_PROPS = {
  individualId: string;
  datetime: string;
  bodyTemperature: number;
  symptom: string;
  content: string;
  userId: number;
  userName: string;
  created_at?: Date;
  updated_at?: Date;
};

type TREATMENT_DATA = {
  treatments: TREATMENT[];
};

type TREATMENT_RES = {
  data: TREATMENT_DATA;
};

export const fetchTreatments = () =>
  client
    .get(treatmentsIndex, {
      headers: {
        'access-token': Cookies.get('_access_token') || '',
        client: Cookies.get('_client') || '',
        uid: Cookies.get('_uid') || '',
      },
    })
    .then((res: TREATMENT_RES) => res.data)
    // eslint-disable-next-line no-console
    .catch((e) => console.error(e));

export const postTreatment = (params: TREATMENT_POST_PROPS) =>
  client
    .post(
      treatmentCreate,
      {
        individual_id: params.individualId,
        datetime: params.datetime,
        body_temperature: params.bodyTemperature,
        symptom: params.symptom,
        content: params.content,
        user_id: params.userId,
        user_name: params.userName,
      },
      {
        headers: {
          'access-token': Cookies.get('_access_token') || '',
          client: Cookies.get('_client') || '',
          uid: Cookies.get('_uid') || '',
        },
      },
    )
    .then((res: TREATMENT_RES) => res.data)
    .catch((e) => {
      throw e;
    });
