import { FC } from 'react';
import { INDIVIDUAL } from 'apis/individuals';
import theme from 'components/theme';
import { Divider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import EarTagImage from 'images/ear.png';
import { IndividualContentWrapper, MainWrapper } from 'Style';
import styled from 'styled-components';
import handleToDate from 'containers/func/handleToDate';
import { breedTypeList, sexList, categoryList } from 'constant';

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;
const TagNum = styled.div`
  font-size: 24px;
`;
const InvidividualId = styled.p``;
const DateOfBirth = styled.p``;
const Age = styled.p``;
const Sex = styled.p``;
const Category = styled.p``;
const BreedType = styled.p``;

const IndividualsList: FC<{ individuals: void | INDIVIDUAL[] }> = ({
  individuals,
}) => (
  <>
    {individuals?.map((individual: INDIVIDUAL) => (
      <ThemeProvider theme={theme} key={individual.id}>
        <IndividualContentWrapper>
          <MainWrapper>
            <Link
              component={RouterLink}
              to={`/individuals/${individual.id}`}
              style={{ fontSize: 16, color: 'black' }}
            >
              <TagNum>
                <img src={EarTagImage} alt="tag-number" width="20" />
                {individual.id.slice(5, 9)}{' '}
              </TagNum>
              <Row>
                <InvidividualId>
                  個体識別番号：{individual.id.slice(0, 5)}.
                  <span style={{ fontWeight: 'bold' }}>
                    {individual.id.slice(5, 9)}
                  </span>
                  .{individual.id.slice(9, 10)}
                </InvidividualId>
              </Row>
              <Row>
                <DateOfBirth>
                  出生日：{handleToDate(individual.dateOfBirth)}
                </DateOfBirth>
                <Age>月齢：{individual.age}</Age>
                <BreedType>
                  品種：{breedTypeList[individual.breedType]?.label}
                </BreedType>
              </Row>
              <Row>
                <Sex>性別：{sexList[individual.sex]?.label}</Sex>
                <Category>
                  種別：
                  {categoryList[individual.category]?.label}
                </Category>
              </Row>
            </Link>
          </MainWrapper>
        </IndividualContentWrapper>
        <Divider />
      </ThemeProvider>
    ))}
  </>
);

export default IndividualsList;
