import { FC, useEffect, useReducer } from 'react';
import { fetchTreatComments, COMMENT } from 'apis/comments';
import CommentsList from 'components/organisms/CommentsList';

// constants
import { REQUEST_STATE } from 'states';

// reducers
import {
  initialState,
  treatCommentsActionTypes,
  treatCommentsReducer,
} from 'reducers/treatcomments';

type COMMENT_DATA = {
  treatComments: COMMENT[];
};

const ShowActivities: FC = () => {
  const [state, dispatch] = useReducer(treatCommentsReducer, initialState);

  useEffect(() => {
    dispatch({ type: treatCommentsActionTypes.FETCHING });
    fetchTreatComments()
      .then((data: void | null | COMMENT_DATA) => {
        dispatch({
          type: treatCommentsActionTypes.FETCH_SUCCESS,
          payload: {
            treatComments: data?.treatComments,
          },
        });
      })

      .catch(() => 1);
  }, []);

  return (
    <>
      <div style={{ fontSize: 24, textAlign: 'center', marginTop: 20 }}>
        最新のコメント
      </div>
      {state.fetchState === REQUEST_STATE.LOADING ? null : (
        <>
          <CommentsList comments={state.treatCommentsList} />
        </>
      )}
    </>
  );
};

export default ShowActivities;
