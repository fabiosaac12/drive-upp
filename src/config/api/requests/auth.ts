import { removeItem, setItem } from 'helpers/localStorage';
import { LoginData } from 'providers/Auth/models/LoginData';
import { SignUpData } from 'providers/Auth/models/SignUpData';
import { User } from 'providers/Auth/models/User';
import { instance } from '../instance';
import { ApiResponse } from './models/ApiResponse';

export const refreshToken = async () => {
  const response = await instance.post<
    ApiResponse<{ user: User; token: string }>
  >('auth/refresh-token');

  const {
    data: {
      headerResponse: { code },
      payload: { token, user },
    },
  } = response;

  if (code !== 200) {
    throw code;
  }

  setItem('token', token);

  return user;
};

export const login = async ({ data }: { data: LoginData }) => {
  const response = await instance.post<
    ApiResponse<{ user: User; token: string }>
  >('auth/login', data);

  const {
    data: {
      headerResponse: { code },
      payload: { token, user },
    },
  } = response;

  if (code !== 200) {
    throw code;
  }

  setItem('token', token);

  return user;
};

export const logout = async () => {
  const response = await instance.post<ApiResponse<{}>>('auth/logout');

  const {
    data: {
      headerResponse: { code },
    },
  } = response;

  if (code !== 200) {
    throw code;
  }

  removeItem('token');
};

export const signUp = async ({ data }: { data: SignUpData }) => {
  const response = await instance.post<
    ApiResponse<{ emailSentSuccesfully: boolean }>
  >('auth/register', data);

  const {
    data: {
      headerResponse: { code },
      payload: { emailSentSuccesfully },
    },
  } = response;

  console.log(response.data);

  if (code !== 200) {
    throw code;
  }

  return emailSentSuccesfully;
};
