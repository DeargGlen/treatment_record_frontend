import { FC } from 'react';
import { Skeleton } from '@mui/material';
import { TreatmentContentWrapper, MainWrapper } from 'Style';

const TreamentsSkelton: FC = () => (
  <>
    {[...Array(6).keys()].map((value) => (
      <TreatmentContentWrapper key={value}>
        <MainWrapper>
          <Skeleton width="20%" style={{ marginBottom: 8 }} />
          <Skeleton width="100%" style={{ marginBottom: 4 }} />
          <Skeleton width="100%" style={{ marginBottom: 4 }} />
          <Skeleton width="100%" style={{ marginBottom: 4 }} />
          <Skeleton width="100%" />
        </MainWrapper>
      </TreatmentContentWrapper>
    ))}
  </>
);

export default TreamentsSkelton;
