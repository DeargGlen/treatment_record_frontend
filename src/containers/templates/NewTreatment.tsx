/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FC } from 'react';
import * as React from 'react';
import NumberFormat from 'react-number-format';
import { Box, TextField, Button, Container } from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { postTreatment } from 'apis/treatments';
import { HTTP_STATUS_CODE } from 'states';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const Row = styled.div`
  display: flex;
  justify-content: space-between;
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
      format="##.#"
      placeholder="**.*"
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
  gotDosage: boolean;
  userId: number | null;
  userName: string;
}

const NewTreatment: FC = () => {
  const [values, setValues] = React.useState<TreatmentState>({
    individualId: '',
    datetime: '',
    bodyTemperature: null,
    symptom: '',
    content: '',
    gotDosage: false,
    userId: null,
    userName: '',
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
    postTreatment({
      individualId: values.individualId,
      datetime: values.datetime,
      bodyTemperature: values.bodyTemperature ?? 0,
      symptom: values.symptom,
      content: values.content,
      gotDosage: values.gotDosage,
      userId: values.userId ?? 0,
      userName: values.userName,
    })
      .then(() => navigate('/treatments'))
      .catch((e) => {
        if (e.response.status === HTTP_STATUS_CODE.NOT_ACCEPTABLE) {
          setValues({
            ...values,
            individualId: '',
            datetime: '',
            bodyTemperature: null,
            symptom: '',
            content: '',
            gotDosage: false,
            userId: null,
            userName: '',
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
            耳標番号(必須)：
            <TextField
              value={values.individualId}
              onChange={handleChange}
              name="individualId"
              InputProps={{
                inputComponent: IndividualIdInput as never,
              }}
              variant="standard"
              sx={{ width: 120, textAlign: 'right' }}
            />
          </Row>
          <Row>
            日付(必須)：
            <TextField
              type="date"
              value={values.datetime}
              onChange={handleChange}
              name="datetime"
              variant="standard"
              sx={{ width: 120 }}
            />
          </Row>

          <Row>
            体温(必須)：
            <TextField
              value={values.bodyTemperature}
              onChange={handleChange}
              name="bodyTemperature"
              InputProps={{
                inputComponent: BodyTemperatureInput as never,
              }}
              variant="standard"
              sx={{ width: 120, textAlign: 'right' }}
            />
          </Row>

          <Row>
            症状：
            <TextField
              value={values.symptom}
              onChange={handleChange}
              name="symptom"
              variant="standard"
              sx={{ width: 120 }}
            />
          </Row>

          <Row>
            治療内容：
            <TextField
              value={values.content}
              onChange={handleChange}
              name="content"
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
