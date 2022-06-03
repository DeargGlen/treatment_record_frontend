import { FC, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { fetchIndividual, INDIVIDUAL_SHOW_DATA } from 'apis/individuals';
import TreatmentShow from 'components/organisms/TreatmentShow';
import IndividualSkelton from 'components/molecules/IndividualSkelton';

// reducers
import {
  initialState,
  individualActionTypes,
  individualReducer,
} from 'reducers/individual';

// constants
import { REQUEST_STATE } from 'states';

const ShowIndividual: FC = () => {
  const [individualState, dispatch] = useReducer(
    individualReducer,
    initialState,
  );
  const { individualId } = useParams();

  useEffect(() => {
    dispatch({ type: individualActionTypes.FETCHING });
    fetchIndividual(individualId ?? '-')
      .then((data: void | INDIVIDUAL_SHOW_DATA) => {
        console.log(data);
        dispatch({
          type: individualActionTypes.FETCH_SUCCESS,
          payload: {
            individual: data,
          },
        });
      })
      .catch(() => 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {individualState.fetchState === REQUEST_STATE.LOADING ? (
        <IndividualSkelton />
      ) : (
        <TreatmentShow individual={individualState.individual} />
      )}
    </>
  );
};

export default ShowIndividual;
