/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/unbound-method */
import { FC, useEffect, useReducer, useState } from 'react';
import {
  fetchIndividuals,
  INDIVIDUALS_DATA,
  INDIVIDUAL,
} from 'apis/individuals';
import {
  Fab,
  Tooltip,
  Typography,
  Container,
  InputBase,
  Box,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import IndividualsList from 'components/organisms/IndividualsList';
import { Link as RouterLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';

// components
import IndividualSkelton from 'components/molecules/IndividualsSkelton';

// constants
import { REQUEST_STATE } from 'states';

// reducers
import {
  initialState,
  individualsActionTypes,
  individualsReducer,
} from 'reducers/individuals';

const SearchBar = styled.div`
  margin-left: auto;
  margin-right: 0;
  width: 120px;
  background-color: #f5f5f5;
`;

const AllIndividuals: FC = () => {
  const [state, dispatch] = useReducer(individualsReducer, initialState);
  const [selectedList, setIndividualsList] = useState<INDIVIDUAL[]>(
    state.individualsList!,
  );
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (inputValue.match(/\S/g)) {
      const filteredList: INDIVIDUAL[] = state.individualsList!.filter(
        (individual: INDIVIDUAL) =>
          individual.id.slice(5, 9).startsWith(inputValue),
      );
      setIndividualsList(filteredList);

      return;
    }
    setIndividualsList(state.individualsList!);
  }, [state.individualsList, inputValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    dispatch({ type: individualsActionTypes.FETCHING });
    fetchIndividuals()
      .then((data: void | INDIVIDUALS_DATA) => {
        dispatch({
          type: individualsActionTypes.FETCH_SUCCESS,
          payload: {
            individuals: data?.individuals,
          },
        });
      })

      .catch(() => 1);
  }, []);

  return (
    <>
      <Container maxWidth="sm">
        <SearchBar>
          <SearchIcon />
          <InputBase
            placeholder="耳標番号"
            value={inputValue}
            onChange={handleChange}
            margin="none"
            sx={{ width: 90 }}
            inputProps={{ maxLength: 4 }}
          />
        </SearchBar>
        {state.fetchState === REQUEST_STATE.LOADING ? (
          <>
            <IndividualSkelton />
          </>
        ) : (
          <IndividualsList individuals={selectedList} />
        )}
      </Container>
      <Box
        sx={{
          position: 'fixed',
          bottom: 72,
          right: 40,
        }}
      >
        <Tooltip title={<Typography fontSize={15}>個体の登録</Typography>}>
          <Fab
            color="primary"
            aria-label="add"
            component={RouterLink}
            to="/individuals/new"
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Box>
    </>
  );
};

export default AllIndividuals;
