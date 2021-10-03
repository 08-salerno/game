/* eslint-disable camelcase */
import { apiUrl, asUser, asError } from './utils';
import { ChangeInfoData, ChangePasswordData, User } from './types';

const url = apiUrl('/user');

export default class UserService {
  changeUserInfo = (data: ChangeInfoData): Promise<User> => fetch(`${url}/profile`, {
    method: 'PUT',
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
        return response.json().then(asError).then((err) => Promise.reject(err));
      }
      return response.json().then(asUser);
    })

  changePassword = (data: ChangePasswordData): Promise<void> => fetch(`${url}/password`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then(asError).then((err) => Promise.reject(err));
      }
      return Promise.resolve();
    })
}
