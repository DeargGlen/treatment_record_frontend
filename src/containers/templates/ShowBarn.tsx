import { FC, useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBarn, BARN_SHOW_DATA } from 'apis/locations';
import BarnShow from 'components/organisms/BarnShow';

// reducers
import { initialBarnState, barnActionTypes, barnReducer } from 'reducers/barn';

// constants
import { REQUEST_STATE } from 'states';

const ShowBarn: FC = () => {
  const [barnState, dispatch] = useReducer(barnReducer, initialBarnState);
  const { barnId } = useParams();
  const barnIdNum = Number(barnId);

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
  }, [barnIdNum]);

  return (
    <>
      {barnState.fetchState === REQUEST_STATE.LOADING ? null : (
        <BarnShow barn={barnState.barn} />
      )}
    </>
  );
};

export default ShowBarn;
