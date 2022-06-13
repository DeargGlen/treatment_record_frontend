import { FC, useEffect, useReducer, useState } from 'react';
import { fetchAreas, AREAS_DATA } from 'apis/locations';
import { REQUEST_STATE } from 'states';
import AreasSettingList from 'components/organisms/AreasSettingList';

import {
  initialAreaState,
  areasActionTypes,
  areasReducer,
} from 'reducers/areas';

const LocationSettings: FC = () => {
  const [state, dispatch] = useReducer(areasReducer, initialAreaState);
  const [changedCount, setChangedCount] = useState(0);

  useEffect(() => {
    dispatch({ type: areasActionTypes.FETCHING });
    fetchAreas()
      .then((data: void | AREAS_DATA) => {
        dispatch({
          type: areasActionTypes.FETCH_SUCCESS,
          payload: {
            areas: data?.areas,
          },
        });
      })

      .catch(() => 1);
  }, [changedCount]);

  return (
    <>
      {state.fetchState === REQUEST_STATE.LOADING ? (
        <div style={{ fontSize: 24 }}>エリア名の設定</div>
      ) : (
        <AreasSettingList
          areas={state.areasList}
          changedCount={changedCount}
          setChangedCount={setChangedCount}
        />
      )}
    </>
  );
};

export default LocationSettings;
