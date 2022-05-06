import axios from 'axios';
import { treatmentsIndex } from 'urls/index';

export type TREATMENT = {
  id: number;
  individual_id: string;
  datetime: number;
  body_temperature: number;
  symptom: string;
  content: string;
  gotDosage: boolean;
  user_id: number;
  user_name: string;
  created_at: Date;
  updated_at: Date;
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
