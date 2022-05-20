import { FC } from 'react';
import { TREATMENT } from 'apis/treatments';
import theme from 'components/theme';
import { ThemeProvider } from '@mui/material/styles';
import { ContentWrapper, MainWrapper } from 'Style';
import handleToDateAndTime from 'containers/func/handleToDateAndTime';
import EarTagImage from 'images/ear.png';
import { INDIVIDUAL_SHOW_DATA } from 'apis/individuals';
import styled from 'styled-components';
import handleToDate from 'containers/func/handleToDate';
import Divider from '@mui/material/Divider';

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
`;
const RowTreatment = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Datetime = styled.p``;

const IndividualShow: FC<{ individual: INDIVIDUAL_SHOW_DATA }> = ({
  individual,
}) => {
  const Sortedtreatments: TREATMENT[] | undefined = individual.treatments?.sort(
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
      <MainWrapper>
        <div className="tag-num" style={{ fontSize: 22, paddingLeft: 10 }}>
          <img src={EarTagImage} alt="tag-number" width="20" />
          {individual.id?.slice(5, 9)}
        </div>
        <Row>
          <p>個体識別番号：</p>
          <p>
            {individual.id?.slice(0, 5)}.
            <span style={{ fontWeight: 'bold' }}>
              {individual.id?.slice(5, 9)}
            </span>
            .{individual.id?.slice(9, 10)}
          </p>
        </Row>
        <Divider />
        <Row>
          <p>出生日：</p>
          <p>
            {individual.dateOfBirth
              ? handleToDate(individual.dateOfBirth)
              : '-'}
          </p>
        </Row>
        <Divider />
        <Row>
          <p>月齢：</p>
          <p>{individual.age}</p>
        </Row>
        <Divider />
        <Row>
          <p>導入日：</p>
          <p>
            {individual.dateOfIntroduction
              ? handleToDate(individual.dateOfIntroduction)
              : '-'}
          </p>
        </Row>
        <Divider />
        <Row>
          <p>性別：</p>
          <p>{['去勢', 'オス', 'メス'][individual.sex] ?? '-'}</p>
        </Row>
        <Divider />
        <Row>
          <p>種別：</p>
          <p>{['肥育', '繁殖', '子牛', '育成'][individual.category] ?? '-'}</p>
        </Row>
        <Divider />
        <Row>
          <p>品種：</p>
          <p>{['黒毛和種', 'F1'][individual.breedType] ?? '-'}</p>
        </Row>
        <Divider />
        <Row>
          <p>場所：</p>
          <p>
            {individual.name ?? '-'} {individual.no ?? ' '}
          </p>
        </Row>
        <Divider />
        <Row>
          <p>母牛の個体識別番号：</p>
          <div>
            {individual.motherId ? (
              <p>
                {individual.motherId?.slice(0, 5)}.
                <span style={{ fontWeight: 'bold' }}>
                  {individual.motherId?.slice(5, 9)}
                </span>
                .{individual.motherId?.slice(9, 10)}
              </p>
            ) : (
              '-'
            )}
          </div>
        </Row>
        <Divider />
        <Row>
          <p>父牛：</p>
          <p>{individual.fatherName ? individual.fatherName : '-'}</p>
        </Row>
        <Divider />
        <Row>
          <p>母の父牛：</p>
          <p>{individual.grandfatherName ? individual.grandfatherName : '-'}</p>
        </Row>
        <Divider />
        <Row>
          <p>治療記録件数：</p>
          <p>{individual?.treatments?.length}</p>
        </Row>
        <Divider />
      </MainWrapper>
      {Sortedtreatments.map((treatment: TREATMENT) => (
        <ThemeProvider theme={theme} key={treatment.id}>
          <ContentWrapper>
            <MainWrapper>
              <RowTreatment>
                <Datetime>
                  日時：{handleToDateAndTime(treatment.datetime)}
                </Datetime>
                <p>
                  体温：
                  {treatment.bodyTemperature.toFixed(1)}℃
                </p>
              </RowTreatment>
              <div className="row2">
                <p>症状：{treatment.symptom}</p>
                <p>治療内容：{treatment.content}</p>
              </div>
              <div className="row3">
                <p>登録者：{treatment.userName}</p>
              </div>
            </MainWrapper>
          </ContentWrapper>
          <Divider />
        </ThemeProvider>
      ))}
    </>
  );
};

export default IndividualShow;
