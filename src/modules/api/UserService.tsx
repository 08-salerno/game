/* import HTTPTransport, {Options} from '../HTTPTransport/HTTPTransport';

const UserAPIInstance = new HTTPTransport('https://ya-praktikum.tech/api/v2/user');

export class UserAPI {
  changeUserInfo(options: Options) {
    return UserAPIInstance.put('/profile', options);
  }

  changeUserPassword(options: Options) {
    return UserAPIInstance.put('/password', options);
  }
}

export const userRequester = new UserAPI();
 */
const url = 'https://ya-praktikum.tech/api/v2/user';

interface changeInfoData {
  // eslint-disable-next-line camelcase
  firstName: string;
  // eslint-disable-next-line camelcase
  secondName: string;
  login: string;
  email: string;
  phone: string;
}

interface changePasswordData {
  oldPassword: string;
  newPassword: string;
}
export default class AuthService {
  changeUserInfo = (data: changeInfoData): Promise<any> => fetch(`${url}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({
      first_name: data.firstName,
      second_name: data.secondName,
      display_name: 'placeholder',
      ...data,
    }),
  })
    .then((response) => response.json());

  signIn = (data: changePasswordData): Promise<any> => fetch(`${url}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })
    .then((response) => response.json());
}
