import {
  treatCommentCreate,
  treatCommentsIndex,
  treatCommentDestroy,
} from 'urls';
import Cookies from 'js-cookie';
import client from './client';

export type COMMENT = {
  id: number;
  content: string;
  userId: number;
  userName: string;
  createdAt: string;
  treatmentId: number;
  individualId: string;
};

export type COMMENT_POST = {
  id?: number;
  content: string;
  userId?: number;
  userName?: string;
  treatmentId?: number;
};

type COMMENT_POST_RES = {
  data: COMMENT;
};

type COMMENT_RES = {
  data: {
    treatComments: COMMENT[];
  };
};

export const postComment = (params: COMMENT_POST) =>
  client
    .post(
      treatCommentCreate,
      {
        content: params.content,
        treatment_id: params.treatmentId,
      },
      {
        headers: {
          'access-token': Cookies.get('_access_token') || '',
          client: Cookies.get('_client') || '',
          uid: Cookies.get('_uid') || '',
        },
      },
    )
    .then((res: COMMENT_POST_RES) => res.data)
    .catch((e) => {
      throw e;
    });

export const fetchTreatComments = () =>
  client
    .get(treatCommentsIndex, {
      headers: {
        'access-token': Cookies.get('_access_token') || '',
        client: Cookies.get('_client') || '',
        uid: Cookies.get('_uid') || '',
      },
    })
    .then((res: COMMENT_RES) => res.data)
    .catch((e) => console.error(e));

export const destroyTreatComment = (Id: number) =>
  client
    .delete(treatCommentDestroy(Id), {
      headers: {
        'access-token': Cookies.get('_access_token') || '',
        client: Cookies.get('_client') || '',
        uid: Cookies.get('_uid') || '',
      },
    })
    .then((res: COMMENT_RES) => res.data)
    .catch((e) => console.error(e));
