/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FC, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { fetchIndividual, INDIVIDUAL_SHOW_DATA } from 'apis/individuals';
import IndividualShow from 'components/organisms/IndividualShow';
import { Container } from '@mui/material';

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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fetchIndividual(individualId!)
      .then((data: void | INDIVIDUAL_SHOW_DATA) => {
        dispatch({
          type: individualActionTypes.FETCH_SUCCESS,
          payload: {
            individual: data,
          },
        });
        console.log(data);
      })
      .catch(() => 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Container maxWidth="xs">
        {individualState.fetchState === REQUEST_STATE.LOADING ? (
          <p>ロード中...</p>
        ) : (
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
          <IndividualShow individual={individualState.individualList!} />
        )}
      </Container>
    </>
  );
};

export default ShowIndividual;
