import { FC, useEffect, useReducer, useState } from 'react';
import DiseaseTagSettingShow from 'components/organisms/DiseaseTagSettingShow';
import { fetchDiseaseTags, DISEASE_TAG_DATA } from 'apis/diseasetags';

// reducers
import {
  initialDiseaseTagState,
  diseaseTagsActionTypes,
  diseaseTagsReducer,
} from 'reducers/diseasetags';

// constants
import { REQUEST_STATE } from 'states';

const ShowSettingDiseaseTag: FC = () => {
  const [changedCount, setChangedCount] = useState(0);
  const [state, dispatch] = useReducer(
    diseaseTagsReducer,
    initialDiseaseTagState,
  );

  useEffect(() => {
    dispatch({ type: diseaseTagsActionTypes.FETCHING });
    fetchDiseaseTags()
      .then((data: void | DISEASE_TAG_DATA) => {
        dispatch({
          type: diseaseTagsActionTypes.FETCH_SUCCESS,
          payload: {
            diseaseTags: data?.diseaseTags,
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
        <DiseaseTagSettingShow
          tags={state.diseaseTagsList}
          changedCount={changedCount}
          setChangedCount={setChangedCount}
        />
      )}
    </>
  );
};

export default ShowSettingDiseaseTag;
