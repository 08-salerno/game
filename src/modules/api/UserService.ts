/* eslint-disable camelcase */
import { apiUrl, asUser } from './utils';
import { ChangeInfoData, ChangePasswordData, User } from './types';

const url = apiUrl('/user');

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
      return response.json().then(asUser);
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
