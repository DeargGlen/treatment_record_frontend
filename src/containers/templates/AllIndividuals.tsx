import { FC, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { individualsIndex } from 'urls';

type INDIVIDUAL = {
  id: string;
  date_of_birth: string;
  sex: number;
  category: number;
  breed_type: number;
  mother_id: string;
  father_name: string;
  grandfather_name: string;
  date_of_introduction: string;
  block_id: number;
  created_at: string;
  updated_at: string;
};

const AllIndividuals: FC = () => {
  useEffect(() => {
    axios
      .get(individualsIndex)
      // eslint-disable-next-line no-console
      .then((res: AxiosResponse<INDIVIDUAL[]>) => console.log(res.data))
      // eslint-disable-next-line no-console
      .catch((e) => console.error(e));
  }, []);

  return (
    <>
      <div>all individuals</div>
    </>
  );
};

export default AllIndividuals;
