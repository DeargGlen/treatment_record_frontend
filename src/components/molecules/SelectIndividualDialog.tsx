import { FC } from 'react';
import { Dialog, DialogTitle } from '@mui/material';

export const SelectIndividualDialog: FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => (
  <Dialog open={isOpen} onClose={onClose}>
    <DialogTitle>個体の選択</DialogTitle>
  </Dialog>
);

export default SelectIndividualDialog;
