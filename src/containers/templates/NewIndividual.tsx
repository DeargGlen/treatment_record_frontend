import { FC, useState, useEffect, useReducer } from 'react';
import * as React from 'react';
import NumberFormat from 'react-number-format';
import { Box, TextField, Button, Container } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import AlertMessage from 'components/molecules/AlertMessage';
import {
  postIndividual,
  fetchIndividuals,
  INDIVIDUALS_DATA,
} from 'apis/individuals';
import { SelectIndividualDialog } from 'components/molecules/SelectIndividualDialog';
import { SelectLocationDialog } from 'components/molecules/SelectLocationDialog';
import { SelectBlockDialog } from 'components/molecules/SelectBlockDialog';
import IndividualTagRegister from 'components/molecules/IndividualTagRegister';
import { IndividualTagOptionType } from 'apis/individualtags';
import {
  initialIndividualsState,
  individualsActionTypes,
  individualsReducer,
} from 'reducers/individuals';
import {
  fetchAreas,
  AREAS_DATA,
  fetchBarn,
  BARN_SHOW_DATA,
} from 'apis/locations';
import { sexList, categoryList, breedTypeList } from 'constant';
import {
  initialAreaState,
  areasActionTypes,
  areasReducer,
} from 'reducers/areas';
import { initialBarnState, barnActionTypes, barnReducer } from 'reducers/barn';

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

interface State {
  individualId: string;
  dateOfBirth: string;
  sex: number | null;
  category: number | null;
  breedType: number | null;
  motherId: string;
  fatherName: string;
  grandfatherName: string;
  grandGrandfatherName: string;
  dateOfIntroduction: string;
  blockId: number;
}

