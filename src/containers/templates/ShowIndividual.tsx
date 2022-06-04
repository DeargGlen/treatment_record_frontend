import { FC, useEffect, useReducer } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { fetchIndividual, INDIVIDUAL_SHOW_DATA } from 'apis/individuals';
import IndividualShow from 'components/organisms/IndividualShow';
import { Tooltip, Fab, Typography } from '@mui/material';
import IndividualSkelton from 'components/molecules/IndividualSkelton';
import AddIcon from '@mui/icons-material/Add';

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
        <>
          <IndividualShow individual={individualState.individual} />

          <Tooltip title={<Typography fontSize={15}>治療の登録</Typography>}>
            <Fab
              sx={{
                position: 'fixed',
                bottom: 70,
                right: 20,
              }}
              color="primary"
              aria-label="add"
              component={RouterLink}
              to="/treatments/new"
              state={{ sentIndividualId: individualState.individual.id }}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </>
      )}
    </>
  );
};

export default ShowIndividual;
