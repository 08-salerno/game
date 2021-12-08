import { apiUrl, asError, asUser } from './utils';
import {
  ErrorReason, SignInData, SignUpData, User,
} from './types';

const url = apiUrl('/auth');

export const redirectUrl = 'https://salerno-match3-08.ya-praktikum.tech/';
// export const redirectUrl = PRODUCTION
//   ? 'https://salerno-match3-08.ya-praktikum.tech/'
// // todo [sitnik] расшить порт 443
//   : 'https://local.ya-praktikum.techt:3000/';

export default class AuthService {
  signUp = (data: SignUpData): Promise<User | ErrorReason> => fetch(`${url}/signup`, {
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
        return response.json().then(asError).then((err) => Promise.reject(err));
      }
      return response.json().then(asUser);
    })

  signIn = (data: SignInData): Promise<void | ErrorReason> => fetch(`${url}/signin`, {
    method: 'POST',
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

  logOut = (): Promise<void> => fetch(`${url}/logout`, {
    method: 'POST',
    credentials: 'include',
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then(asError).then((err) => Promise.reject(err));
      }
      return Promise.resolve();
    })

  getUser = (): Promise<User> => fetch(`${url}/user`, {
    credentials: 'include',
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then(asError).then((err) => Promise.reject(err));
      }
      return response.json().then(asUser);
    })

  getOAuthUrl = (serviceId: string): string => `https://oauth.yandex.ru/authorize/?response_type=code&client_id=${serviceId}&redirect_uri=${redirectUrl}`;

  getServiceId = (): Promise<{ 'service_id': string }> => fetch(`${apiUrl('/oauth')}/yandex/service-id?redirect_uri=${redirectUrl}`)
    .then((response) => {
      if (!response.ok) {
        return response.json().then(asError).then((err) => Promise.reject(err));
      }
      return response.json();
    })

  oAuthSignIn = (code:string): Promise<string> => fetch(`${apiUrl('/oauth')}/yandex`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ code, redirect_uri: redirectUrl }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then(asError).then((err) => Promise.reject(err));
      }
      return response.text();
    })
}
