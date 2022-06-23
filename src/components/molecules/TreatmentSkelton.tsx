import { FC } from 'react';
import { Skeleton } from '@mui/material';
import { ContentWrapper, MainWrapper } from 'Style';
import styled from 'styled-components';
import Divider from '@mui/material/Divider';

const Ear = styled.div`
  display: flex;
  justify-content: center;
  line-height: 30px;
`;

const TreatmentSkelton: FC = () => (
  <>
    <MainWrapper>
      <Ear>
        <Skeleton width="20%" />
      </Ear>
      <Skeleton width="100%" style={{ marginTop: 1, marginBottom: 2 }} />
      <Divider />
      <Skeleton width="100%" style={{ marginTop: 1, marginBottom: 2 }} />
      <Divider />
      <Skeleton width="100%" style={{ marginTop: 1, marginBottom: 2 }} />
      <Skeleton width="100%" style={{ marginTop: 1, marginBottom: 5 }} />
      <Divider />
      <Skeleton width="100%" style={{ marginTop: 1, marginBottom: 2 }} />
      <Skeleton width="100%" style={{ marginTop: 1, marginBottom: 5 }} />
      <Divider />
      <Skeleton width="100%" style={{ marginTop: 1, marginBottom: 2 }} />
      <Divider />
      <Skeleton width="100%" style={{ marginTop: 1, marginBottom: 2 }} />
      <Divider />
    </MainWrapper>

    {[...Array(5).keys()].map((value) => (
      <div key={value}>
        <ContentWrapper>
          <MainWrapper>
            <Skeleton width="100%" style={{ marginTop: 4, marginBottom: 4 }} />
            <Skeleton width="100%" style={{ marginBottom: 4 }} />
          </MainWrapper>
        </ContentWrapper>
        <Divider />
      </div>
    ))}
  </>
);

export default TreatmentSkelton;
