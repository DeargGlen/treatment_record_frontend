/* eslint-disable react/jsx-props-no-spreading */
import { FC, useEffect, useReducer, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import {
  fetchIndividualTags,
  postIndividualTag,
  INDIVIDUAL_TAG_DATA,
  IndividualTagOptionType,
} from 'apis/individualtags';

// constants
import { REQUEST_STATE } from 'states';

// reducers
import {
  initialIndividualTagState,
  individualTagsActionTypes,
  individualTagsReducer,
} from 'reducers/individualtags';

const filter = createFilterOptions<IndividualTagOptionType>();

const IndividualTagRegister: FC<{
  selectedTagsList: IndividualTagOptionType[];
  setSelectedTagsList: React.Dispatch<
    React.SetStateAction<IndividualTagOptionType[]>
  >;
}> = ({ selectedTagsList, setSelectedTagsList }) => {
  const [, dispatch] = useReducer(
    individualTagsReducer,
    initialIndividualTagState,
  );
  const [tagsList, setTagsList] = useState<IndividualTagOptionType[]>([]);

  useEffect(() => {
    dispatch({ type: individualTagsActionTypes.FETCHING });
    fetchIndividualTags()
      .then((data: void | INDIVIDUAL_TAG_DATA) => {
        dispatch({
          type: individualTagsActionTypes.FETCH_SUCCESS,
          payload: {
            individualTags: data?.individualTags,
          },
        });
        setTagsList(data?.individualTags ?? []);
      })

      .catch(() => 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Autocomplete
      multiple
      id="tags-standard"
      onChange={(event, newValue) => {
        if (newValue.slice(-1)[0]?.inputValue) {
          // Create a new value from the user input
          setTagsList(
            tagsList?.concat({
              id: tagsList.length + 1,
              name: newValue.slice(-1)[0].inputValue ?? '',
            }),
          );
          setSelectedTagsList(
            selectedTagsList?.concat({
              id: tagsList.length + 1,
              name: newValue.slice(-1)[0].inputValue ?? '',
            }),
          );

          postIndividualTag({ name: newValue.slice(-1)[0]?.inputValue ?? '' })
            .then()
            .catch((e) => console.log(e));
        } else {
          setSelectedTagsList(newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.name);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            name: `"${inputValue}"タグを追加`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      isOptionEqualToValue={(option, value) => {
        if (value.inputValue) {
          if (value.inputValue === option.name) {
            return true;
          }

          return false;
        }
        if (option.name === value.name) {
          return true;
        }

        return false;
      }}
      options={tagsList ?? []}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }

        // Regular option
        return option.name;
      }}
      renderOption={(props, option) => <li {...props}>{option.name}</li>}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} variant="standard" />}
    />
  );
};

export default IndividualTagRegister;
