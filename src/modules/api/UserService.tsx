const url = 'https://ya-praktikum.tech/api/v2/user';
interface changeInfoData {
  firstName: string;
  secondName: string;
  displayName: string;
  login: string;
  email: string;
  phone: string;
}

interface changePasswordData {
  oldPassword: string;
  newPassword: string;
}
export default class AuthService {
  changeUserInfo = (data: changeInfoData): Promise<any> => fetch(`${url}/profile`, {
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

  changePassword = (data: changePasswordData): Promise<any> => fetch(`${url}/password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })
}
