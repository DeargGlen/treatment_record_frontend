/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { FC } from 'react';
import {
  Dialog,
  DialogTitle,
  Divider,
  ListItemText,
  ListItemButton,
  ListItem,
} from '@mui/material';
import { BARN_SHOW_DATA, BLOCK } from 'apis/locations';

export const SelectBlockDialog: FC<{
  isOpen: boolean;
  onClose: (value: number, blockNoValue: string) => void;
  selectedBlockId: number;
  selectedBlockNo: string;
  barn: void | BARN_SHOW_DATA;
}> = ({ isOpen, onClose, selectedBlockId, selectedBlockNo, barn }) => {
  const Sortedblocks: BLOCK[] | undefined = barn?.blocks?.sort((n1, n2) => {
    if (n1.no > n2.no) {
      return 1;
    }
    if (n1.no < n2.no) {
      return -1;
    }

    return 0;
  });

  const handleBlockClose = () => {
    onClose(selectedBlockId, selectedBlockNo);
  };

  const onBlockClick = (blockId: number, blockNo: string) => {
    onClose(blockId, blockNo);
  };

  return (
    <>
      <Dialog
        open={isOpen}
        onClose={handleBlockClose}
        maxWidth="sm"
        fullWidth
        scroll="paper"
      >
        <DialogTitle>{barn?.name}</DialogTitle>
        <Divider />
        {Sortedblocks?.map((block: BLOCK) => (
          <div key={block.id}>
            <ListItem sx={{ height: 49 }}>
              <ListItemButton onClick={() => onBlockClick(block.id, block.no)}>
                <ListItemText>{block.no}</ListItemText>
              </ListItemButton>
            </ListItem>
            <Divider />
          </div>
        ))}
      </Dialog>
    </>
  );
};

export default SelectBlockDialog;
