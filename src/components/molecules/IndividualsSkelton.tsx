import { FC } from 'react';
import { Skeleton } from '@mui/material';
import { IndividualContentWrapper, MainWrapper } from 'Style';

const IndividualsSkelton: FC = () => (
  <>
    {[...Array(8).keys()].map((value) => (
      <IndividualContentWrapper key={value}>
        <MainWrapper>
          <Skeleton width="20%" style={{ marginTop: 4, marginBottom: 4 }} />
          <Skeleton width="40%" style={{ marginTop: 4, marginBottom: 4 }} />
          <Skeleton width="100%" style={{ marginBottom: 4 }} />
          <Skeleton width="100%" />
        </MainWrapper>
      </IndividualContentWrapper>
    ))}
  </>
);

export default IndividualsSkelton;
