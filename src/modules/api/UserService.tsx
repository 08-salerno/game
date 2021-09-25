const url = 'https://ya-praktikum.tech/api/v2/user';
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
export default class AuthService {
  changeUserInfo = (data: ChangeInfoData): Promise<any> => fetch(`${url}/profile`, {
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

  changePassword = (data: ChangePasswordData): Promise<any> => fetch(`${url}/password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  })
}
