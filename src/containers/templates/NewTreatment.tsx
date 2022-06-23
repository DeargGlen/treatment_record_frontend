/* eslint-disable react/jsx-props-no-spreading */
import { FC, useState, useEffect, useReducer } from 'react';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { Box, TextField, Button, Container, IconButton } from '@mui/material';
import styled from 'styled-components';
import { postTreatment } from 'apis/treatments';
import { SelectIndividualDialog } from 'components/molecules/SelectIndividualDialog';
import { fetchIndividuals, INDIVIDUALS_DATA } from 'apis/individuals';
import {
  initialIndividualsState,
  individualsActionTypes,
  individualsReducer,
} from 'reducers/individuals';
import DeleteIcon from '@mui/icons-material/Delete';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import SymptomTagRegister from 'components/molecules/SymptomTagRegister';
import DiseaseTagRegister from 'components/molecules/DiseaseTagRegister';
import { SymptomTagOptionType } from 'apis/symptomtags';
import { DiseaseTagOptionType } from 'apis/diseasetags';
import {
  conditionList,
  coughList,
  feedList,
  stoolList,
  noseList,
  medicineTypeList,
} from 'constant';
import {
  initialMedicineTagState,
  medicineTagsActionTypes,
  medicineTagsReducer,
} from 'reducers/medicinetags';
import {
  fetchMedicineTags,
  MedicineTagOptionType,
  MEDICINE_TAG_DATA,
  postMedicineTag,
} from 'apis/medicinetags';

