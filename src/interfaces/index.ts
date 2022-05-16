export interface SignUpParams {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  confirmSuccessUrl: string;
}

export interface SignInParams {
  email: string;
  password: string;
}

export interface User {
  id: number;
  uid: string;
  provider: string;
  email: string;
  name: string;
  nickname?: string;
  image?: string;
  allowPasswordChange: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export type currentUserRes = {
  data?: {
    isLogin: boolean;
    data?: User;
    message?: string;
  };
};

export type signInRes = {
  data: {
    data: User;
  };
  status: number;
  headers: {
    'access-token': string;
    client: string;
    uid: string;
  };
};
