import { TRANSFER } from 'apis/transfers';
import { FC } from 'react';

const DisplayTransfers: FC<{ transfers: TRANSFER[] }> = ({ transfers }) => (
  <>
    <div>{transfers.length}</div>div
  </>
);

export default DisplayTransfers;