const NewIndividual: FC = () => {
  const [values, setValues] = React.useState<State>({
    individualId: '',
    dateOfBirth: '',
    sex: null,
    category: null,
    breedType: null,
    dateOfIntroduction: '',
    fatherName: '',
    grandfatherName: '',
    grandGrandfatherName: '',
    blockId: 1,
    motherId: '',
  });

  const [individualDialogOpen, setIndividualDialogOpen] = useState(false);
  const [blockDialogOpen, setBlockDialogOpen] = useState(false);
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);

  const [barnId, setBarnId] = useState(0);
  const [barnName, setBarnName] = useState('');
  const [areaName, setAreaName] = useState('');
  const [blockNo, setBlockNo] = useState('');
  const [individualTagsList, setIndividualTagsList] = useState<
    IndividualTagOptionType[]
  >([]);

  const navigate = useNavigate();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
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

  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const [areasState, areaDispatch] = useReducer(areasReducer, initialAreaState);
  const [barnState, barnDispatch] = useReducer(barnReducer, initialBarnState);

  useEffect(() => {
    areaDispatch({ type: areasActionTypes.FETCHING });
    fetchAreas()
      .then((data: void | AREAS_DATA) => {
        areaDispatch({
          type: areasActionTypes.FETCH_SUCCESS,
          payload: {
            areas: data?.areas,
          },
        });
      })

      .catch(() => 1);
  }, []);

  useEffect(() => {
    if (barnId === 0) {
      return;
    }

    barnDispatch({ type: barnActionTypes.FETCHING });
    fetchBarn(barnId ?? 0)
      .then((data: void | BARN_SHOW_DATA) => {
        barnDispatch({
          type: barnActionTypes.FETCH_SUCCESS,
          payload: {
            barn: data,
          },
        });
      })
      .catch(() => 1);
  }, [barnId]);

  const handleIndividualClose = (value: string) => {
    setIndividualDialogOpen(false);
    setValues({ ...values, motherId: value });
  };

  const handleLocationClose = (
    value: number,
    barnNameValue: string,
    areaNameValue: string,
    willOpenBlockDialog: boolean,
  ) => {
    setLocationDialogOpen(true);
    setBarnId(value);
    setBarnName(barnNameValue);
    setAreaName(areaNameValue);
    setBlockDialogOpen(willOpenBlockDialog);
  };

  const handleBlockClose = (blockIdValue: number, blockNoValue: string) => {
    setBlockDialogOpen(false);
    setBlockNo(blockNoValue);
    setValues({ ...values, blockId: blockIdValue });
  };

  const onSubmit = () => {
    const individualEntries: number[] = [];
    individualTagsList.forEach((elem) => {
      individualEntries.push(elem.id ?? 0);
    });
    postIndividual({
      individualId: values.individualId,
      dateOfBirth: values.dateOfBirth,
      category: values.category,
      sex: values.sex,
      breedType: values.breedType,
      motherId: values.motherId ?? '',
      fatherName: values.fatherName ?? '',
      grandfatherName: values.grandfatherName ?? '',
      grandGrandfatherName: values.grandGrandfatherName ?? '',
      dateOfIntroduction: values.dateOfIntroduction,
      blockId: values.blockId ?? 1,
      individualTags: individualEntries,
    })
      .then(() => navigate('/individuals'))
      .catch(() => {
        setAlertMessageOpen(true);
      });
  };

  return (
    <>
      <Container maxWidth="sm">
        <div style={{ fontSize: 24, textAlign: 'center' }}>個体の登録</div>
        <Box>
          <WrapBox style={{ marginTop: 10 }}>
            <div>
              個体識別番号(必須)：
              <Row>
                <TextField
                  required
                  value={values.individualId}
                  onChange={handleChange}
                  name="individualId"
                  InputProps={{
                    inputComponent: IndividualIdInput as never,
                  }}
                  variant="standard"
                  sx={{ width: 100, textAlign: 'right' }}
                />
              </Row>
            </div>
          </WrapBox>
          <WrapBox>
            <div>
              生年月日(必須)：
              <Row>
                <TextField
                  type="date"
                  required
                  value={values.dateOfBirth}
                  onChange={handleChange}
                  name="dateOfBirth"
                  variant="standard"
                  sx={{ width: 110 }}
                />
              </Row>
            </div>
          </WrapBox>
          <WrapBox>
            <div>
              性別(必須)：
              <Row>
                <TextField
                  select
                  required
                  value={values.sex ?? ''}
                  onChange={handleChange}
                  variant="standard"
                  name="sex"
                  sx={{ width: 60 }}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option disabled value="">
                    {' '}
                  </option>
                  {sexList.map((option) => (
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
              種別(必須)：
              <Row>
                <TextField
                  select
                  required
                  value={values.category ?? ''}
                  onChange={handleChange}
                  variant="standard"
                  name="category"
                  sx={{ width: 60 }}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option disabled value="">
                    {' '}
                  </option>
                  {categoryList.map((option) => (
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
              品種(必須)：
              <Row>
                <TextField
                  select
                  required
                  value={values.breedType ?? ''}
                  onChange={handleChange}
                  variant="standard"
                  name="breedType"
                  sx={{ width: 90 }}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option disabled value="">
                    {' '}
                  </option>
                  {breedTypeList.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Row>
            </div>
          </WrapBox>

          <WrapBox>
            <div>場所：</div>
            <Row>
              <p>
                {areaName} {barnName} {blockNo}
              </p>

              <Button
                variant="contained"
                color="primary"
                onClick={() => setLocationDialogOpen(true)}
              >
                場所の選択
              </Button>
            </Row>
          </WrapBox>
          <WrapBox>
            <div>個体タグ：</div>
            <div>
              <IndividualTagRegister
                selectedTagsList={individualTagsList}
                setSelectedTagsList={setIndividualTagsList}
              />
            </div>
          </WrapBox>
          <WrapBox>
            <div>導入日：</div>
            <div>
              <TextField
                type="date"
                value={values.dateOfIntroduction}
                onChange={handleChange}
                name="dateOfIntroduction"
                variant="standard"
                sx={{ width: 110 }}
              />
            </div>
          </WrapBox>
          <WrapBox>
            <div>母牛の個体識別番号：</div>
            <Row>
              <TextField
                value={values.motherId}
                onChange={handleChange}
                name="motherId"
                InputProps={{
                  inputComponent: IndividualIdInput as never,
                }}
                variant="standard"
                sx={{ width: 100 }}
              />

              <Button
                variant="contained"
                color="primary"
                onClick={() => setIndividualDialogOpen(true)}
              >
                個体の選択
              </Button>
            </Row>
          </WrapBox>
          <WrapBox>
            <div>父の名前：</div>
            <div>
              <TextField
                value={values.fatherName}
                onChange={handleChange}
                name="fatherName"
                variant="standard"
                sx={{ width: 120 }}
              />
            </div>
          </WrapBox>
          <WrapBox>
            <div>母の父の名前：</div>
            <div>
              <TextField
                value={values.grandfatherName}
                onChange={handleChange}
                name="grandfatherName"
                variant="standard"
                sx={{ width: 120 }}
              />
            </div>
          </WrapBox>
          <WrapBox>
            <div>祖母の父の名前：</div>
            <div>
              <TextField
                value={values.grandGrandfatherName}
                onChange={handleChange}
                name="grandGrandfatherName"
                variant="standard"
                sx={{ width: 120 }}
              />
            </div>
          </WrapBox>
          <div style={{ textAlign: 'right' }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={onSubmit}
              disabled={
                !!(
                  !values.individualId ||
                  !values.dateOfBirth ||
                  !values.sex ||
                  !values.category ||
                  !values.breedType ||
                  !blockNo
                )
              }
              sx={{ width: 120 }}
            >
              登録
            </Button>
          </div>
        </Box>
        <AlertMessage
          open={alertMessageOpen}
          setOpen={setAlertMessageOpen}
          severity="error"
          message="エラーです"
        />
      </Container>
      {individualDialogOpen && (
        <SelectIndividualDialog
          isOpen={individualDialogOpen}
          onClose={handleIndividualClose}
          selectedIndividual={values.motherId}
          individualsList={state.individualsList}
        />
      )}
      {locationDialogOpen && (
        <SelectLocationDialog
          isOpen={locationDialogOpen}
          onClose={handleLocationClose}
          selectedBarnId={barnId}
          selectedBarnName={barnName}
          selectedAreaName={areaName}
          areasList={areasState.areasList}
        />
      )}
      {blockDialogOpen && (
        <SelectBlockDialog
          isOpen={blockDialogOpen}
          onClose={handleBlockClose}
          selectedBlockId={values.blockId}
          selectedBlockNo={blockNo}
          barn={barnState.barn}
        />
      )}
    </>
  );
};

export default NewIndividual;
