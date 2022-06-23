import { FC, useEffect, useState } from 'react';
import { INDIVIDUALS_DATA, INDIVIDUAL } from 'apis/individuals';
import {
  Dialog,
  DialogTitle,
  Divider,
  TextField,
  ListItemButton,
  Button,
} from '@mui/material';
import styled from 'styled-components';

import EarTagImage from 'images/ear.png';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckIcon from '@mui/icons-material/Check';
import EarTagFormat from 'containers/func/earTagFormat';
import { TRANSFER_INDIVIDUAL } from 'apis/transfers';

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

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

type INDIVIDUAL_SELECTION = {
  id: string;
  areaName: string | null;
  barnName: string | null;
  no: string | null;
  blockId: number;
  selected: boolean;
};

export const SelectTransferIndividualsDialog: FC<{
  isOpen: boolean;
  onClose: (List: TRANSFER_INDIVIDUAL[]) => void;
  selectedIndividuals: TRANSFER_INDIVIDUAL[];
  individualsList: INDIVIDUAL[];
}> = ({ isOpen, onClose, selectedIndividuals, individualsList }) => {
  const [tmpIndividuals, setTmpIndividuals] =
    useState<TRANSFER_INDIVIDUAL[]>(selectedIndividuals);

  const [individualsWithSelect, setIndividualsWithSelect] = useState<
    INDIVIDUAL_SELECTION[]
  >(
    individualsList?.map((individual) => ({
      id: individual.id,
      areaName: individual.areaName,
      barnName: individual.barnName,
      no: individual.no,
      blockId: individual.blockId ?? 0,
      selected: tmpIndividuals.some((element) => element.id === individual.id),
    })) ?? [],
  );

  const [selectedList, setSelectedList] = useState<INDIVIDUAL_SELECTION[]>(
    individualsWithSelect,
  );
  const [inputValue, setInputValue] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    if (inputValue.match(/\S/g)) {
      const filteredList: INDIVIDUAL_SELECTION[] =
        individualsWithSelect?.filter((individual: INDIVIDUAL_SELECTION) =>
          individual.id?.slice(5, 9).startsWith(inputValue),
        ) ?? [];
      setSelectedList(filteredList);

      return;
    }
    setSelectedList(individualsWithSelect ?? []);
  }, [individualsWithSelect, inputValue]);

  const handleClose = () => {
    onClose(selectedIndividuals);
  };
  const handleClickComplete = () => {
    onClose(tmpIndividuals);
  };

  const handleIndividualClick = (individual: INDIVIDUAL_SELECTION) => {
    setTmpIndividuals([
      ...tmpIndividuals,
      {
        id: individual.id,
        prevAreaName: individual.areaName ?? '',
        prevBarnName: individual.barnName ?? '',
        prevBlockNo: individual.no ?? '',
        prevBlockId: individual.blockId,
      },
    ]);
    setIndividualsWithSelect(
      individualsWithSelect.map((ind) =>
        ind.id === individual.id ? { ...ind, selected: true } : ind,
      ),
    );
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
      <Row>
        <Button onClick={handleClose}>キャンセル</Button>
        <Button onClick={handleClickComplete}>完了</Button>
      </Row>
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
        {selectedList?.map((individual: INDIVIDUAL_SELECTION) => (
          <div key={individual.id}>
            <ListItemButton
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                height: 50,
              }}
              onClick={() => handleIndividualClick(individual)}
              disabled={individual.selected}
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
                {individual.areaName}
                {individual.barnName} {individual.no}
              </Location>
              {individual.selected ? <CheckIcon /> : <AddCircleOutlineIcon />}
            </ListItemButton>
            <Divider />
          </div>
        ))}
      </>
    </Dialog>
  );
};

export default SelectTransferIndividualsDialog;
