/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { AREA_WITH_BARNS, BARN } from 'apis/locations';
import { ListItem, ListItemButton, ListItemText, Divider } from '@mui/material';

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

const AreasList: FC<{ areas: AREA_WITH_BARNS[] }> = ({ areas }) => {
  const [expanded, setExpanded] = React.useState<number | false>(false);

  const handleChangeExpand =
    (panel: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div style={{ fontSize: 24, textAlign: 'center' }}>
          場所から個体の表示
        </div>
      </div>
      {areas?.map((area: AREA_WITH_BARNS) => (
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

          {area.barns.length ? <Divider /> : null}
          {area.barns?.map((barn: BARN) => {
            const link = `/barns/${barn.id}`;

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
              </div>
            );
          })}
        </Accordion>
      ))}
      <Divider />
    </>
  );
};

export default AreasList;
