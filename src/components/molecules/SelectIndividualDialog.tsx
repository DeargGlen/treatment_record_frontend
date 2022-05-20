/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { FC, useEffect, useState } from 'react';
import { INDIVIDUALS_DATA, INDIVIDUAL } from 'apis/individuals';
import {
  Dialog,
  DialogTitle,
  Divider,
  TextField,
  ListItemButton,
} from '@mui/material';
import styled from 'styled-components';

import EarTagImage from 'images/ear.png';
import SearchIcon from '@mui/icons-material/Search';
import EarTagFormat from 'containers/func/earTagFormat';

const SearchBar = styled.div`
  margin-left: auto;
  margin-right: 0;
  width: 110px;
  background-color: #f5f5f5;
`;

const Num = styled.div`
  margin-top: auto;
  margin-bottom: auto;
`;

const Location = styled.div`
  margin-top: auto;
  margin-bottom: auto;
`;

export const SelectIndividualDialog: FC<{
  isOpen: boolean;
  onClose: (value: string) => void;
  selectedIndividual: string;
  individualsList: void | INDIVIDUAL[];
}> = ({ isOpen, onClose, selectedIndividual, individualsList }) => {
  const [selectedList, setIndividualsList] = useState<INDIVIDUAL[]>(
    individualsList!,
  );
  const [inputValue, setInputValue] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (inputValue.match(/\S/g)) {
      const filteredList: INDIVIDUAL[] = individualsList!.filter(
        (individual: INDIVIDUAL) =>
          individual.id?.slice(5, 9).startsWith(inputValue),
      );
      setIndividualsList(filteredList);

      return;
    }
    setIndividualsList(individualsList!);
  }, [individualsList, inputValue]);

  const handleIndividualClick = (value: string) => {
    onClose(value);
  };

  const handleClose = () => {
    onClose(selectedIndividual);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      scroll="paper"
    >
      <DialogTitle align="center">個体の選択</DialogTitle>
      <SearchBar>
        <SearchIcon sx={{ mt: 0.5, mb: 1 }} />
        <TextField
          value={inputValue}
          onChange={handleChange}
          margin="none"
          sx={{ width: 80 }}
          variant="standard"
          InputProps={{ inputComponent: EarTagFormat as never }}
        />
      </SearchBar>
      <Divider />
      <>
        {selectedList?.map((individual: INDIVIDUAL) => (
          <div key={individual.id}>
            <ListItemButton
              onClick={() => handleIndividualClick(individual.id)}
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                height: 50,
              }}
            >
              <Num>
                <img src={EarTagImage} alt="tag-number" width="15" />
                {individual.id?.slice(0, 5)}.
                <span style={{ fontWeight: 'bold' }}>
                  {individual.id.slice(5, 9)}
                </span>
                .{individual.id.slice(9, 10)}
              </Num>
              <Location>
                {individual.name} {individual.no}
              </Location>
            </ListItemButton>
            <Divider />
          </div>
        ))}
      </>
    </Dialog>
  );
};

export default SelectIndividualDialog;
