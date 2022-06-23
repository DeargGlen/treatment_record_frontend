import { FC, useEffect, useReducer, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTreatment, TREATMENT_SHOW_DATA } from 'apis/treatments';
import TreatmentShow from 'components/organisms/TreatmentShow';
import TreatmentSkelton from 'components/molecules/TreatmentSkelton';

// reducers
import {
  initialTreatmentState,
  treatmentActionTypes,
  treatmentReducer,
} from 'reducers/treatment';

// constants
import { REQUEST_STATE } from 'states';

const ShowIndividual: FC = () => {
  const [treatmentShowState, dispatch] = useReducer(
    treatmentReducer,
    initialTreatmentState,
  );
  const { treatmentId } = useParams();
  const treatmentIdNum = Number(treatmentId);
  const [changedCount, setChangedCount] = useState(0);

  useEffect(() => {
    dispatch({ type: treatmentActionTypes.FETCHING });
    fetchTreatment(treatmentIdNum ?? 0)
      .then((data: void | TREATMENT_SHOW_DATA) => {
        dispatch({
          type: treatmentActionTypes.FETCH_SUCCESS,
          payload: {
            treatment: data,
          },
        });
      })
      .catch(() => 1);
  }, [changedCount, treatmentIdNum]);

  return (
    <>
      {treatmentShowState.fetchState === REQUEST_STATE.LOADING ? (
        <TreatmentSkelton />
      ) : (
        <TreatmentShow
          treatment={treatmentShowState.treatment}
          changedCount={changedCount}
          setChangedCount={setChangedCount}
        />
      )}
    </>
  );
};

export default ShowIndividual;
