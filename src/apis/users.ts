/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import Cookies from 'js-cookie';
import {
  SignUpParams,
  SignInParams,
  currentUserRes,
  UserInfoUpdateParams,
} from 'interfaces/index';
import { signUpUrl, signInUrl, signOutUrl, getCurrentUserUrl } from 'urls';
import client from './client';

export const signUp = (params: SignUpParams) =>
  client.post(signUpUrl, params, {
    headers: {
      'access-token': Cookies.get('_access_token') || '',
      client: Cookies.get('_client') || '',
      uid: Cookies.get('_uid') || '',
    },
  });

export const userInfoUpdate = (params: UserInfoUpdateParams) =>
  client.put(signUpUrl, params, {
    headers: {
      'access-token': Cookies.get('_access_token') || '',
      client: Cookies.get('_client') || '',
      uid: Cookies.get('_uid') || '',
    },
  });

// サインイン（ログイン）
export const signIn = (params: SignInParams) =>
  client
    .post(signInUrl, params)
    .then((res) => res)
    .catch((e) => {
      throw e;
    });

// サインアウト（ログアウト）
export const signOut = () =>
  client.delete(signOutUrl, {
    headers: {
      'access-token': Cookies.get('_access_token') || '',
      client: Cookies.get('_client') || '',
      uid: Cookies.get('_uid') || '',
    },
  });

// 認証済みのユーザーを取得
export const getCurrentUser = () => {
  if (
    !Cookies.get('_access_token') ||
    !Cookies.get('_client') ||
    !Cookies.get('_uid')
  ) {
    return;
  }

  // eslint-disable-next-line consistent-return
  return client
    .get(getCurrentUserUrl, {
      headers: {
        'access-token': Cookies.get('_access_token') || '',
        client: Cookies.get('_client') || '',
        uid: Cookies.get('_uid') || '',
      },
    })
    .then((res: currentUserRes) => res)
    .catch((e) => {
      throw e;
    });
};
