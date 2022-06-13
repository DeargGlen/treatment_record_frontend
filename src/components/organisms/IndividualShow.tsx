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
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import { breedTypeList, categoryList, sexList } from 'constant';
import DisplayTags from 'components/molecules/DisplayTags';
import { Button } from '@mui/material';

const TagNum = styled.div`
  font-size: 22px;
  text-align: center;
  margin-left: 40%;
`;
const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
`;
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
const Data = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  line-height: 24px;
`;

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
        <TopRow>
          <TagNum>
            <img src={EarTagImage} alt="tag-number" width="20" />
            {individual.id?.slice(5, 9)}
          </TagNum>
          <TopRow>
            <Button
              variant="contained"
              color="primary"
              sx={{ height: 20, mt: '5px' }}
            >
              編集
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ height: 20, mt: '5px' }}
            >
              削除
            </Button>
          </TopRow>
        </TopRow>
        <Row>
          <p>個体識別番号：</p>
          <Data>
            {individual.id?.slice(0, 5)}.
            <span style={{ fontWeight: 'bold' }}>
              {individual.id?.slice(5, 9)}
            </span>
            .{individual.id?.slice(9, 10)}
          </Data>
        </Row>
        <Divider />
        <Row>
          <p>出生日：</p>
          <Data>
            {individual.dateOfBirth
              ? handleToDate(individual.dateOfBirth)
              : '-'}
          </Data>
        </Row>
        <Divider />
        <Row>
          <p>月齢：</p>
          <Data>{individual.age}</Data>
        </Row>
        <Divider />
        <Row>
          <p>導入日：</p>
          <Data>
            {individual.dateOfIntroduction
              ? handleToDate(individual.dateOfIntroduction)
              : '-'}
          </Data>
        </Row>
        <Divider />
        <Row>
          <p>性別：</p>
          <Data>
            {individual.sex != null ? sexList[individual.sex]?.label : '-'}
          </Data>
        </Row>
        <Divider />
        <Row>
          <p>種別：</p>
          <Data>
            {individual.category != null
              ? categoryList[individual.category]?.label
              : '-'}
          </Data>
        </Row>
        <Divider />
        <Row>
          <p>品種：</p>
          <Data>
            {individual.breedType != null
              ? breedTypeList[individual.breedType]?.label
              : '-'}
          </Data>
        </Row>
        <Divider />
        <Row>
          <p>場所：</p>
          <Data>
            {individual.areaName ?? '-'}
            {individual.barnName ?? '-'} {individual.no ?? ' '}
          </Data>
        </Row>
        <Divider />

        <Row>
          <p style={{ lineHeight: 2.5 }}>個体タグ：</p>
          <Data>
            <DisplayTags tags={individual.individualTags} />
          </Data>
        </Row>
        <Divider />
        <Row>
          <p>母牛の個体識別番号：</p>

          <Data>
            {individual.motherId ? (
              <Link
                component={RouterLink}
                to={`/individuals/${individual.motherId ?? '-'}`}
                style={{ fontSize: 16, color: 'black' }}
              >
                {individual.motherId?.slice(0, 5)}.
                <span style={{ fontWeight: 'bold' }}>
                  {individual.motherId?.slice(5, 9)}
                </span>
                .{individual.motherId?.slice(9, 10)}
              </Link>
            ) : (
              '-'
            )}
          </Data>
        </Row>
        <Divider />
        <Row>
          <p>父：</p>
          <Data>{individual.fatherName ? individual.fatherName : '-'}</Data>
        </Row>
        <Divider />
        <Row>
          <p>母の父：</p>
          <Data>
            {individual.grandfatherName ? individual.grandfatherName : '-'}
          </Data>
        </Row>
        <Divider />
        <Row>
          <p>祖母の父：</p>
          <Data>
            {individual.grandGrandfatherName
              ? individual.grandGrandfatherName
              : '-'}
          </Data>
        </Row>
        <Divider />
        <Row>
          <p>治療記録件数：</p>
          <Data>{individual?.treatments?.length}</Data>
        </Row>
        <Divider />
      </MainWrapper>
      {Sortedtreatments.map((treatment: TREATMENT) => (
        <ThemeProvider theme={theme} key={treatment.id}>
          <ContentWrapper>
            <MainWrapper>
              <Link
                component={RouterLink}
                to={`/treatments/${treatment.id}`}
                style={{ fontSize: 16, color: 'black' }}
              >
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
              </Link>
            </MainWrapper>
          </ContentWrapper>
          <Divider />
        </ThemeProvider>
      ))}
    </>
  );
};

export default IndividualShow;
