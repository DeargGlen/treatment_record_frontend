/* eslint-disable @typescript-eslint/unbound-method */
import { FC, useEffect, useReducer } from 'react';
import { fetchTreatments, TREATMENT } from 'apis/treatments';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TreatmentsList from 'components/organisms/TreatmentsList';
import { Container, Tooltip, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// components
import TreatmentSkelton from 'components/molecules/TreatmentsSkelton';

// constants
import { REQUEST_STATE } from 'states';

// reducers
import {
  initialState,
  treatmentsActionTypes,
  treatmentsReducer,
} from 'reducers/treatments';

type DATA = {
  treatments: TREATMENT[];
};

const fabStyle = {
  position: 'fixed',
  bottom: 70,
  right: 20,
};

const AllTreatments: FC = () => {
  const [state, dispatch] = useReducer(treatmentsReducer, initialState);

  useEffect(() => {
    dispatch({ type: treatmentsActionTypes.FETCHING });
    fetchTreatments()
      .then((data: void | DATA) => {
        dispatch({
          type: treatmentsActionTypes.FETCH_SUCCESS,
          payload: {
            treatments: data?.treatments,
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
            <TreatmentSkelton />
          </>
        ) : (
          <TreatmentsList treatments={state.treatmentsList} />
        )}
      </Container>
      <Tooltip title={<Typography fontSize={15}>治療の登録</Typography>}>
        <Fab
          sx={fabStyle}
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

export default AllTreatments;