interface State {
  sentIndividualId: string;
}

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;
const WrapBox = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`;

const IndividualIdInput = React.forwardRef<NumberFormat<number>, CustomProps>(
  (props, ref) => {
    const { onChange, ...other } = props;

    return (
      <NumberFormat
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        isNumericString
        format="#####.####.#"
        placeholder="*****.****.*"
        mask="*"
      />
    );
  },
);

const BodyTemperatureInput = React.forwardRef<
  NumberFormat<number>,
  CustomProps
>((props, ref) => {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      isNumericString
      format="##.#℃"
      placeholder="**.*℃"
      mask="*"
    />
  );
});

interface TreatmentState {
  individualId: string;
  datetime: string;
  bodyTemperature: number | null;
  symptom: string;
  content: string;
  userId: number | null;
  userName: string;
  stool: number | null;
  feed: number | null;
  cough: number | null;
  condition: number | null;
  nose: number | null;
}

interface DosageTagType {
  inputValue?: string;
  name: string;
}

interface DosageType {
  id: number;
  tag: number | null;
  amount: number | null;
  amountType: number | null;
}

const filter = createFilterOptions<DosageTagType>();

const NewTreatment: FC = () => {
  const location = useLocation();
  const { sentIndividualId } = (location.state as State) ?? '';
  const now = new Date();
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
  const setDate = now.toISOString().slice(0, -8);
  const [values, setValues] = React.useState<TreatmentState>({
    individualId: sentIndividualId ?? '',
    datetime: setDate ?? '',
    bodyTemperature: null,
    symptom: '',
    content: '',
    userId: null,
    userName: '',
    stool: null,
    feed: null,
    cough: null,
    nose: null,
    condition: null,
  });
  const [symptomTagsList, setSymptomTagsList] = useState<
    SymptomTagOptionType[]
  >([]);
  const [diseaseTagsList, setDiseaseTagsList] = useState<
    DiseaseTagOptionType[]
  >([]);
  const [dosages, setDosages] = useState<DosageType[]>([
    { id: Math.random(), tag: null, amount: null, amountType: null },
  ]);
  const [, medicineDispatch] = useReducer(
    medicineTagsReducer,
    initialMedicineTagState,
  );
  const [tagsList, setTagsList] = useState<MedicineTagOptionType[]>([]);
  const [changedCount, setChangedCount] = useState(0);

  useEffect(() => {
    medicineDispatch({ type: medicineTagsActionTypes.FETCHING });
    fetchMedicineTags()
      .then((data: void | MEDICINE_TAG_DATA) => {
        medicineDispatch({
          type: medicineTagsActionTypes.FETCH_SUCCESS,
          payload: {
            medicineTags: data?.medicineTags,
          },
        });
        setTagsList(data?.medicineTags ?? []);
      })

      .catch(() => 1);
  }, [changedCount]);

  const initialSelectState = {
    isOpenSelectDialog: false,
  };

  const [individualState, setIndividual] = useState(initialSelectState);

  const navigate = useNavigate();

  const onDosageClick = () => {
    setDosages(
      dosages.concat({
        id: Math.random(),
        tag: null,
        amount: null,
        amountType: null,
      }),
    );
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleDosageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    // dosageのindexのところだけ値を変更する
    if (event.target.name === 'amount') {
      setDosages(
        dosages.map((dosage, i) =>
          i === index
            ? {
                ...dosage,
                [event.target.name]: event.target.value,
              }
            : dosage,
        ),
      );
    } else {
      setDosages(
        dosages.map((dosage, i) =>
          i === index
            ? {
                ...dosage,
                [event.target.name]: event.target.value,
              }
            : dosage,
        ),
      );
    }
  };

  const handleDeleteClick = (index: number) => {
    setDosages(dosages.filter((dos, i) => index !== i));
  };

  const onSubmit = () => {
    const symptomEntries: number[] = [];
    const diseaseEntries: number[] = [];
    const medicineEntries: number[] = [];
    const amountEntries: number[] = [];
    const typeEntries: number[] = [];
    symptomTagsList.forEach((elem) => {
      if (elem.id) {
        symptomEntries.push(elem.id);
      }
    });
    diseaseTagsList.forEach((elem) => {
      if (elem.id) {
        diseaseEntries.push(elem.id);
      }
    });
    dosages.forEach((elem) => {
      if (elem.tag) {
        medicineEntries.push(elem.tag);
      }
      if (elem.amount) {
        amountEntries.push(elem.amount);
      }
      if (elem.amountType) {
        typeEntries.push(elem.amountType);
      }
    });

    postTreatment({
      individualId: values.individualId,
      datetime: values.datetime,
      bodyTemperature: values.bodyTemperature ? values.bodyTemperature / 10 : 0,
      symptom: values.symptom,
      content: values.content,
      userId: values.userId ?? 0,
      userName: values.userName,
      symptomTags: symptomEntries,
      diseaseTags: diseaseEntries,
      medicineTags: medicineEntries,
      amountEntries,
      typeEntries,
      stool: values.stool,
      feed: values.feed,
      cough: values.cough,
      nose: values.nose,
      condition: values.condition,
    })
      .then(() => {
        navigate('/treatments');
      })
      .catch(() => null);
  };

  const handleClose = (value: string) => {
    setIndividual({ isOpenSelectDialog: false });
    setValues({ ...values, individualId: value });
  };

  const [state, dispatch] = useReducer(
    individualsReducer,
    initialIndividualsState,
  );

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
        <div style={{ fontSize: 24, textAlign: 'center' }}>治療記録の登録</div>
        <Box>
          <WrapBox style={{ marginTop: 10 }}>
            <div>耳標番号(必須)：</div>
            <Row>
              <TextField
                value={values.individualId}
                onChange={handleChange}
                name="individualId"
                InputProps={{
                  inputComponent: IndividualIdInput as never,
                }}
                variant="standard"
                sx={{ width: 100, textAlign: 'right' }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() =>
                  setIndividual({
                    isOpenSelectDialog: true,
                  })
                }
              >
                個体の選択
              </Button>
            </Row>
          </WrapBox>
          <WrapBox>
            <div>日時(必須)：</div>
            <div>
              <TextField
                type="datetime-local"
                value={values.datetime}
                onChange={handleChange}
                name="datetime"
                variant="standard"
                sx={{ width: 160 }}
              />
            </div>
          </WrapBox>
          <WrapBox>
            <div>体温：</div>
            <div>
              <TextField
                value={values.bodyTemperature}
                onChange={handleChange}
                name="bodyTemperature"
                InputProps={{
                  inputComponent: BodyTemperatureInput as never,
                }}
                variant="standard"
                sx={{ width: 55, textAlign: 'right' }}
              />
            </div>
          </WrapBox>
          <WrapBox>
            <div>症状タグ：</div>
            <div>
              <SymptomTagRegister
                selectedTagsList={symptomTagsList}
                setSelectedTagsList={setSymptomTagsList}
              />
            </div>
          </WrapBox>
          <WrapBox>
            <div>症状の詳細：</div>
            <div>
              <TextField
                value={values.symptom}
                onChange={handleChange}
                name="symptom"
                variant="standard"
                fullWidth
                multiline
                maxRows={4}
              />
            </div>
          </WrapBox>

          <WrapBox>
            <div>疾病タグ：</div>
            <div>
              <DiseaseTagRegister
                selectedTagsList={diseaseTagsList}
                setSelectedTagsList={setDiseaseTagsList}
              />
            </div>
          </WrapBox>

          <WrapBox>
            <div>投薬：</div>
            {dosages.map((dosage, index) => (
              <Row key={dosage.id}>
                <Autocomplete
                  onChange={(event, newValue) => {
                    if (newValue && newValue.inputValue) {
                      postMedicineTag({
                        name: newValue.inputValue ?? '',
                      })
                        .then(() => {
                          setChangedCount(changedCount + 1);
                          setDosages(
                            dosages.map((dos, i) =>
                              i === index
                                ? {
                                    id: dos.id,
                                    tag: tagsList.length + 1,
                                    amount: dos.amount,
                                    amountType: dos.amountType,
                                  }
                                : dos,
                            ),
                          );
                        })
                        .catch(() => null);
                    } else {
                      setDosages(
                        dosages.map((dos, i) =>
                          i === index
                            ? {
                                id: dos.id,
                                tag: newValue ? Number(newValue?.id) : null,
                                amount: dos.amount,
                                amountType: dos.amountType,
                              }
                            : dos,
                        ),
                      );
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    const { inputValue } = params;
                    // Suggest the creation of a new value
                    const isExisting = options.some(
                      (option) => inputValue === option.name,
                    );
                    if (inputValue !== '' && !isExisting) {
                      filtered.push({
                        inputValue,
                        name: `Add "${inputValue}"`,
                      });
                    }

                    return filtered;
                  }}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  id="medicine-tag"
                  options={tagsList}
                  isOptionEqualToValue={(option, value) => {
                    if (value.inputValue) {
                      if (value.inputValue === option.name) {
                        return true;
                      }

                      return false;
                    }
                    if (option.name === value.name) {
                      return true;
                    }

                    return false;
                  }}
                  getOptionLabel={(option) => {
                    // Value selected with enter, right from the input
                    if (typeof option === 'string') {
                      return option;
                    }
                    // Add "xxx" option created dynamically
                    if (option.inputValue) {
                      return option.inputValue;
                    }

                    // Regular option
                    return option.name;
                  }}
                  renderOption={(props, option) => (
                    <li {...props}>{option.name}</li>
                  )}
                  sx={{ width: 200 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="medicineタグ"
                      variant="standard"
                    />
                  )}
                />
                <TextField
                  type="numebr"
                  value={dosage.amount ?? ''}
                  onChange={(e) => handleDosageChange(e, index)}
                  name="amount"
                  variant="standard"
                  sx={{ width: 100, textAlign: 'right' }}
                  placeholder="量"
                />
                <TextField
                  select
                  required
                  value={dosage.amountType ?? ''}
                  onChange={(e) => handleDosageChange(e, index)}
                  variant="standard"
                  name="amountType"
                  sx={{ width: 80 }}
                  SelectProps={{
                    native: true,
                  }}
                  placeholder="分量タイプ"
                >
                  <option disabled value="">
                    {' '}
                  </option>
                  {medicineTypeList.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
                {dosages.length !== 1 ? (
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteClick(index)}
                    sx={{ height: 22, width: 22 }}
                  >
                    <DeleteIcon />
                  </IconButton>
                ) : null}
              </Row>
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={onDosageClick}
              disabled={
                !dosages.slice(-1)[0].tag &&
                !dosages.slice(-1)[0].amount &&
                dosages.slice(-1)[0].amountType == null
              }
            >
              追加
            </Button>
          </WrapBox>
          <WrapBox>
            <div>治療内容：</div>
            <div>
              <TextField
                value={values.content}
                onChange={handleChange}
                name="content"
                variant="standard"
                fullWidth
                multiline
                maxRows={4}
              />
            </div>
          </WrapBox>
          <WrapBox>
            <div>
              便の様子：
              <Row>
                <TextField
                  select
                  required
                  value={values.stool ?? ''}
                  onChange={handleChange}
                  variant="standard"
                  name="stool"
                  sx={{ width: 200 }}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option disabled value="">
                    {' '}
                  </option>
                  {stoolList.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Row>
            </div>
          </WrapBox>
          <WrapBox>
            <div>
              餌の食べ具合：
              <Row>
                <TextField
                  select
                  required
                  value={values.feed ?? ''}
                  onChange={handleChange}
                  variant="standard"
                  name="feed"
                  sx={{ width: 200 }}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option disabled value="">
                    {' '}
                  </option>
                  {feedList.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Row>
            </div>
          </WrapBox>
          <WrapBox>
            <div>
              咳の様子：
              <Row>
                <TextField
                  select
                  required
                  value={values.cough ?? ''}
                  onChange={handleChange}
                  variant="standard"
                  name="cough"
                  sx={{ width: 200 }}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option disabled value="">
                    {' '}
                  </option>
                  {coughList.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Row>
            </div>
          </WrapBox>
          <WrapBox>
            <div>
              鼻水の様子：
              <Row>
                <TextField
                  select
                  required
                  value={values.nose ?? ''}
                  onChange={handleChange}
                  variant="standard"
                  name="nose"
                  sx={{ width: 200 }}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option disabled value="">
                    {' '}
                  </option>
                  {noseList.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Row>
            </div>
          </WrapBox>
          <WrapBox>
            <div>
              全体的な様子：
              <Row>
                <TextField
                  select
                  required
                  value={values.condition ?? ''}
                  onChange={handleChange}
                  variant="standard"
                  name="condition"
                  sx={{ width: 200 }}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option disabled value="">
                    {' '}
                  </option>
                  {conditionList.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Row>
            </div>
          </WrapBox>
          <div style={{ textAlign: 'right' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={onSubmit}
              disabled={
                !values.individualId ||
                !values.datetime ||
                (dosages.slice(-1)[0].tag && !dosages.slice(-1)[0].amount) ||
                (dosages.slice(-1)[0].amount &&
                  dosages.slice(-1)[0].amountType === null) ||
                (!dosages.slice(-1)[0].tag &&
                  dosages.slice(-1)[0].amountType !== null)
              }
            >
              登録
            </Button>
          </div>
        </Box>
      </Container>
      {individualState.isOpenSelectDialog && (
        <SelectIndividualDialog
          isOpen={individualState.isOpenSelectDialog}
          onClose={handleClose}
          selectedIndividual={values.individualId}
          individualsList={state.individualsList}
        />
      )}
    </>
  );
};

export default NewTreatment;
