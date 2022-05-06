/* eslint-disable @typescript-eslint/unbound-method */
import { FC, useEffect, useReducer } from 'react';
import { fetchTreatments, TREATMENT } from 'apis/treatments';
import styled from 'styled-components';

// components
import { Skeleton } from '@mui/material';

// constants
import { REQUEST_STATE } from 'states';

// reducers
import {
  initialState,
  treatmentsActionTypes,
  treatmentsReducer,
} from 'reducers/treatments';

type DATA = {
  treatments: TREATMENT[];
};

const TreatmentsContentList = styled.div`
  margin-left: 30%;
  margin-right: 30%;
`;

const TreatmentsContentWrapper = styled.div`
  width: 450px;
  height: 150px;
  display: block;
  justify-content: space-around;
  padding: 20px 30px;
  overflow: hidden;
  box-shadow: 0 2px 2px #c1ced7;
`;

const MainWrapper = styled.div`
  color: black;
  font-size: 16px;
`;

const AllTreatments: FC = () => {
  const [state, dispatch] = useReducer(treatmentsReducer, initialState);

  useEffect(() => {
    dispatch({ type: treatmentsActionTypes.FETCHING });
    fetchTreatments()
      .then((data: void | DATA) => {
        dispatch({
          type: treatmentsActionTypes.FETCH_SUCCESS,
          payload: {
            treatments: data?.treatments,
          },
        });
      })

      .catch(() => 1);
  }, []);

  return (
    <>
      <div>all individuals</div>
      <TreatmentsContentList>
        {state.fetchState === REQUEST_STATE.LOADING ? (
          <>
            <Skeleton variant="rectangular" width={500} height={190} />
            <Skeleton variant="rectangular" width={500} height={190} />
            <Skeleton variant="rectangular" width={500} height={190} />
            <Skeleton variant="rectangular" width={500} height={190} />
            <Skeleton variant="rectangular" width={500} height={190} />
            <Skeleton variant="rectangular" width={500} height={190} />
          </>
        ) : (
          state.treatmentsList?.map((treatment: TREATMENT) => (
            <TreatmentsContentWrapper key={treatment.id}>
              <MainWrapper>
                <div
                  className="tag-num"
                  style={{ fontSize: 22, color: 'blue' }}
                >
                  {treatment.individual_id.slice(5, 9)}
                </div>
                <div className="row1">
                  <p>
                    {' '}
                    日時：{treatment.datetime} 体温：
                    {treatment.body_temperature}℃
                  </p>
                </div>
                <div className="row2">
                  <p>
                    症状：{treatment.symptom} 治療内容：{treatment.content}
                  </p>
                </div>
                <div className="row3">
                  <p>
                    投薬の有無：{treatment.gotDosage ? 'あり' : 'なし'} 登録者：
                    {treatment.user_name}
                  </p>
                </div>
              </MainWrapper>
            </TreatmentsContentWrapper>
          ))
        )}
      </TreatmentsContentList>
    </>
  );
};

export default AllTreatments;
