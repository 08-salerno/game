const url = 'https://ya-praktikum.tech/api/v2/auth';

interface signUpData {
  // eslint-disable-next-line camelcase
  firstName: string;
  // eslint-disable-next-line camelcase
  secondName: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

interface signInData {
  // eslint-disable-next-line camelcase
  firstName: string;
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
    .then((response) => response.json());

  signIn = (data: signInData): Promise<any> => fetch(`${url}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      first_name: data.firstName,
      password: data.password,
    }),
  })
    .then((response) => response.json());

  logOut = (): Promise<any> => fetch(`${url}/logout`, {
    method: 'POST',
    credentials: 'include',
  })
    .then((response) => response.json());

  getUser = (): Promise<any> => fetch(`${url}/user`, {
    credentials: 'include',
  })
    .then((response) => response.json());
}
