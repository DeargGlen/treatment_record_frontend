import { FC, useEffect, useReducer, useState } from 'react';
import * as React from 'react';
import {
  INDIVIDUALS_DATA,
  INDIVIDUAL,
  fetchIndividualsOnlyShipped,
} from 'apis/individuals';
import { Fab, Tooltip, Typography, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import IndividualsList from 'components/organisms/IndividualsList';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import styled from 'styled-components';
import EarTagFormat from 'containers/func/earTagFormat';
import { fetchIndividualTags, INDIVIDUAL_TAG_DATA } from 'apis/individualtags';

// components
import IndividualSkelton from 'components/molecules/IndividualsSkelton';

// constants
import { REQUEST_STATE } from 'states';

// reducers
import {
  initialIndividualsState,
  individualsActionTypes,
  individualsReducer,
} from 'reducers/individuals';
import {
  initialIndividualTagState,
  individualTagsActionTypes,
  individualTagsReducer,
} from 'reducers/individualtags';
import { breedTypeList, categoryList, sexList } from 'constant';

const SearchBar = styled.div`
  margin-left: auto;
  margin-right: 10px;
  margin-top: 4px;
  width: 95px;
  background-color: #f5f5f5;
`;
const Row = styled.div`
  display: flex;
`;
const SecondRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const AllShippedIndividuals: FC = () => {
  const location = useLocation();
  const { setIndividualTagId } =
    (location.state as {
      setIndividualTagId: number | null;
    }) ?? '';
  const [state, dispatch] = useReducer(
    individualsReducer,
    initialIndividualsState,
  );
  const [selectedList, setIndividualsList] = useState<INDIVIDUAL[]>(
    state.individualsList,
  );

  const [inputValue, setInputValue] = useState('');

  const [individualTagState, individualTagDispatch] = useReducer(
    individualTagsReducer,
    initialIndividualTagState,
  );

  type TAGS = {
    individualTag: number | null;
    sex: number | null;
    category: number | null;
    breedType: number | null;
  };
  const [tagValues, setTagValues] = useState<TAGS>({
    individualTag: setIndividualTagId ?? null,
    sex: null,
    category: null,
    breedType: null,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setInputValue(e.target.value);
  };

  const handleTagChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setTagValues({
      ...tagValues,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    dispatch({ type: individualsActionTypes.FETCHING });
    fetchIndividualsOnlyShipped()
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

  useEffect(() => {
    individualTagDispatch({ type: individualTagsActionTypes.FETCHING });
    fetchIndividualTags()
      .then((data: void | null | INDIVIDUAL_TAG_DATA) => {
        individualTagDispatch({
          type: individualTagsActionTypes.FETCH_SUCCESS,
          payload: {
            individualTags: data?.individualTags,
          },
        });
      })
      .catch(() => 1);
  }, []);

  useEffect(() => {
    const filteredList: INDIVIDUAL[] = state.individualsList.filter(
      (individual: INDIVIDUAL) =>
        (!tagValues.individualTag ||
          individual.individualTags.find(
            ({ id }) => id === Number(tagValues.individualTag),
          )) &&
        (!inputValue.match(/\S/g) ||
          individual.id.slice(5, 9).startsWith(inputValue)) &&
        (!tagValues.sex || individual.sex === Number(tagValues.sex)) &&
        (!tagValues.category ||
          individual.category === Number(tagValues.category)) &&
        (!tagValues.breedType ||
          individual.breedType === Number(tagValues.breedType)),
    );

    const locationDeletedList: INDIVIDUAL[] = filteredList.map(
      (individual) => ({
        ...individual,
        blockId: null,
        areaName: null,
        barnName: null,
        no: null,
      }),
    );
    setIndividualsList(locationDeletedList);
  }, [state.individualsList, inputValue, tagValues]);

  return (
    <>
      <div style={{ fontSize: 24, textAlign: 'center' }}>出荷済みの牛一覧</div>
      <Row>
        <p style={{ lineHeight: 2.5 }}>個体タグ：</p>
        <TextField
          select
          required
          value={tagValues.individualTag ?? ''}
          onChange={handleTagChange}
          variant="standard"
          name="individualTag"
          sx={{ width: 140, mt: 0.5 }}
          SelectProps={{
            native: true,
          }}
        >
          <option value=""> </option>
          {individualTagState.individualTagsList.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </TextField>
        <SearchBar>
          <SearchIcon sx={{ mt: 0.5, mb: 1 }} />
          <TextField
            value={inputValue}
            onChange={handleChange}
            margin="none"
            sx={{ width: 65 }}
            variant="standard"
            InputProps={{ inputComponent: EarTagFormat as never }}
          />
        </SearchBar>
      </Row>
      <SecondRow>
        <Row>
          <p style={{ lineHeight: 2.5 }}>性別：</p>
          <TextField
            select
            required
            value={tagValues.sex ?? ''}
            onChange={handleTagChange}
            variant="standard"
            name="sex"
            sx={{ width: 60, mt: 0.5 }}
            SelectProps={{
              native: true,
            }}
          >
            <option value=""> </option>
            {sexList.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Row>
        <Row>
          <p style={{ lineHeight: 2.5 }}>種別：</p>
          <TextField
            select
            required
            value={tagValues.category ?? ''}
            onChange={handleTagChange}
            variant="standard"
            name="category"
            sx={{ width: 60, mt: 0.5 }}
            SelectProps={{
              native: true,
            }}
          >
            <option value=""> </option>
            {categoryList.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Row>
        <Row>
          <p style={{ lineHeight: 2.5 }}>品種：</p>
          <TextField
            select
            required
            value={tagValues.breedType ?? ''}
            onChange={handleTagChange}
            variant="standard"
            name="breedType"
            sx={{ width: 90, mt: 0.5 }}
            SelectProps={{
              native: true,
            }}
          >
            <option value=""> </option>
            {breedTypeList.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Row>
      </SecondRow>

      {state.fetchState === REQUEST_STATE.LOADING ? (
        <>
          <IndividualSkelton />
        </>
      ) : (
        <IndividualsList individuals={selectedList} />
      )}

      <Tooltip title={<Typography fontSize={15}>個体の登録</Typography>}>
        <Fab
          color="primary"
          aria-label="add"
          component={RouterLink}
          to="/individuals/new"
          sx={{ position: 'fixed', bottom: 85, right: 20 }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
    </>
  );
};

export default AllShippedIndividuals;
