import { FC } from 'react';
import { INDIVIDUAL } from 'apis/individuals';
import theme from 'components/theme';
import { ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import EarTagImage from 'images/ear.png';
import { IndividualContentWrapper, MainWrapper } from 'Style';
import styled from 'styled-components';
import handleToDate from 'containers/func/handleToDate';

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;
const InvidividualId = styled.p``;
const DateOfBirth = styled.p``;
const Age = styled.p``;
const Sex = styled.p``;
const Category = styled.p``;
const BreedType = styled.p``;
const Location = styled.p``;

const IndividualsList: FC<{ individuals: void | INDIVIDUAL[] }> = ({
  individuals,
}) => (
  <>
    {individuals?.map((individual: INDIVIDUAL) => (
      <ThemeProvider theme={theme} key={individual.id}>
        <IndividualContentWrapper>
          <MainWrapper>
            <div className="tag-num">
              <Link
                component={RouterLink}
                to={`/individuals/${individual.id}`}
                style={{ fontSize: 24, color: 'black' }}
              >
                <img src={EarTagImage} alt="tag-number" width="20" />
                {individual.id.slice(5, 9)}{' '}
              </Link>
            </div>
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
                品種：{['黒毛和種', 'F1'][individual.breedType]}
              </BreedType>
            </Row>
            <Row>
              <Sex>性別：{['去勢', 'オス', 'メス'][individual.sex]}</Sex>
              <Category>
                種別：
                {['肥育', '繁殖', '子牛', '育成'][individual.category]}
              </Category>
              <Location>
                場所：{individual.name} {individual.no}{' '}
              </Location>
            </Row>
          </MainWrapper>
        </IndividualContentWrapper>
      </ThemeProvider>
    ))}
  </>
);

export default IndividualsList;
