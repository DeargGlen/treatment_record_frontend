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
import { breedTypeList, categoryList, sexList } from 'constant';

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;
const TagNum = styled.div`
  font-size: 24px;
`;

const IndividualsListForLoc: FC<{ individuals: void | INDIVIDUAL[] }> = ({
  individuals,
}) => (
  <>
    <Divider />
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
                <p>
                  個体識別番号：{individual.id.slice(0, 5)}.
                  <span style={{ fontWeight: 'bold' }}>
                    {individual.id.slice(5, 9)}
                  </span>
                  .{individual.id.slice(9, 10)}
                </p>
              </Row>
              <Row>
                <p>出生日：{handleToDate(individual.dateOfBirth)}</p>
                <p>月齢：{individual.age}</p>
                <p>品種：{breedTypeList[individual.breedType]?.label}</p>
              </Row>
              <Row>
                <p>性別：{sexList[individual.sex]?.label}</p>
                <p>
                  種別：
                  {categoryList[individual.category]?.label}
                </p>

                {individual.areaName ? (
                  <p>
                    場所：{individual.areaName} {individual.barnName}{' '}
                    {individual.no}{' '}
                  </p>
                ) : null}
              </Row>
              {individual.breedType === 0 ? (
                <>
                  <Row>
                    <p>
                      父：
                      {individual.fatherName ? individual.fatherName : '-'}
                    </p>
                    <p>
                      母の父：
                      {individual.fatherName ? individual.fatherName : '-'}
                    </p>
                    <p>
                      祖母の父：
                      {individual.fatherName ? individual.fatherName : '-'}
                    </p>
                  </Row>
                </>
              ) : null}
            </Link>
          </MainWrapper>
        </IndividualContentWrapper>
        <Divider />
      </ThemeProvider>
    ))}
  </>
);

export default IndividualsListForLoc;
