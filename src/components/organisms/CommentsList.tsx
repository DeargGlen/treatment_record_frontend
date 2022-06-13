import { COMMENT } from 'apis/comments';
import { FC } from 'react';
import { ContentWrapper, MainWrapper } from 'Style';
import handleToDateAndTime from 'containers/func/handleToDateAndTime';
import { Divider } from '@mui/material';
import styled from 'styled-components';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom';
import EarTagImage from 'images/ear.png';

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommentsList: FC<{ comments: COMMENT[] }> = ({ comments }) => (
  <>
    {comments?.map((comment: COMMENT) => (
      <div key={comment.id}>
        <ContentWrapper>
          <MainWrapper>
            <Link
              component={RouterLink}
              to={`/treatments/${comment.treatmentId}`}
              style={{ fontSize: 16, color: 'black' }}
            >
              <Row>
                <p style={{ fontWeight: 500 }}>{comment.userName}</p>
                <p style={{ color: 'GrayText' }}>
                  {handleToDateAndTime(comment.createdAt ?? '-')}
                </p>
              </Row>
              <div>{comment.content}</div>
              <div style={{ textAlign: 'right' }}>
                <img src={EarTagImage} alt="tag-number" width="12" />
                {comment.individualId.slice(5, 9)}
              </div>
            </Link>
          </MainWrapper>
        </ContentWrapper>
        <Divider />
      </div>
    ))}
  </>
);

export default CommentsList;
