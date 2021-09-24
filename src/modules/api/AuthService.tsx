/* eslint-disable no-console */
const url = 'https://ya-praktikum.tech/api/v2/auth';

interface signUpData {
  firstName: string;
  secondName: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

interface signInData {
  login: string;
  password: string;
}
export default class AuthService {
  sihnUp = (data: signUpData): Promise<any> => fetch(`${url}/signup`, {
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
    .then((res) => res.json())

  signIn = (data: signInData): Promise<any> => fetch(`${url}/signin`, {
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

  logOut = (): Promise<any> => fetch(`${url}/logout`, {
    method: 'POST',
    credentials: 'include',
  })
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response);
      }
      return response;
    })

  getUser = (): Promise<any> => fetch(`${url}/user`, {
    credentials: 'include',
  })
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(response);
      }
      return response;
    })
}
