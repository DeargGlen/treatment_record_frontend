export interface SignUpParams {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  confirmSuccessUrl: string;
}

export interface UserInfoUpdateParams {
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  name?: string;
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
  image?: string;
  allowPasswordChange: boolean;
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
