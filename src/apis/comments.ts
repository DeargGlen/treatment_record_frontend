import { treatCommentCreate } from 'urls';
import Cookies from 'js-cookie';
import client from './client';

export type COMMENT = {
  id?: number;
  content: string;
  userId: number;
  userName: string;
  createdAt: string;
  treatmentId?: number;
};

export type COMMENT_POST = {
  id?: number;
  content: string;
  userId?: number;
  userName?: string;
  treatmentId?: number;
};

type COMMENT_RES = {
  data: COMMENT;
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
    .then((res: COMMENT_RES) => res.data)
    .catch((e) => {
      throw e;
    });
