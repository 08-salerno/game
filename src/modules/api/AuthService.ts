import { apiUrl, asUser } from './utils';
import { SignInData, SignUpData, User } from './types';

const url = apiUrl('/auth');

export default class AuthService {
  signUp = (data: SignUpData): Promise<User> => fetch(`${url}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      first_name: data.firstName,
      second_name: data.secondName,
      ...data,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response);
      }
      return response.json().then(asUser);
    })

  signIn = (data: SignInData): Promise<void> => fetch(`${url}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return Promise.resolve();
    })

  logOut = (): Promise<void> => fetch(`${url}/logout`, {
    method: 'POST',
    credentials: 'include',
  })
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response);
      }
      return Promise.resolve();
    })

  getUser = (): Promise<User> => fetch(`${url}/user`, {
    credentials: 'include',
  })
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response);
      }
      return response.json().then(asUser);
    })
}
