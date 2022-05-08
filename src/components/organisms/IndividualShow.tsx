/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { FC } from 'react';
import { TREATMENT } from 'apis/treatments';
import theme from 'components/theme';
import { ThemeProvider } from '@mui/material/styles';
import { ContentWrapper, MainWrapper } from 'Style';
import handleToDate from 'containers/func/handleToDate';
import EarTagImage from 'images/ear.png';
import { INDIVIDUAL_SHOW_DATA } from 'apis/individuals';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Datetime = styled.p``;

const IndividualShow: FC<{ individual: INDIVIDUAL_SHOW_DATA }> = ({
  individual,
}) => (
  <>
    <MainWrapper>
      <div className="tag-num" style={{ fontSize: 22 }}>
        <img src={EarTagImage} alt="tag-number" width="20" />
        {individual.id?.slice(5, 9)}
      </div>
      <div className="row1">
        <p>
          個体識別番号：{individual.id?.slice(0, 5)}.
          <span style={{ fontWeight: 'bold' }}>
            {individual.id?.slice(5, 9)}
          </span>
          .{individual.id?.slice(9, 10)}
        </p>
        <p>生年月日：{individual.date_of_birth}</p>
        <p>月齢：{individual.age}</p>
      </div>
      <div className="row2">
        <p>
          性別：{['去勢', '雌', '雄'][individual.sex!]} 種別：
          {['肥育', '繁殖', '子牛', '育成'][individual.category!]}
        </p>
        <p>品種：{['黒毛和種', 'F1'][individual.breed_type!]}</p>
      </div>
      <div className="row3">
        <p>
          場所：{individual.name} {individual.No}
        </p>
      </div>
      <div>治療記録件数：{individual?.treatments?.length}</div>
    </MainWrapper>
    {individual?.treatments?.map((treatment: TREATMENT) => (
      <ContentWrapper key={treatment.id}>
        <ThemeProvider theme={theme}>
          <MainWrapper>
            <Row>
              <Datetime>日時：{handleToDate(treatment.datetime)}</Datetime>
              <p>
                体温：
                {treatment.body_temperature.toFixed(1)}℃
              </p>
            </Row>
            <div className="row2">
              <p>症状：{treatment.symptom}</p>
              <p>治療内容：{treatment.content}</p>
            </div>
            <div className="row3">
              <p>投薬の有無：{treatment.gotDosage ? 'あり' : 'なし'} </p>
              <p>登録者：{treatment.user_name}</p>
            </div>
          </MainWrapper>
        </ThemeProvider>
      </ContentWrapper>
    ))}
  </>
);

export default IndividualShow;
