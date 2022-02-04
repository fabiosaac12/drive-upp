import { setItem } from 'helpers/localStorage';
import { LoginData } from 'providers/Auth/models/LoginData';
import { User } from 'providers/Auth/models/User';
import { instance } from '../instance';
import { ApiResponse } from './models/ApiResponse';

export const login = async ({ data }: { data: LoginData }) => {
  const response = await instance.post<
    ApiResponse<{ user: User; token: string }>
  >('auth/login', data);

  console.log(response.data);

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

  console.log({ token });

  return user;
};
