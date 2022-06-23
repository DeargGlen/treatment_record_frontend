/* eslint-disable react/jsx-props-no-spreading */
import { FC, useEffect, useReducer, useState } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import {
  fetchDiseaseTags,
  postDiseaseTag,
  DISEASE_TAG_DATA,
  DiseaseTagOptionType,
} from 'apis/diseasetags';

// reducers
import {
  initialDiseaseTagState,
  diseaseTagsActionTypes,
  diseaseTagsReducer,
} from 'reducers/diseasetags';

const filter = createFilterOptions<DiseaseTagOptionType>();

const DiseaseTagRegister: FC<{
  // eslint-disable-next-line react/require-default-props
  initialTagsList?: DiseaseTagOptionType[];
  selectedTagsList: DiseaseTagOptionType[];
  setSelectedTagsList: React.Dispatch<
    React.SetStateAction<DiseaseTagOptionType[]>
  >;
}> = ({ initialTagsList, selectedTagsList, setSelectedTagsList }) => {
  const [, dispatch] = useReducer(diseaseTagsReducer, initialDiseaseTagState);
  const [tagsList, setTagsList] = useState<DiseaseTagOptionType[]>([]);
  const [changedCount, setChangedCount] = useState(0);
  const [length, setLength] = useState(0);

  useEffect(() => {
    dispatch({ type: diseaseTagsActionTypes.FETCHING });
    fetchDiseaseTags()
      .then((data: void | null | DISEASE_TAG_DATA) => {
        dispatch({
          type: diseaseTagsActionTypes.FETCH_SUCCESS,
          payload: {
            diseaseTags: data?.diseaseTags,
          },
        });
        setTagsList(data?.diseaseTags ?? []);
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
          postDiseaseTag({ name: newValue.slice(-1)[0]?.inputValue ?? '' })
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
            .catch(() => null);
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

export default DiseaseTagRegister;
