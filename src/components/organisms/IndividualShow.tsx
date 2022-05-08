/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
        <p>生年月日：</p>
        <p>{handleToDate(individual.date_of_birth!)}</p>
      </Row>
      <Divider />
      <Row>
        <p>月齢：</p>
        <p>{individual.age}</p>
      </Row>
      <Divider />
      <Row>
        <p>導入日：</p>
        <p>{handleToDate(individual.date_of_introduction!)}</p>
      </Row>
      <Divider />
      <Row>
        <p>性別：</p>
        <p>{['去勢', '雌', '雄'][individual.sex!]}</p>
      </Row>
      <Divider />
      <Row>
        <p>種別：</p>
        <p>{['肥育', '繁殖', '子牛', '育成'][individual.category!]}</p>
      </Row>
      <Divider />
      <Row>
        <p>品種：</p>
        <p>{['黒毛和種', 'F1'][individual.breed_type!]}</p>
      </Row>
      <Divider />
      <Row>
        <p>場所：</p>
        <p>
          {individual.name ?? '-'} {individual.No ?? ' '}
        </p>
      </Row>
      <Divider />
      <Row>
        <p>母牛の個体識別番号：</p>
        <p>{individual.mother_id ?? '-'}</p>
      </Row>
      <Divider />
      <Row>
        <p>父の名前：</p>
        <p>{individual.father_name ?? '-'}</p>
      </Row>
      <Divider />
      <Row>
        <p>父の父の名前：</p>
        <p>{individual.grandfather_name ?? '-'}</p>
      </Row>
      <Divider />
      <Row>
        <p>治療記録件数：</p>
        <p>{individual?.treatments?.length}</p>
      </Row>
      <Divider />
    </MainWrapper>
    {individual?.treatments?.map((treatment: TREATMENT) => (
      <ContentWrapper key={treatment.id}>
        <ThemeProvider theme={theme}>
          <MainWrapper>
            <Row>
              <Datetime>
                日時：{handleToDateAndTime(treatment.datetime)}
              </Datetime>
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
