import axios from 'axios';
import { individualsIndex, individualShow } from 'urls/index';
import { TREATMENT } from 'apis/treatments';

export type INDIVIDUAL = {
  id: string;
  date_of_birth: string;
  age: number;
  sex: number;
  category: number;
  breed_type: number;
  mother_id: string;
  father_name: string;
  grandfather_name: string;
  date_of_introduction: string;
  name: string;
  No: string;
  created_at: string;
  updated_at: string;
};

export type INDIVIDUALS_DATA = {
  individuals: INDIVIDUAL[];
};
type INDIVIDUALS_RES = {
  data: INDIVIDUALS_DATA;
};

export type INDIVIDUAL_SHOW_DATA = {
  id: string | null;
  date_of_birth: string | null;
  age: number | null;
  sex: number | null;
  category: number | null;
  breed_type: number | null;
  mother_id: string | null;
  father_name: string | null;
  grandfather_name: string | null;
  date_of_introduction: string | null;
  name: string | null;
  No: string | null;
  created_at: string | null;
  updated_at: string | null;
  treatments: TREATMENT[];
};
type INDIVIDUAL_SHOW_RES = {
  data: INDIVIDUAL_SHOW_DATA;
};

export const fetchIndividuals = () =>
  axios
    .get(individualsIndex)
    .then((res: INDIVIDUALS_RES) => res.data)
    // eslint-disable-next-line no-console
    .catch((e) => console.error(e));

export const fetchIndividual = (individualId: string) =>
  axios
    .get(individualShow(individualId))
    .then((res: INDIVIDUAL_SHOW_RES) => res.data)
    // eslint-disable-next-line no-console
    .catch((e) => console.error(e));
