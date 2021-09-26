/* eslint-disable camelcase */
import apiUrl from './api-url';

const url = apiUrl('/user');

interface ChangeInfoData {
  firstName: string;
  secondName: string;
  displayName: string;
  login: string;
  email: string;
  phone: string;
}

interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

export type User = {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
  avatar: string,
}
export default class AuthService {
  changeUserInfo = (data: ChangeInfoData): Promise<User> => fetch(`${url}/profile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      first_name: data.firstName,
      second_name: data.secondName,
      display_name: data.displayName,
      ...data,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response);
      }
      return response.json().then((value) => Promise.resolve(value as User));
    })

  changePassword = (data: ChangePasswordData): Promise<Response> => fetch(`${url}/password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })
}
