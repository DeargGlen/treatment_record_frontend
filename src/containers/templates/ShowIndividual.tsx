/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FC, useEffect, useReducer } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { fetchIndividual, INDIVIDUAL_SHOW_DATA } from 'apis/individuals';
import IndividualShow from 'components/organisms/IndividualShow';
import { Container, Tooltip, Fab, Typography } from '@mui/material';
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
    fetchIndividual(individualId!)
      .then((data: void | INDIVIDUAL_SHOW_DATA) => {
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
      <Container maxWidth="xs">
        {individualState.fetchState === REQUEST_STATE.LOADING ? (
          <IndividualSkelton />
        ) : (
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
          <IndividualShow individual={individualState.individualList!} />
        )}
      </Container>
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
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    </>
  );
};

export default ShowIndividual;
