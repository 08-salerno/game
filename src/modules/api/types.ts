/* eslint-disable camelcase */

export type SignUpData = {
    firstName: string;
    secondName: string;
    login: string;
    email: string;
    password: string;
    phone: string;
}

export type SignInData = {
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

export type ChangeInfoData = {
    firstName: string;
    secondName: string;
    displayName: string;
    login: string;
    email: string;
    phone: string;
}

export type ChangePasswordData = {
    oldPassword: string;
    newPassword: string;
}
