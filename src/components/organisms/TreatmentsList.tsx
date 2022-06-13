import { FC } from 'react';
import { TREATMENT } from 'apis/treatments';
import theme from 'components/theme';
import { ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import handleToDateAndTime from 'containers/func/handleToDateAndTime';
import EarTagImage from 'images/ear.png';
import { TreatmentContentWrapper, MainWrapper } from 'Style';
import styled from 'styled-components';
import { Divider } from '@mui/material';

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;
const TagNum = styled.div`
  font-size: 24px;
`;
const Datetime = styled.p``;
const Temperature = styled.p``;
const Symptom = styled.p``;
const Content = styled.p``;
const User = styled.p``;

const TreatmentsList: FC<{ treatments: void | TREATMENT[] }> = ({
  treatments,
}) => {
  const Sortedtreatments: TREATMENT[] | undefined = treatments?.sort(
    (n1, n2) => {
      if (n1.datetime < n2.datetime) {
        return 1;
      }
      if (n1.datetime > n2.datetime) {
        return -1;
      }

      return 0;
    },
  );

  return (
    <>
      <Divider />
      {Sortedtreatments?.map((treatment: TREATMENT) => (
        <ThemeProvider theme={theme} key={treatment.id}>
          <TreatmentContentWrapper>
            <MainWrapper>
              <TagNum>
                <img src={EarTagImage} alt="tag-number" width="20" />{' '}
                <Link
                  component={RouterLink}
                  to={`/individuals/${treatment.individualId}`}
                  style={{ fontSize: 24, color: 'black' }}
                >
                  {treatment.individualId.slice(5, 9)}{' '}
                </Link>
              </TagNum>

              <Link
                component={RouterLink}
                to={`/treatments/${treatment.id}`}
                style={{ fontSize: 16, color: 'black' }}
              >
                <Row>
                  <Datetime>
                    日時：{handleToDateAndTime(treatment.datetime)}
                  </Datetime>
                  <Temperature>
                    体温：
                    {treatment.bodyTemperature !== 0 ? (
                      <>{treatment.bodyTemperature?.toFixed(1)}℃</>
                    ) : (
                      '-'
                    )}
                  </Temperature>
                </Row>
                <Row>
                  <Symptom>症状：{treatment.symptom}</Symptom>
                </Row>
                <Row>
                  <Content>治療内容：{treatment.content}</Content>
                </Row>
                <Row>
                  <User>登録者：{treatment.userName}</User>
                </Row>
              </Link>
            </MainWrapper>
          </TreatmentContentWrapper>
          <Divider />
        </ThemeProvider>
      ))}
    </>
  );
};

export default TreatmentsList;
