/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FC } from 'react';
import * as React from 'react';
import NumberFormat from 'react-number-format';
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  TextField,
  Select,
  SelectChangeEvent,
  Button,
} from '@mui/material';
import styled from 'styled-components';
import { ContentsList } from 'Style';
import { useNavigate } from 'react-router-dom';
import { postIndividual } from 'apis/individuals';
import { HTTP_STATUS_CODE } from 'states';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const NumberFormatCustom = React.forwardRef<NumberFormat<number>, CustomProps>(
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
  motherId?: string;
  fatherName?: string;
  grandfatherName?: string;
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
    blockId: 1,
  });

  const navigate = useNavigate();

  const handleChange = (
    event:
      | SelectChangeEvent
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
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
          });
        } else {
          throw e;
        }
      });
  };

  return (
    <>
      <ContentsList>
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
              value={values.individualId}
              onChange={handleChange}
              name="individualId"
              InputProps={{
                inputComponent: NumberFormatCustom as never,
              }}
              variant="standard"
              sx={{ width: 120 }}
            />
          </Row>
          <Row>
            生年月日(必須)：
            <TextField
              type="date"
              value={values.dateOfBirth}
              onChange={handleChange}
              name="dateOfBirth"
            />
          </Row>
          <Row>
            性別(必須)：
            <div>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>性別</InputLabel>
                <Select
                  value={values.sex}
                  onChange={handleChange}
                  label="Sex"
                  name="sex"
                  autoWidth
                >
                  <MenuItem value={0}>去勢</MenuItem>
                  <MenuItem value={1}>雄</MenuItem>
                  <MenuItem value={2}>雌</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Row>
          <Row>
            種別(必須)：
            <div>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel>種別</InputLabel>
                <Select
                  value={values.category}
                  onChange={handleChange}
                  label="Category"
                  name="category"
                  autoWidth
                >
                  <MenuItem value={0}>肥育</MenuItem>
                  <MenuItem value={1}>繁殖</MenuItem>
                  <MenuItem value={2}>子牛</MenuItem>
                  <MenuItem value={3}>育成</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Row>
          <Row>
            品種(必須)：
            <div>
              <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="breed_type-label">品種</InputLabel>
                <Select
                  labelId="breed_type-label"
                  value={values.breedType}
                  onChange={handleChange}
                  label="breed_type"
                  name="breedType"
                  autoWidth
                >
                  <MenuItem value={0}>黒毛和種</MenuItem>
                  <MenuItem value={1}>F1</MenuItem>
                </Select>
              </FormControl>
            </div>
          </Row>
          <Row>
            母牛の個体識別番号：
            <TextField
              value={values.motherId}
              onChange={handleChange}
              name="motherId"
              InputProps={{
                inputComponent: NumberFormatCustom as never,
              }}
              variant="standard"
              sx={{ width: 120 }}
            />
          </Row>
          <Row>
            導入日：
            <TextField
              type="date"
              value={values.dateOfIntroduction}
              onChange={handleChange}
              name="dateOfIntroduction"
            />
          </Row>
          <Button variant="contained" color="primary" onClick={onSubmit}>
            登録
          </Button>
        </Box>
      </ContentsList>
    </>
  );
};

export default NewIndividual;
