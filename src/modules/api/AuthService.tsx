/* eslint-disable camelcase */
/* eslint-disable no-console */
import apiUrl from './api-url';

const url = apiUrl('/auth');

interface SignUpData {
  firstName: string;
  secondName: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

interface SignInData {
  login: string;
  password: string;
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
      return response.json().then((value) => Promise.resolve(value as User));
    })

  signIn = (data: SignInData): Promise<Response> => fetch(`${url}/signin`, {
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
      return response;
    })

  logOut = (): Promise<Response> => fetch(`${url}/logout`, {
    method: 'POST',
    credentials: 'include',
  })
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response);
      }
      return response;
    })

  getUser = (): Promise<User> => fetch(`${url}/user`, {
    credentials: 'include',
  })
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response);
      }
      return response.json().then((value) => Promise.resolve(value as User));
    })
}
