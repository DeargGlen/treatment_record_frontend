import { FC, useEffect, useReducer } from 'react';
import { fetchTreatments, TREATMENT } from 'apis/treatments';

// reducers
import {
  initialState,
  treatmentsActionTypes,
  treatmentsReducer,
} from 'reducers/treatments';

type DATA = {
  treatments: TREATMENT[];
};

const AllTreatments: FC = () => {
  const [state, dispatch] = useReducer(treatmentsReducer, initialState);

  useEffect(() => {
    dispatch({ type: treatmentsActionTypes.FETCHING });
    fetchTreatments()
      .then((data: void | DATA) =>
        dispatch({
          type: treatmentsActionTypes.FETCH_SUCCESS,
          payload: {
            treatments: data?.treatments,
          },
        }),
      )

      .catch(() => 1);
  }, []);

  return (
    <>
      <div>all individuals</div>
      {state.treatmentsList?.map((treatment: TREATMENT) => (
        <div>{treatment.body_temperature}</div>
      ))}
    </>
  );
};
export default AllTreatments;
