import { FC, useState } from 'react';
import { BARN_SHOW_DATA, BLOCK, postBlock, destroyBlock } from 'apis/locations';
import {
  ListItem,
  ListItemText,
  Button,
  Divider,
  Dialog,
  DialogActions,
  TextField,
  DialogTitle,
} from '@mui/material';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const BarnSettingShow: FC<{
  barn: BARN_SHOW_DATA;
  changedCount: number;
  setChangedCount: React.Dispatch<React.SetStateAction<number>>;
}> = ({ barn, changedCount, setChangedCount }) => {
  const Sortedblocks: BLOCK[] | undefined = barn.blocks?.sort((n1, n2) => {
    if (n1.no > n2.no) {
      return 1;
    }
    if (n1.no < n2.no) {
      return -1;
    }

    return 0;
  });

  const navigate = useNavigate();
  const [blockNo, setBlockNo] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [editState, setEdit] = useState(false);
  const toggleEdit = () => {
    setEdit(!editState);
  };
  const handleClose = () => {
    setOpenDialog(false);
    setBlockNo('');
  };
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleChangeBlock = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setBlockNo(event.target.value);
  };
  const submitPostBlock = () => {
    postBlock({
      no: blockNo,
      id: barn.id ?? 0,
    })
      .then(() => {
        navigate(`/settings/barns/${barn.id ?? 0}`);
        handleClose();
        setChangedCount(changedCount + 1);
      })
      .catch(() => null);
  };

  const submitDestroyBlock = (blockId: number) => {
    destroyBlock(blockId)
      .then(() => {
        navigate(`/settings/barns/${barn.id ?? 0}`);
        setChangedCount(changedCount + 1);
      })
      .catch(() => null);
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ fontSize: 24, textAlign: 'center' }}>{barn.name}</div>
        {editState ? (
          <Button variant="text" sx={{ ml: 'auto' }} onClick={toggleEdit}>
            完了
          </Button>
        ) : (
          <Button variant="text" sx={{ ml: 'auto' }} onClick={toggleEdit}>
            編集
          </Button>
        )}
      </div>
      <Divider />
      {Sortedblocks.map((block: BLOCK) => (
        <div key={block.id}>
          <ListItem sx={{ height: 49 }}>
            <ListItemText>{block.no}</ListItemText>
            {editState ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => submitDestroyBlock(block.id)}
              >
                削除
              </Button>
            ) : null}
          </ListItem>
          <Divider />
        </div>
      ))}
      {editState ? (
        <ButtonDiv>
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            追加
          </Button>
        </ButtonDiv>
      ) : null}

      <Dialog open={openDialog} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle>登録するマス名</DialogTitle>
        <TextField
          autoFocus
          margin="dense"
          id="areaName"
          label="エリア名"
          type="text"
          variant="standard"
          value={blockNo}
          onChange={handleChangeBlock}
          sx={{ width: '80%', mr: 'auto', ml: 'auto' }}
        />
        <DialogActions>
          <Button onClick={handleClose}>キャンセル</Button>
          <Button onClick={submitPostBlock}>登録</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BarnSettingShow;
