import {
  treatmentsIndex,
  treatmentCreate,
  treatmentShow,
  treatmentDestroy,
  treatmentUpdate,
} from 'urls/index';
import Cookies from 'js-cookie';
import { COMMENT } from 'apis/comments';
import client from './client';
import { SymptomTagOptionType } from './symptomtags';
import { DiseaseTagOptionType } from './diseasetags';
import { MedicineTagOptionType, MEDICINE_DISPLAY } from './medicinetags';

export type TREATMENT = {
  id: number;
  individualId: string;
  datetime: string;
  bodyTemperature: number;
  symptom: string;
  content: string;
  userId: number;
  userName: string;
  createdAt?: string;
  updatedAt?: string;
  symptomTags: SymptomTagOptionType[];
  diseaseTags: DiseaseTagOptionType[];
  medicineTags: MedicineTagOptionType[];
};

export type TREATMENT_POST_PROPS = {
  id?: number;
  individualId: string;
  datetime: string;
  bodyTemperature: number;
  symptom: string;
  content: string;
  userId?: number;
  userName: string;
  symptomTags: number[];
  diseaseTags: number[];
  medicineTags?: number[];
  amountEntries?: number[];
  typeEntries?: number[];
  createdAt?: string;
  updatedAt?: string;
  stool: number | null;
  feed: number | null;
  cough: number | null;
  nose: number | null;
  condition: number | null;
};

type SYMPTOM_TAG = {
  id: number;
  name: string;
  symptomTagId: number;
};

type DISEASE_TAG = {
  id: number;
  name: string;
  diseaseTagId: number;
};

export type TREATMENT_SHOW_DATA = {
  id: number;
  individualId: string | null;
  datetime: string | null;
  bodyTemperature: number | null;
  symptom: string | null;
  content: string | null;
  userId: number | null;
  userName: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  symptomTags: SYMPTOM_TAG[];
  diseaseTags: DISEASE_TAG[];
  medicineTags: MEDICINE_DISPLAY[];
  treatComments: COMMENT[];
  stool: number | null;
  feed: number | null;
  cough: number | null;
  nose: number | null;
  condition: number | null;
};

type TREATMENT_SHOW_RES = {
  data: TREATMENT_SHOW_DATA;
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
    .catch(() => null);

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
        symptom_tags: params.symptomTags,
        disease_tags: params.diseaseTags,
        medicine_tags: params.medicineTags,
        amount_entries: params.amountEntries,
        typeEntries: params.typeEntries,
        stool: params.stool,
        feed: params.feed,
        cough: params.cough,
        nose: params.nose,
        condition: params.condition,
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

export const fetchTreatment = (treatmentId: number) =>
  client
    .get(treatmentShow(treatmentId), {
      headers: {
        'access-token': Cookies.get('_access_token') || '',
        client: Cookies.get('_client') || '',
        uid: Cookies.get('_uid') || '',
      },
    })
    .then((res: TREATMENT_SHOW_RES) => res.data)
    .catch(() => ({
      id: 0,
      individualId: null,
      datetime: null,
      bodyTemperature: null,
      symptom: null,
      content: null,
      userId: null,
      userName: null,
      createdAt: null,
      updatedAt: null,
      symptomTags: [],
      diseaseTags: [],
      medicineTags: [],
      treatComments: [],
      stool: null,
      feed: null,
      cough: null,
      nose: null,
      condition: null,
    }));

export const destroyTreatment = (treatmentId: number) =>
  client
    .delete(treatmentDestroy(treatmentId), {
      headers: {
        'access-token': Cookies.get('_access_token') || '',
        client: Cookies.get('_client') || '',
        uid: Cookies.get('_uid') || '',
      },
    })
    .then((res: TREATMENT_SHOW_RES) => res.data)
    .catch(() => null);

export const updateTreatment = (params: TREATMENT_POST_PROPS) =>
  client
    .put(
      treatmentUpdate(params.id ?? 0),
      {
        individual_id: params.individualId,
        datetime: params.datetime,
        body_temperature: params.bodyTemperature,
        symptom: params.symptom,
        content: params.content,
        user_id: params.userId,
        user_name: params.userName,
        symptom_tags: params.symptomTags,
        disease_tags: params.diseaseTags,
        medicine_tags: params.medicineTags,
        amount_entries: params.amountEntries,
        type_entries: params.typeEntries,
        stool: params.stool,
        feed: params.feed,
        cough: params.cough,
        nose: params.nose,
        condition: params.condition,
      },
      {
        headers: {
          'access-token': Cookies.get('_access_token') || '',
          client: Cookies.get('_client') || '',
          uid: Cookies.get('_uid') || '',
        },
      },
    )
    .then(() => null)
    .catch(() => null);
