/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { FC, useState } from 'react';
import * as React from 'react';
import { TREATMENT_SHOW_DATA, destroyTreatment } from 'apis/treatments';
import { COMMENT, postComment } from 'apis/comments';
import theme from 'components/theme';
import { ThemeProvider } from '@mui/material/styles';
import { ContentWrapper, MainWrapper } from 'Style';
import handleToDateAndTime from 'containers/func/handleToDateAndTime';
import EarTagImage from 'images/ear.png';
import styled from 'styled-components';
import {
  Divider,
  Link,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { HTTP_STATUS_CODE } from 'states';
import DisplayTags from 'components/molecules/DisplayTags';
import {
  conditionList,
  coughList,
  feedList,
  stoolList,
  noseList,
} from 'constant';

const TagNum = styled.div`
  font-size: 22px;
  text-align: center;
  margin-left: 40%;
`;
const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding-left: 10px;
  padding-right: 10px;
`;
const RowContent = styled.div`
  padding-left: 10px;
  padding-right: 10px;
`;
const RowComment = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Data = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  line-height: 24px;
`;

interface CommentState {
  treatmentId: number | null;
  content: string;
  userId: number | null;
}

const TreatmentShow: FC<{
  treatment: TREATMENT_SHOW_DATA;
  changedCount: number;
  setChangedCount: React.Dispatch<React.SetStateAction<number>>;
}> = ({ treatment, changedCount, setChangedCount }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDestroy = () => {
    setOpen(false);
    destroyTreatment(treatment.id ?? '')
      .then(() => {
        navigate('/treatments');
      })
      .catch((e) => console.log(e));
  };

  const [values, setValues] = React.useState<CommentState>({
    treatmentId: null,
    content: '',
    userId: null,
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = () => {
    postComment({
      treatmentId: treatment.id,
      content: values.content,
      userId: values.userId ?? 0,
    })
      .then(() => setChangedCount(changedCount + 1))
      .catch((e) => {
        if (e.response.status === HTTP_STATUS_CODE.NOT_ACCEPTABLE) {
          setValues({
            ...values,
            treatmentId: null,
            content: '',
            userId: null,
          });
        } else {
          throw e;
        }
      });
  };

  const Sortedcomments: COMMENT[] | undefined = treatment.treatComments?.sort(
    (n1, n2) => {
      if (n1.createdAt > n2.createdAt) {
        return 1;
      }
      if (n1.createdAt < n2.createdAt) {
        return -1;
      }

      return 0;
    },
  );

  return (
    <>
      <MainWrapper>
        <TopRow>
          <TagNum>
            <Link
              component={RouterLink}
              to={`/individuals/${treatment.individualId ?? '-'}`}
              style={{ fontSize: 22, color: 'black' }}
            >
              <img src={EarTagImage} alt="tag-number" width="20" />
              {treatment.individualId?.slice(5, 9)}{' '}
            </Link>
          </TagNum>

          <TopRow>
            <Button
              variant="contained"
              color="primary"
              sx={{ height: 20, mt: '5px' }}
            >
              編集
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{ height: 20, mt: '5px' }}
              onClick={handleClick}
            >
              削除
            </Button>
          </TopRow>
        </TopRow>
        <Row>
          <p>日時：</p>
          <Data>{handleToDateAndTime(treatment.datetime ?? '-')}</Data>
        </Row>
        <Divider />
        <Row>
          <p>体温：</p>
          <Data>
            {treatment.bodyTemperature !== 0 ? (
              <>{treatment.bodyTemperature?.toFixed(1)}℃</>
            ) : (
              '-'
            )}
          </Data>
        </Row>
        <Divider />
        <Row>
          <p style={{ lineHeight: 2.5 }}>症状タグ：</p>
          <Data>
            <DisplayTags tags={treatment.symptomTags} />
          </Data>
        </Row>
        <Divider />
        <RowContent>
          <p>症状：</p>
          <div>{treatment.symptom}</div>
        </RowContent>
        <Divider />
        <Row>
          <p style={{ lineHeight: 2.5 }}>疾病タグ：</p>
          <Data>
            <DisplayTags tags={treatment.diseaseTags} />
          </Data>
        </Row>
        <Divider />
        <RowContent>
          <p>治療内容：</p>
          <div>{treatment.content}</div>
        </RowContent>
        <Divider />
        <Row>
          <p>便の状態：</p>
          <Data>
            {treatment.stool != null ? stoolList[treatment.stool]?.label : '-'}
          </Data>
        </Row>
        <Row>
          <p>餌の食べ具合：</p>
          <Data>
            {treatment.feed != null ? feedList[treatment.feed]?.label : '-'}
          </Data>
        </Row>
        <Row>
          <p>咳の様子：</p>
          <Data>
            {treatment.cough != null ? coughList[treatment.cough]?.label : '-'}
          </Data>
        </Row>
        <Row>
          <p>鼻水の様子：</p>
          <Data>
            {treatment.nose != null ? noseList[treatment.nose]?.label : '-'}
          </Data>
        </Row>
        <Row>
          <p>全体的な様子：</p>
          <Data>
            {treatment.condition != null
              ? conditionList[treatment.condition]?.label
              : '-'}
          </Data>
        </Row>
        <Divider />
        <Row>
          <p>登録者：</p>
          <Data>{treatment.userName}</Data>
        </Row>
        <Divider />
        <div style={{ textAlign: 'center' }}>コメント</div>
        <Divider />
      </MainWrapper>

      {Sortedcomments.map((comment: COMMENT) => (
        <ThemeProvider theme={theme} key={comment.id}>
          <ContentWrapper>
            <MainWrapper>
              <RowComment>
                <p style={{ fontWeight: 500 }}>{comment.userName}</p>
                <p style={{ color: 'GrayText' }}>
                  {handleToDateAndTime(comment.createdAt ?? '-')}
                </p>
              </RowComment>
              <div>{comment.content}</div>
            </MainWrapper>
          </ContentWrapper>
          <Divider />
        </ThemeProvider>
      ))}
      <Row>
        <TextField
          value={values.content}
          onChange={handleChange}
          name="content"
          variant="standard"
          sx={{ width: 410 }}
          multiline
          placeholder="コメントを追加"
          maxRows={4}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={onSubmit}
          style={{ height: 36.5 }}
          disabled={!values.content.length}
        >
          送信
        </Button>
      </Row>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>個体の記録を削除しますか？</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>いいえ</Button>
          <Button onClick={handleDestroy} autoFocus>
            はい
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TreatmentShow;
