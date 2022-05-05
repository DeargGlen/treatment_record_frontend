import axios from 'axios';
import { treatmentsIndex } from 'urls/index';

export type TREATMENT = {
  id: number;
  individual_id: string;
  datetime: string;
  body_temperature: number;
  symptom: string;
  content: string;
  gotDosage: boolean;
  user_id: number;
  created_at: string;
  updated_at: string;
};

type DATA = {
  treatments: TREATMENT[];
};
type RES = {
  data: DATA;
};

export const fetchTreatments = () =>
  axios
    .get(treatmentsIndex)
    .then((res: RES) => res.data)
    // eslint-disable-next-line no-console
    .catch((e) => console.error(e));
