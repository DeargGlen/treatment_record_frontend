import { FC, useEffect, useReducer, useState } from 'react';
import { fetchTreatments, TREATMENT } from 'apis/treatments';
import { Fab, Button, Tooltip, Typography, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import TreatmentsList from 'components/organisms/TreatmentsList';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { fetchSymptomTags, SYMPTOM_TAG_DATA } from 'apis/symptomtags';
import { fetchDiseaseTags, DISEASE_TAG_DATA } from 'apis/diseasetags';
import styled from 'styled-components';

// components
import TreatmentSkelton from 'components/molecules/TreatmentsSkelton';

// constants
import { REQUEST_STATE } from 'states';

// reducers
import {
  initialTreatmentsState,
  treatmentsActionTypes,
  treatmentsReducer,
} from 'reducers/treatments';
import {
  initialSymptomTagState,
  symptomTagsActionTypes,
  symptomTagsReducer,
} from 'reducers/symptomtags';
import {
  initialDiseaseTagState,
  diseaseTagsActionTypes,
  diseaseTagsReducer,
} from 'reducers/diseasetags';
import {
  initialMedicineTagState,
  medicineTagsActionTypes,
  medicineTagsReducer,
} from 'reducers/medicinetags';
import { fetchMedicineTags, MEDICINE_TAG_DATA } from 'apis/medicinetags';

type DATA = {
  treatments: TREATMENT[];
};

const Row = styled.div`
  display: flex;
`;

const AllTreatments: FC = () => {
  const location = useLocation();
  const { setSymptomTagId, setDiseaseTagId, setMedicineTagId } =
    (location.state as {
      setSymptomTagId: number | null;
      setDiseaseTagId: number | null;
      setMedicineTagId: number | null;
    }) ?? '';
  const [state, treatmentsDispatch] = useReducer(
    treatmentsReducer,
    initialTreatmentsState,
  );
  const [dateOfTreatment, setDateOfTreatment] = useState('');
  let month = '';
  const [dateJs, setDateJs] = useState(new Date());
  const [selectedList, setTreatmentsList] = useState<TREATMENT[]>(
    state.treatmentsList,
  );
  const [symptomTagState, symptomTagDispatch] = useReducer(
    symptomTagsReducer,
    initialSymptomTagState,
  );
  const [diseaseTagState, diseaseTagDispatch] = useReducer(
    diseaseTagsReducer,
    initialDiseaseTagState,
  );
  const [medicineTagState, medicineTagDispatch] = useReducer(
    medicineTagsReducer,
    initialMedicineTagState,
  );
  type TAGS = {
    symptomTag: number | null;
    diseaseTag: number | null;
    medicineTag: number | null;
  };

  const [tagValues, setTagValues] = useState<TAGS>({
    symptomTag: setSymptomTagId ?? null,
    diseaseTag: setDiseaseTagId ?? null,
    medicineTag: setMedicineTagId ?? null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setDateOfTreatment(e.target.value);
  };

  const handleTagChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setTagValues({
      ...tagValues,
      [event.target.name]: event.target.value,
    });
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
  }, [dateOfTreatment]);

  const previousDate = () => {
    dateJs.setDate(dateJs.getDate() - 1);
    if (dateOfTreatment) {
      month = `0${dateJs.getMonth()}`.slice(-2);
    } else {
      month = `0${dateJs.getMonth() + 1}`.slice(-2);
    }
    const day = `0${dateJs.getDate()}`.slice(-2);
    setDateOfTreatment(`${dateJs.getFullYear()}-${month}-${day}`);
  };

  const nextDate = () => {
    dateJs.setDate(dateJs.getDate() + 1);
    if (dateOfTreatment) {
      month = `0${dateJs.getMonth()}`.slice(-2);
    } else {
      month = `0${dateJs.getMonth() + 1}`.slice(-2);
    }

    const day = `0${dateJs.getDate()}`.slice(-2);
    setDateOfTreatment(`${dateJs.getFullYear()}-${month}-${day}`);
  };

  useEffect(() => {
    const filteredList: TREATMENT[] = state.treatmentsList.filter(
      (treatment: TREATMENT) =>
        (!tagValues.symptomTag ||
          treatment.symptomTags.find(
            ({ id }) => id === Number(tagValues.symptomTag),
          )) &&
        (!tagValues.diseaseTag ||
          treatment.diseaseTags.find(
            ({ id }) => id === Number(tagValues.diseaseTag),
          )) &&
        (!tagValues.medicineTag ||
          treatment.medicineTags.find(
            ({ id }) => id === Number(tagValues.medicineTag),
          )) &&
        (!dateOfTreatment.match(/\S/g) ||
          treatment.datetime.startsWith(dateOfTreatment)),
    );
    setTreatmentsList(filteredList);
  }, [dateOfTreatment, state.treatmentsList, tagValues]);

  useEffect(() => {
    treatmentsDispatch({ type: treatmentsActionTypes.FETCHING });
    fetchTreatments()
      .then((data: void | null | DATA) => {
        treatmentsDispatch({
          type: treatmentsActionTypes.FETCH_SUCCESS,
          payload: {
            treatments: data?.treatments,
          },
        });
      })
      .catch(() => 1);
  }, []);

  useEffect(() => {
    symptomTagDispatch({ type: symptomTagsActionTypes.FETCHING });
    fetchSymptomTags()
      .then((data: void | null | SYMPTOM_TAG_DATA) => {
        symptomTagDispatch({
          type: symptomTagsActionTypes.FETCH_SUCCESS,
          payload: {
            symptomTags: data?.symptomTags,
          },
        });
      })
      .catch(() => 1);
  }, []);

  useEffect(() => {
    diseaseTagDispatch({ type: diseaseTagsActionTypes.FETCHING });
    fetchDiseaseTags()
      .then((data: void | null | DISEASE_TAG_DATA) => {
        diseaseTagDispatch({
          type: diseaseTagsActionTypes.FETCH_SUCCESS,
          payload: {
            diseaseTags: data?.diseaseTags,
          },
        });
      })
      .catch(() => 1);
  }, []);

  useEffect(() => {
    medicineTagDispatch({ type: medicineTagsActionTypes.FETCHING });
    fetchMedicineTags()
      .then((data: void | MEDICINE_TAG_DATA) => {
        medicineTagDispatch({
          type: medicineTagsActionTypes.FETCH_SUCCESS,
          payload: {
            medicineTags: data?.medicineTags,
          },
        });
      })
      .catch(() => 1);
  }, []);

  return (
    <>
      <Row>
        <p style={{ lineHeight: 2.5 }}>日付：</p>
        <TextField
          value={dateOfTreatment}
          onChange={handleChange}
          type="date"
          name="dateOfTreatment"
          variant="standard"
          sx={{ width: 110, mt: 0.5 }}
        />
        <Button onClick={previousDate}>前の日</Button>
        <Button onClick={nextDate}>次の日</Button>
      </Row>
      <Row>
        <p style={{ lineHeight: 2.5 }}>症状タグ：</p>
        <TextField
          select
          required
          value={tagValues.symptomTag ?? ''}
          onChange={handleTagChange}
          variant="standard"
          name="symptomTag"
          sx={{ width: 100, mr: 7, mt: 0.5 }}
          SelectProps={{
            native: true,
          }}
        >
          <option value=""> </option>
          {symptomTagState.symptomTagsList.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </TextField>

        <p style={{ lineHeight: 2.5 }}>疾病タグ：</p>
        <TextField
          select
          required
          value={tagValues.diseaseTag ?? ''}
          onChange={handleTagChange}
          variant="standard"
          name="diseaseTag"
          sx={{ width: 100, mt: 0.5 }}
          SelectProps={{
            native: true,
          }}
        >
          <option value=""> </option>
          {diseaseTagState.diseaseTagsList.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </TextField>
      </Row>
      <Row>
        <p style={{ lineHeight: 2.5 }}>投薬：</p>
        <TextField
          select
          required
          value={tagValues.medicineTag ?? ''}
          onChange={handleTagChange}
          variant="standard"
          name="medicineTag"
          sx={{ width: 100, mr: 7, mt: 0.5 }}
          SelectProps={{
            native: true,
          }}
        >
          <option value=""> </option>
          {medicineTagState.medicineTagsList.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </TextField>
      </Row>
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
            bottom: 85,
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
