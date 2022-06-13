import { FC, useEffect, useReducer, useState } from 'react';
import IndividualTagSettingShow from 'components/organisms/IndividualTagSettingShow';
import { fetchIndividualTags, INDIVIDUAL_TAG_DATA } from 'apis/individualtags';

// reducers
import {
  initialIndividualTagState,
  individualTagsActionTypes,
  individualTagsReducer,
} from 'reducers/individualtags';

// constants
import { REQUEST_STATE } from 'states';

const ShowSettingIndividualTag: FC = () => {
  const [changedCount, setChangedCount] = useState(0);
  const [state, dispatch] = useReducer(
    individualTagsReducer,
    initialIndividualTagState,
  );

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
      })

      .catch(() => 1);
  }, [changedCount]);

  return (
    <>
      {state.fetchState === REQUEST_STATE.LOADING ? (
        <div>ロード中</div>
      ) : (
        <IndividualTagSettingShow
          tags={state.individualTagsList}
          changedCount={changedCount}
          setChangedCount={setChangedCount}
        />
      )}
    </>
  );
};

export default ShowSettingIndividualTag;
