/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { FC } from 'react';
import { BARN_SHOW_DATA, BLOCK_WITH_INDIVIDUALS } from 'apis/locations';
import IndividualsListForLoc from 'components/organisms/IndividualsListForLoc';
import { styled } from '@mui/material/styles';
import { Typography, Divider } from '@mui/material';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';

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

const BarnShow: FC<{ barn: BARN_SHOW_DATA }> = ({ barn }) => {
  const Sortedblocks: BLOCK_WITH_INDIVIDUALS[] | undefined = barn.blocks?.sort(
    (n1, n2) => {
      if (n1.no > n2.no) {
        return 1;
      }
      if (n1.no < n2.no) {
        return -1;
      }

      return 0;
    },
  );

  return (
    <>
      <div style={{ fontSize: 24, textAlign: 'center' }}>{barn.name}</div>
      {Sortedblocks.map((block: BLOCK_WITH_INDIVIDUALS) => (
        <Accordion key={block.id}>
          <AccordionSummary
            aria-controls="area-content"
            id="area-header"
            sx={{ paddingRight: 0 }}
          >
            <Typography sx={{ flexShrink: 0 }}>{block.no}</Typography>
            <Divider />
          </AccordionSummary>

          {block.individuals.length ? <Divider /> : null}
          <IndividualsListForLoc individuals={block.individuals} />
        </Accordion>
      ))}
    </>
  );
};

export default BarnShow;
