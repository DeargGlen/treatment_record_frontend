/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FC } from 'react';
import * as React from 'react';
import NumberFormat from 'react-number-format';
import { Box, TextField, Button, Container } from '@mui/material';
import styled from 'styled-components';
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

const sexList = [
  {
    value: '0',
    label: '去勢',
  },
  {
    value: '1',
    label: '雄(オス)',
  },
  {
    value: '2',
    label: '雌(メス)',
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

const NewTreatment: FC = () => {
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
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
              value={values.individualId}
              onChange={handleChange}
              name="individualId"
              InputProps={{
                inputComponent: NumberFormatCustom as never,
              }}
              variant="standard"
              sx={{ width: 120, textAlign: 'right' }}
            />
          </Row>
          <Row>
            生年月日(必須)：
            <TextField
              type="date"
              value={values.dateOfBirth}
              onChange={handleChange}
              name="dateOfBirth"
              variant="standard"
              sx={{ width: 120 }}
            />
          </Row>

          <Row>
            性別(必須)：
            <div>
              <TextField
                select
                label="性別"
                value={values.sex}
                onChange={handleChange}
                variant="standard"
                name="sex"
                sx={{ width: 120 }}
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
                label="種別"
                value={values.category}
                onChange={handleChange}
                variant="standard"
                name="category"
                sx={{ width: 120 }}
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
                label="品種"
                value={values.breedType}
                onChange={handleChange}
                variant="standard"
                name="breedType"
                sx={{ width: 120 }}
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
            導入日：
            <TextField
              type="date"
              value={values.dateOfIntroduction}
              onChange={handleChange}
              name="dateOfIntroduction"
              variant="standard"
              sx={{ width: 120 }}
            />
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

          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={onSubmit}
            disabled
          >
            登録
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default NewTreatment;
