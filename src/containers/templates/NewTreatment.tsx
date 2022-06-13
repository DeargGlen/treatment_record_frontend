/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FC, useState, useEffect, useReducer } from 'react';
import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NumberFormat from 'react-number-format';
import { Box, TextField, Button, Container } from '@mui/material';
import styled from 'styled-components';
import { postTreatment } from 'apis/treatments';
import { HTTP_STATUS_CODE } from 'states';
import { SelectIndividualDialog } from 'components/molecules/SelectIndividualDialog';
import { fetchIndividuals, INDIVIDUALS_DATA } from 'apis/individuals';
import {
  initialState,
  individualsActionTypes,
  individualsReducer,
} from 'reducers/individuals';
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
} from 'constant';

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

  const initialSelectState = {
    isOpenSelectDialog: false,
  };

  const [individualState, setIndividual] = useState(initialSelectState);

  const navigate = useNavigate();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = () => {
    const symptomEntries: number[] = [];
    const diseaseEntries: number[] = [];
    symptomTagsList.forEach((elem) => {
      symptomEntries.push(elem.id ?? 0);
    });
    diseaseTagsList.forEach((elem) => {
      diseaseEntries.push(elem.id ?? 0);
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
      stool: values.stool,
      feed: values.feed,
      cough: values.cough,
      nose: values.nose,
      condition: values.condition,
    })
      .then((res) => {
        navigate('/treatments');
        console.log(res);
      })
      .catch((e) => {
        if (e.response.status === HTTP_STATUS_CODE.NOT_ACCEPTABLE) {
          setValues({
            ...values,
            individualId: '',
            datetime: '',
            bodyTemperature: null,
            symptom: '',
            content: '',
            userId: null,
            userName: '',
          });
          setSymptomTagsList([]);
          setDiseaseTagsList([]);
        } else {
          throw e;
        }
      });
  };

  const handleClose = (value: string) => {
    setIndividual({ isOpenSelectDialog: false });
    setValues({ ...values, individualId: value });
  };

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
                  name="cnose"
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
              disabled={!!(!values.individualId || !values.datetime)}
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
