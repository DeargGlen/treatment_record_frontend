/* eslint-disable react/jsx-props-no-spreading */
import { FC, useEffect, useReducer, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import {
  fetchSymptomTags,
  postSymptomTag,
  SYMPTOM_TAG_DATA,
  SymptomTagOptionType,
} from 'apis/symptomtags';

// constants
import { REQUEST_STATE } from 'states';

// reducers
import {
  initialSymptomTagState,
  symptomTagsActionTypes,
  symptomTagsReducer,
} from 'reducers/symptomtags';

const filter = createFilterOptions<SymptomTagOptionType>();

const SymptomTagRegister: FC<{
  // eslint-disable-next-line react/require-default-props
  initialTagsList?: SymptomTagOptionType[];
  selectedTagsList: SymptomTagOptionType[];
  setSelectedTagsList: React.Dispatch<
    React.SetStateAction<SymptomTagOptionType[]>
  >;
}> = ({ initialTagsList, selectedTagsList, setSelectedTagsList }) => {
  const [, dispatch] = useReducer(symptomTagsReducer, initialSymptomTagState);
  const [tagsList, setTagsList] = useState<SymptomTagOptionType[]>([]);
  const [changedCount, setChangedCount] = useState(0);
  const [length, setLength] = useState(0);

  useEffect(() => {
    dispatch({ type: symptomTagsActionTypes.FETCHING });
    fetchSymptomTags()
      .then((data: void | SYMPTOM_TAG_DATA) => {
        dispatch({
          type: symptomTagsActionTypes.FETCH_SUCCESS,
          payload: {
            symptomTags: data?.symptomTags,
          },
        });
        setTagsList(data?.symptomTags ?? []);
      })

      .catch(() => 1);
  }, [changedCount]);

  return (
    <Autocomplete
      multiple
      id="tags-standard"
      defaultValue={initialTagsList ?? []}
      onChange={(event, newValue) => {
        if (newValue.slice(-1)[0]?.inputValue && newValue.length > length) {
          postSymptomTag({
            name: newValue.slice(-1)[0]?.inputValue ?? '',
          })
            .then(() => {
              setChangedCount(changedCount + 1);
              setSelectedTagsList(
                selectedTagsList?.concat({
                  id: tagsList.length + 1,
                  name: newValue.slice(-1)[0].inputValue ?? '',
                }),
              );
              setLength(newValue.length);
            })
            .catch((e) => console.log(e));
        } else {
          setSelectedTagsList(newValue);
          setLength(newValue.length);
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

export default SymptomTagRegister;
