import { FC } from 'react';
import { Skeleton, Divider } from '@mui/material';
import { IndividualContentWrapper, MainWrapper } from 'Style';

const IndividualsSkelton: FC = () => (
  <>
    <Divider />
    {[...Array(8).keys()].map((value) => (
      <div key={value}>
        <IndividualContentWrapper>
          <MainWrapper>
            <Skeleton width="20%" style={{ marginTop: 4 }} />
            <Skeleton width="80%" style={{ marginTop: 2 }} />
            <Skeleton width="100%" style={{ marginTop: 2 }} />
            <Skeleton width="100%" style={{ marginTop: 2 }} />
          </MainWrapper>
        </IndividualContentWrapper>
        <Divider />
      </div>
    ))}
  </>
);

export default IndividualsSkelton;
