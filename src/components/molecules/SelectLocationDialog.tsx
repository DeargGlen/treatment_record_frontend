/* eslint-disable react/jsx-props-no-spreading */
import { FC, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  Divider,
  Typography,
  ListItemText,
  ListItemButton,
  ListItem,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import { AREA_WITH_BARNS, BARN } from 'apis/locations';

export const SelectLocationDialog: FC<{
  isOpen: boolean;
  onClose: (
    value: number,
    barnNameValue: string,
    areaNameValue: string,
    willOpenBlockDialog: boolean,
  ) => void;
  selectedBarnId: number;
  selectedBarnName: string;
  selectedAreaName: string;
  areasList: void | AREA_WITH_BARNS[];
}> = ({
  isOpen,
  onClose,
  selectedBarnId,
  selectedBarnName,
  selectedAreaName,
  areasList,
}) => {
  const handleLocationClose = () => {
    onClose(selectedBarnId, selectedBarnName, selectedAreaName, false);
  };

  const [expanded, setExpanded] = useState<number | false>(false);
  const handleChangeExpand =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

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

  const onBarnClick = (barnId: number, barnName: string, areaName: string) => {
    onClose(barnId, barnName, areaName, true);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleLocationClose}
      maxWidth="sm"
      fullWidth
      scroll="paper"
    >
      <DialogTitle align="center">場所の選択</DialogTitle>
      <Divider />
      <>
        {areasList?.map((area: AREA_WITH_BARNS) => (
          <Accordion
            expanded={expanded === area.id}
            onChange={handleChangeExpand(area.id)}
            key={area.id}
          >
            <AccordionSummary
              aria-controls="area-content"
              id="area-header"
              sx={{ paddingRight: 0 }}
            >
              <Typography sx={{ flexShrink: 0 }}>{area.name}</Typography>
            </AccordionSummary>

            <Divider />
            {area.barns?.map((barn: BARN) => (
              <div key={barn.id} style={{ display: 'flex' }}>
                <ListItem key={barn.id}>
                  <ListItemButton
                    onClick={() => onBarnClick(barn.id, barn.name, area.name)}
                  >
                    <ListItemText primary={barn.name} sx={{ ml: 5 }} />

                    <ArrowForwardIosSharpIcon
                      sx={{ fontSize: '0.9em', color: 'gray' }}
                    />
                  </ListItemButton>
                </ListItem>
              </div>
            ))}
          </Accordion>
        ))}
        <Divider />
      </>
    </Dialog>
  );
};

export default SelectLocationDialog;
