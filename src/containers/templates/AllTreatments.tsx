/* eslint-disable @typescript-eslint/unbound-method */
import { FC, useEffect, useReducer, useState } from 'react';
import { fetchTreatments, TREATMENT } from 'apis/treatments';
import { Fab, Button, Tooltip, Typography, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TreatmentsList from 'components/organisms/TreatmentsList';
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

const AllTreatments: FC = () => {
  const [state, dispatch] = useReducer(treatmentsReducer, initialState);
  const [dateOfTreatment, setDateOfTreatment] = useState('');
  const [dateJs, setDateJs] = useState(new Date());
  const [selectedList, setTreatmentsList] = useState<TREATMENT[]>(
    state.treatmentsList,
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setDateOfTreatment(e.target.value);
  };

  useEffect(() => {
    if (dateOfTreatment) {
      setDateJs(
        new Date(
          Number(dateOfTreatment.slice(0, 4)),
          Number(dateOfTreatment.slice(5, 7)),
          Number(dateOfTreatment.slice(8, 10)),
        ),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateOfTreatment]);

  const previousDate = () => {
    dateJs.setDate(dateJs.getDate() - 1);
    const month = `0${dateJs.getMonth()}`.slice(-2);
    const day = `0${dateJs.getDate()}`.slice(-2);
    setDateOfTreatment(`${dateJs.getFullYear()}-${month}-${day}`);
  };

  const nextDate = () => {
    dateJs.setDate(dateJs.getDate() + 1);
    const month = `0${dateJs.getMonth()}`.slice(-2);
    const day = `0${dateJs.getDate()}`.slice(-2);
    setDateOfTreatment(`${dateJs.getFullYear()}-${month}-${day}`);
  };

  useEffect(() => {
    if (dateOfTreatment.match(/\S/g)) {
      const filteredList: TREATMENT[] = state.treatmentsList.filter(
        (treatment: TREATMENT) =>
          treatment.datetime.startsWith(dateOfTreatment),
      );
      setTreatmentsList(filteredList);

      return;
    }
    setTreatmentsList(state.treatmentsList);
  }, [state.treatmentsList, dateOfTreatment]);

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
      <TextField
        value={dateOfTreatment}
        onChange={handleChange}
        type="date"
        name="dateOfTreatment"
        variant="standard"
        sx={{ width: 110 }}
      />
      <Button onClick={previousDate}>前の日</Button>
      <Button onClick={nextDate}>次の日</Button>
      {state.fetchState === REQUEST_STATE.LOADING ? (
        <>
          <TreatmentSkelton />
        </>
      ) : (
        <TreatmentsList treatments={selectedList} />
      )}
      <Tooltip title={<Typography fontSize={15}>治療の登録</Typography>}>
        <Fab
          sx={{
            position: 'fixed',
            bottom: 75,
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

export default AllTreatments;
