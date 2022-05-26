/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FC, useState, useEffect, useReducer } from 'react';
import * as React from 'react';
import NumberFormat from 'react-number-format';
import { Box, TextField, Button, Container } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  postIndividual,
  fetchIndividuals,
  INDIVIDUALS_DATA,
} from 'apis/individuals';
import { HTTP_STATUS_CODE } from 'states';
import { SelectIndividualDialog } from 'components/molecules/SelectIndividualDialog';
import { SelectLocationDialog } from 'components/molecules/SelectLocationDialog';
import { SelectBlockDialog } from 'components/molecules/SelectBlockDialog';
import {
  initialState,
  individualsActionTypes,
  individualsReducer,
} from 'reducers/individuals';
import {
  fetchAreas,
  AREAS_DATA,
  fetchBarn,
  BARN_SHOW_DATA,
} from 'apis/locations';

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

const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const sexList = [
  {
    value: '0',
    label: '去勢',
  },
  {
    value: '1',
    label: 'オス',
  },
  {
    value: '2',
    label: 'メス',
  },
];

const categoryList = [
  {
    value: '0',
    label: '肥育',
  },
  {
    value: '1',
    label: '繁殖',
  },
  {
    value: '2',
    label: '子牛',
  },
  {
    value: '3',
    label: '育成',
  },
];

const breedTypeList = [
  {
    value: '0',
    label: '黒毛和種',
  },
  {
    value: '1',
    label: 'F1',
  },
];

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
  sex: string;
  category: string;
  breedType: string;
  motherId: string;
  fatherName: string;
  grandfatherName: string;
  dateOfIntroduction: string;
  blockId: number;
}

const NewIndividual: FC = () => {
  const [values, setValues] = React.useState<State>({
    individualId: '',
    dateOfBirth: '',
    sex: '',
    category: '',
    breedType: '',
    dateOfIntroduction: '',
    fatherName: '',
    grandfatherName: '',
    blockId: 1,
    motherId: '',
  });

  const initialSelectState = {
    isOpenSelectDialog: false,
  };

  const [individualState, setIndividual] = useState(initialSelectState);

  const initialLocationState = {
    isOpenLocationDialog: false,
  };

  const [locationState, setLocation] = useState(initialLocationState);

  const [barnId, setBarnId] = useState(0);
  const [barnName, setBarnName] = useState('');
  const [areaName, setAreaName] = useState('');
  const [blockNo, setBlockNo] = useState('');

  const initialBlockState = {
    isOpenBlockDialog: false,
  };

  const [blockState, setBlock] = useState(initialBlockState);

  const navigate = useNavigate();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const [state, dispatch] = useReducer(individualsReducer, initialState);

  useEffect(() => {
    dispatch({ type: individualsActionTypes.FETCHING });
    fetchIndividuals()
      .then((data: void | INDIVIDUALS_DATA) => {
        console.log(data);
        dispatch({
          type: individualsActionTypes.FETCH_SUCCESS,
          payload: {
            individuals: data?.individuals,
          },
        });
      })

      .catch(() => 1);
  }, []);

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
    setIndividual({ isOpenSelectDialog: false });
    setValues({ ...values, motherId: value });
  };

  const handleLocationClose = (
    value: number,
    barnNameValue: string,
    areaNameValue: string,
    willOpenBlockDialog: boolean,
  ) => {
    setLocation({ isOpenLocationDialog: false });
    setBarnId(value);
    setBarnName(barnNameValue);
    setAreaName(areaNameValue);
    setBlock({ isOpenBlockDialog: willOpenBlockDialog });
  };

  const handleBlockClose = (value: number, blockNoValue: string) => {
    setBlock({ isOpenBlockDialog: false });
    setBlockNo(blockNoValue);
    setValues({ ...values, blockId: value });
  };

  const onSubmit = () => {
    postIndividual({
      individualId: values.individualId,
      dateOfBirth: values.dateOfBirth,
      category: values.category,
      sex: values.sex,
      breedType: values.breedType,
      motherId: values.motherId ?? '',
      fatherName: values.fatherName ?? '',
      grandfatherName: values.grandfatherName ?? '',
      dateOfIntroduction: values.dateOfIntroduction,
      blockId: values.blockId ?? 1,
    })
      .then(() => navigate('/individuals'))
      .catch((e) => {
        if (e.response.status === HTTP_STATUS_CODE.NOT_ACCEPTABLE) {
          setValues({
            ...values,
            individualId: '',
            dateOfBirth: '',
            sex: '',
            category: '',
            breedType: '',
            dateOfIntroduction: '',
            fatherName: '',
            grandfatherName: '',
          });
        } else {
          throw e;
        }
      });
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box
          sx={{
            '& > :not(style)': {
              m: 1,
            },
          }}
        >
          <Row>
            個体識別番号(必須)：
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
          <Row>
            生年月日(必須)：
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

          <Row>
            性別(必須)：
            <div>
              <TextField
                select
                required
                label="性別"
                value={values.sex}
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
            </div>
          </Row>

          <Row>
            種別(必須)：
            <div>
              <TextField
                select
                required
                label="種別"
                value={values.category}
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
            </div>
          </Row>
          <Row>
            品種(必須)：
            <div>
              <TextField
                select
                required
                label="品種"
                value={values.breedType}
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
            </div>
          </Row>

          <Row>
            <div>場所：</div>
            <div>
              {areaName} {barnName} {blockNo}
            </div>
          </Row>
          <ButtonDiv>
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                setLocation({
                  isOpenLocationDialog: true,
                })
              }
            >
              場所の選択
            </Button>
          </ButtonDiv>
          <Row>
            導入日：
            <TextField
              type="date"
              value={values.dateOfIntroduction}
              onChange={handleChange}
              name="dateOfIntroduction"
              variant="standard"
              sx={{ width: 110 }}
            />
          </Row>
          <Row>
            母牛の個体識別番号：
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
          </Row>
          <ButtonDiv>
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
          </ButtonDiv>
          <Row>
            父牛の名前：
            <TextField
              value={values.fatherName}
              onChange={handleChange}
              name="fatherName"
              variant="standard"
              sx={{ width: 120 }}
            />
          </Row>
          <Row>
            父の父の名前：
            <TextField
              value={values.grandfatherName}
              onChange={handleChange}
              name="grandfatherName"
              variant="standard"
              sx={{ width: 120 }}
            />
          </Row>
          <ButtonDiv>
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
          </ButtonDiv>
        </Box>
      </Container>
      {individualState.isOpenSelectDialog && (
        <SelectIndividualDialog
          isOpen={individualState.isOpenSelectDialog}
          onClose={handleIndividualClose}
          selectedIndividual={values.motherId}
          individualsList={state.individualsList}
        />
      )}
      {locationState.isOpenLocationDialog && (
        <SelectLocationDialog
          isOpen={locationState.isOpenLocationDialog}
          onClose={handleLocationClose}
          selectedBarnId={barnId}
          selectedBarnName={barnName}
          selectedAreaName={areaName}
          areasList={areasState.areasList}
        />
      )}
      {blockState.isOpenBlockDialog && (
        <SelectBlockDialog
          isOpen={blockState.isOpenBlockDialog}
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
