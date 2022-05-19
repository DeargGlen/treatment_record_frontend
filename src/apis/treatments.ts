import axios from 'axios';
import { treatmentsIndex, treatmentCreate } from 'urls/index';
import Cookies from 'js-cookie';

export type TREATMENT = {
  id: number;
  individual_id: string;
  datetime: string;
  body_temperature: number;
  symptom: string;
  content: string;
  gotDosage: boolean;
  user_id: number;
  user_name: string;
  created_at?: Date;
  updated_at?: Date;
};

export type TREATMENT_POST_PROPS = {
  individualId: string;
  datetime: string;
  bodyTemperature: number;
  symptom: string;
  content: string;
  gotDosage: boolean;
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
  axios
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
  axios
    .post(
      treatmentCreate,
      {
        individual_id: params.individualId,
        datetime: params.datetime,
        body_temperature: params.bodyTemperature,
        symptom: params.symptom,
        content: params.content,
        gotDosage: params.gotDosage,
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
