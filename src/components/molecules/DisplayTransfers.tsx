import { TRANSFER } from 'apis/transfers';
import { FC } from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Divider,
} from '@mui/material';
import EarTagImage from 'images/ear.png';
import handleToDateAndYobi from 'containers/func/handleToDateAndYobi';

const DisplayTransfers: FC<{ transfers: TRANSFER[] }> = ({ transfers }) => (
  <>
    {transfers.map((transfer) => (
      <Paper key={transfer.date} style={{ marginBottom: 20 }}>
        <div>
          <p style={{ marginLeft: 10 }}>{handleToDateAndYobi(transfer.date)}</p>
        </div>
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">耳標番号</TableCell>
                <TableCell align="center">移動元</TableCell>
                <TableCell align="center">移動先</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transfer.transferEntries.map((row) => (
                <TableRow key={row.id}>
                  <TableCell align="center">
                    <img src={EarTagImage} alt="tag-number" height="16" />
                    {row.individualId.slice(5, 9)}
                  </TableCell>
                  <TableCell align="center">
                    {row.prevAreaName} {row.prevBarnName} {row.prevBlockNo}
                  </TableCell>
                  <TableCell align="center">
                    {row.afterAreaName} {row.afterBarnName} {row.afterBlockNo}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    ))}
  </>
);

export default DisplayTransfers;
