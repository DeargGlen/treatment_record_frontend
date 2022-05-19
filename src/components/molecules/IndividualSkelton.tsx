import { FC } from 'react';
import { Skeleton } from '@mui/material';
import { IndividualContentWrapper, MainWrapper } from 'Style';
import styled from 'styled-components';
import Divider from '@mui/material/Divider';

const Ear = styled.div`
  display: flex;
  justify-content: left;
  line-height: 30px;
`;

const IndividualSkelton: FC = () => (
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
      <Divider />
      <Skeleton width="100%" style={{ marginTop: 1, marginBottom: 2 }} />
      <Divider />
      <Skeleton width="100%" style={{ marginTop: 1, marginBottom: 2 }} />
      <Divider />
      <Skeleton width="100%" style={{ marginTop: 1, marginBottom: 2 }} />
      <Divider />
      <Skeleton width="100%" style={{ marginTop: 1, marginBottom: 2 }} />
      <Divider />
      <Skeleton width="100%" style={{ marginTop: 1, marginBottom: 2 }} />
      <Divider />
      <Skeleton width="100%" style={{ marginTop: 1, marginBottom: 2 }} />
      <Divider />
      <Skeleton width="100%" style={{ marginTop: 1, marginBottom: 2 }} />
      <Divider />
      <Skeleton width="100%" style={{ marginTop: 1, marginBottom: 2 }} />
      <Divider />
      <Skeleton width="100%" style={{ marginTop: 1, marginBottom: 2 }} />
      <Divider />
    </MainWrapper>

    {[...Array(5).keys()].map((value) => (
      <IndividualContentWrapper key={value}>
        <MainWrapper>
          <Skeleton width="100%" style={{ marginTop: 4, marginBottom: 4 }} />
          <Skeleton width="100%" style={{ marginTop: 4, marginBottom: 4 }} />
          <Skeleton width="100%" style={{ marginTop: 4, marginBottom: 4 }} />
          <Skeleton width="100%" style={{ marginBottom: 4 }} />
        </MainWrapper>
      </IndividualContentWrapper>
    ))}
  </>
);

export default IndividualSkelton;
