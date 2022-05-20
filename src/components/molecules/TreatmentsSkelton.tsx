import { FC } from 'react';
import { Skeleton, Divider } from '@mui/material';
import { TreatmentContentWrapper, MainWrapper } from 'Style';

const TreamentsSkelton: FC = () => (
  <>
    <Divider />
    {[...Array(6).keys()].map((value) => (
      <div key={value}>
        <TreatmentContentWrapper>
          <MainWrapper>
            <Skeleton width="20%" style={{ marginBottom: 8 }} />
            <Skeleton width="100%" style={{ marginBottom: 4 }} />
            <Skeleton width="100%" style={{ marginBottom: 4 }} />
            <Skeleton width="100%" style={{ marginBottom: 4 }} />
            <Skeleton width="100%" />
          </MainWrapper>
        </TreatmentContentWrapper>
        <Divider />
      </div>
    ))}
  </>
);

export default TreamentsSkelton;
