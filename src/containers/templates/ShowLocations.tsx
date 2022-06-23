import { FC, useEffect, useReducer } from 'react';
import { fetchAreas, AREAS_DATA } from 'apis/locations';
import { REQUEST_STATE } from 'states';
import AreasList from 'components/organisms/AreasList';

import {
  initialAreaState,
  areasActionTypes,
  areasReducer,
} from 'reducers/areas';

const ShowLocations: FC = () => {
  const [state, dispatch] = useReducer(areasReducer, initialAreaState);
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
  }, []);

  return (
    <>
      {state.fetchState === REQUEST_STATE.LOADING ? (
        <div style={{ fontSize: 24, textAlign: 'center' }}>個体の表示</div>
      ) : (
        <AreasList areas={state.areasList} />
      )}
    </>
  );
};

export default ShowLocations;
