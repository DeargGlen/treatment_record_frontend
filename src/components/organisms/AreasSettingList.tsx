/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { FC, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import {
  AREA_WITH_BARNS,
  BARN,
  destroyArea,
  destroyBarn,
  postArea,
  postBarn,
} from 'apis/locations';
import {
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Divider,
  Dialog,
  DialogTitle,
  TextField,
  DialogActions,
} from '@mui/material';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `0.5px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AreasSettingList: FC<{
  areas: AREA_WITH_BARNS[];
  changedCount: number;
  setChangedCount: React.Dispatch<React.SetStateAction<number>>;
}> = ({ areas, changedCount, setChangedCount }) => {
  const [areaName, setAreaName] = useState('');
  const [editState, setEdit] = useState(false);
  const [barnName, setBarnName] = useState('');
  const [areaIdForSubmit, setAreaId] = useState(0);

  const [expanded, setExpanded] = React.useState<number | false>(false);

  const [openAreaDialog, setOpenAreaDialog] = useState(false);
  const [openBarnDialog, setOpenBarnDialog] = useState(false);

  const handleClickOpenArea = () => {
    setOpenAreaDialog(true);
  };

  const handleClickOpenBarn = (relatedAreaId: number) => {
    setOpenBarnDialog(true);
    setAreaId(relatedAreaId);
  };

  const handleCloseArea = () => {
    setOpenAreaDialog(false);
    setAreaName('');
  };

  const handleCloseBarn = () => {
    setOpenBarnDialog(false);
    setBarnName('');
  };

  const toggleEdit = () => {
    setEdit(!editState);
    setExpanded(false);
  };

  const handleChangeExpand =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const handleChangeArea = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setAreaName(event.target.value);
  };

  const handleChangeBarn = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setBarnName(event.target.value);
  };

  const navigate = useNavigate();

  const submitDestroyArea = (areaId: number) => {
    destroyArea(areaId)
      .then(() => {
        navigate('/settings/farm/locations');
        setChangedCount(changedCount + 1);
      })
      .catch(() => null);
  };

  const submitPostArea = () => {
    postArea({
      name: areaName,
    })
      .then(() => {
        setAreaId(0);
        navigate('/settings/farm/locations');
        handleCloseArea();
        setChangedCount(changedCount + 1);
      })
      .catch(() => null);
  };

  const submitDestroyBarn = (barnId: number) => {
    destroyBarn(barnId)
      .then(() => {
        navigate('/settings/farm/locations');
        handleCloseBarn();
        setChangedCount(changedCount + 1);
      })
      .catch(() => null);
  };

  const submitPostBarn = () => {
    postBarn({
      name: barnName,
      id: areaIdForSubmit,
    })
      .then(() => {
        navigate('/settings/farm/locations');
        setChangedCount(changedCount + 1);
      })
      .catch(() => null);
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ fontSize: 24, textAlign: 'center' }}>エリア名の設定</div>
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
      {areas?.map((area: AREA_WITH_BARNS) => (
        <Accordion
          expanded={expanded === area.id || editState}
          onChange={handleChangeExpand(area.id)}
          key={area.id}
        >
          <AccordionSummary
            aria-controls="area-content"
            id="area-header"
            sx={{ paddingRight: 0 }}
          >
            <Typography sx={{ flexShrink: 0 }}>{area.name}</Typography>
            {editState ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => submitDestroyArea(area.id)}
                sx={{ mt: 'auto', mb: 'auto', mr: 1, ml: 'auto', height: 24 }}
              >
                削除
              </Button>
            ) : null}
          </AccordionSummary>

          {area.barns.length ? <Divider /> : null}
          {area.barns?.map((barn: BARN) => {
            const link = `/settings/barns/${barn.id}`;

            return (
              <div key={barn.id} style={{ display: 'flex' }}>
                <ListItem>
                  <ListItemButton component={RouterLink} to={link}>
                    <ListItemText primary={barn.name} sx={{ ml: 5 }} />

                    <ArrowForwardIosSharpIcon
                      sx={{ fontSize: '0.9em', color: 'gray' }}
                    />
                  </ListItemButton>
                </ListItem>
                {editState ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => submitDestroyBarn(barn.id)}
                    sx={{ mt: 'auto', mb: 'auto', mr: 1, height: 24 }}
                  >
                    削除
                  </Button>
                ) : null}
              </div>
            );
          })}
          {editState ? (
            <>
              <Divider />
              <div style={{ display: 'flex' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleClickOpenBarn(area.id)}
                  sx={{
                    mt: '6.25px',
                    mb: '6.25px',
                    ml: 'auto',
                    mr: 1,
                    height: 24,
                  }}
                >
                  追加
                </Button>
              </div>
            </>
          ) : null}
        </Accordion>
      ))}
      <Divider />
      {editState ? (
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleClickOpenArea}
            sx={{ height: 24 }}
          >
            追加
          </Button>
        </div>
      ) : null}
      <Dialog
        open={openAreaDialog}
        onClose={handleCloseArea}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>登録するエリア名</DialogTitle>
        <TextField
          autoFocus
          margin="dense"
          id="areaName"
          label="エリア名"
          type="text"
          variant="standard"
          value={areaName}
          onChange={handleChangeArea}
          sx={{ width: '80%', mr: 'auto', ml: 'auto' }}
        />
        <DialogActions>
          <Button onClick={handleCloseArea}>キャンセル</Button>
          <Button onClick={submitPostArea}>登録</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openBarnDialog}
        onClose={handleCloseBarn}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>登録する牛舎名</DialogTitle>
        <TextField
          autoFocus
          margin="dense"
          id="areaName"
          label="エリア名"
          type="text"
          variant="standard"
          value={barnName}
          onChange={handleChangeBarn}
          sx={{ width: '80%', mr: 'auto', ml: 'auto' }}
        />
        <DialogActions>
          <Button onClick={handleCloseBarn}>キャンセル</Button>
          <Button onClick={submitPostBarn}>登録</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AreasSettingList;
