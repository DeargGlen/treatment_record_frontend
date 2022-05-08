import { FC } from 'react';
import { TREATMENT } from 'apis/treatments';
import theme from 'components/theme';
import { ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import handleToDate from 'containers/func/handleToDate';
import EarTagImage from 'images/ear.png';
import { TreatmentContentWrapper, MainWrapper } from 'Style';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Datetime = styled.p``;
const Temperature = styled.p``;
const Symptom = styled.p``;
const Content = styled.p``;
const Dosage = styled.p``;
const User = styled.p``;

const TreatmentsList: FC<{ treatments: void | TREATMENT[] }> = ({
  treatments,
}) => (
  <>
    {treatments?.map((treatment: TREATMENT) => (
      <TreatmentContentWrapper key={treatment.id}>
        <ThemeProvider theme={theme}>
          <MainWrapper>
            <Link
              component={RouterLink}
              to={`/individuals/${treatment.individual_id}`}
            >
              <div className="tag-num" style={{ fontSize: 22, color: 'blue' }}>
                <img src={EarTagImage} alt="tag-number" width="20" />
                {treatment.individual_id.slice(5, 9)}
              </div>{' '}
            </Link>
            <Row>
              <Datetime>日時：{handleToDate(treatment.datetime)}</Datetime>
              <Temperature>
                体温：{treatment.body_temperature.toFixed(1)}℃
              </Temperature>
            </Row>
            <Row>
              <Symptom>症状：{treatment.symptom}</Symptom>
            </Row>
            <Row>
              <Content>治療内容：{treatment.content}</Content>
            </Row>
            <Row>
              <Dosage>
                投薬の有無：{treatment.gotDosage ? 'あり' : 'なし'}{' '}
              </Dosage>
            </Row>
            <Row>
              <User>登録者：{treatment.user_name}</User>
            </Row>
          </MainWrapper>
        </ThemeProvider>
      </TreatmentContentWrapper>
    ))}
  </>
);

export default TreatmentsList;
