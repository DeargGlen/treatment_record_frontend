import { FC, useEffect, useReducer, useState } from 'react';
import SymptomTagSettingShow from 'components/organisms/SymptomTagSettingShow';
import { fetchSymptomTags, SYMPTOM_TAG_DATA } from 'apis/symptomtags';

// reducers
import {
  initialSymptomTagState,
  symptomTagsActionTypes,
  symptomTagsReducer,
} from 'reducers/symptomtags';

// constants
import { REQUEST_STATE } from 'states';

const ShowSettingSymptomTag: FC = () => {
  const [changedCount, setChangedCount] = useState(0);
  const [state, dispatch] = useReducer(
    symptomTagsReducer,
    initialSymptomTagState,
  );

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
      })

      .catch(() => 1);
  }, [changedCount]);

  return (
    <>
      {state.fetchState === REQUEST_STATE.LOADING ? (
        <div>ロード中</div>
      ) : (
        <SymptomTagSettingShow
          tags={state.symptomTagsList}
          changedCount={changedCount}
          setChangedCount={setChangedCount}
        />
      )}
    </>
  );
};

export default ShowSettingSymptomTag;
