/* eslint-disable @typescript-eslint/unbound-method */
import { FC, useEffect, useReducer } from 'react';
import { fetchIndividuals, INDIVIDUALS_DATA } from 'apis/individuals';
import { Fab, Tooltip, Typography, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import IndividualsList from 'components/organisms/IndividualsList';

// components
import IndividualSkelton from 'components/molecules/IndividualsSkelton';

// constants
import { REQUEST_STATE } from 'states';

// reducers
import {
  initialState,
  individualsActionTypes,
  individualsReducer,
} from 'reducers/individuals';

const fabStyle = {
  position: 'fixed',
  bottom: 40,
  right: 40,
};

const AllTreatments: FC = () => {
  const [state, dispatch] = useReducer(individualsReducer, initialState);

  useEffect(() => {
    dispatch({ type: individualsActionTypes.FETCHING });
    fetchIndividuals()
      .then((data: void | INDIVIDUALS_DATA) => {
        dispatch({
          type: individualsActionTypes.FETCH_SUCCESS,
          payload: {
            individuals: data?.individuals,
          },
        });
      })

      .catch(() => 1);
  }, []);

  return (
    <>
      <Container maxWidth="sm">
        {state.fetchState === REQUEST_STATE.LOADING ? (
          <>
            <IndividualSkelton />
          </>
        ) : (
          <IndividualsList individuals={state.individualsList} />
        )}
      </Container>
      <Tooltip title={<Typography fontSize={15}>個体の登録</Typography>}>
        <Fab sx={fabStyle} color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>
    </>
  );
};

export default AllTreatments;
