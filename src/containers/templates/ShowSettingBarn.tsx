import { FC, useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBarn, BARN_SHOW_DATA } from 'apis/locations';
import BarnSettingShow from 'components/organisms/BarnSettingShow';

// reducers
import { initialBarnState, barnActionTypes, barnReducer } from 'reducers/barn';

// constants
import { REQUEST_STATE } from 'states';

const ShowSettingBarn: FC = () => {
  const [barnState, dispatch] = useReducer(barnReducer, initialBarnState);
  const { barnId } = useParams();
  const barnIdNum = Number(barnId);
  const [changedCount, setChangedCount] = useState(0);

  useEffect(() => {
    dispatch({ type: barnActionTypes.FETCHING });
    fetchBarn(barnIdNum ?? 0)
      .then((data: void | BARN_SHOW_DATA) => {
        dispatch({
          type: barnActionTypes.FETCH_SUCCESS,
          payload: {
            barn: data,
          },
        });
      })
      .catch(() => 1);
  }, [barnIdNum, changedCount]);

  return (
    <>
      {barnState.fetchState === REQUEST_STATE.LOADING ? (
        <div>ロード中</div>
      ) : (
        <BarnSettingShow
          barn={barnState.barn}
          changedCount={changedCount}
          setChangedCount={setChangedCount}
        />
      )}
    </>
  );
};

export default ShowSettingBarn;
