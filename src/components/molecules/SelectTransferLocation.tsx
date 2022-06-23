import { TRANSFER_INDIVIDUAL } from 'apis/transfers';
import { FC } from 'react';
import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Button,
} from '@mui/material';
import EarTagImage from 'images/ear.png';

const SelectTransferLocation: FC<{
  transfer: TRANSFER_INDIVIDUAL[];
  handleClickSelect: (individual: TRANSFER_INDIVIDUAL) => void;
}> = ({ transfer, handleClickSelect }) => (
  <>
    <Paper style={{ marginBottom: 20 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">耳標</TableCell>
              <TableCell align="center">移動元</TableCell>
              <TableCell align="center">移動先</TableCell>
              <TableCell align="center">選択</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transfer.map((individual) => (
              <TableRow key={individual.id}>
                <TableCell align="center">
                  <img src={EarTagImage} alt="tag-number" height="16" />
                  {individual.id.slice(5, 9)}
                </TableCell>
                <TableCell align="center">
                  {individual.prevAreaName ?? ''}
                  {individual.prevBarnName ?? ''}
                  {individual.prevBlockNo ?? ''}
                </TableCell>
                <TableCell align="center">
                  {individual.afterAreaName ?? ''}
                  {individual.afterBarnName ?? ''}
                  {individual.afterBlockNo ?? ''}
                </TableCell>
                <TableCell align="center">
                  <Button onClick={() => handleClickSelect(individual)}>
                    選択
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  </>
);

export default SelectTransferLocation;
