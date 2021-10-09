/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { object, string } from 'yup';
import FormFiled from '../../components/FormField';
import UserService from '../../modules/api/UserService';
import { ErrorReason } from '../../modules/api/types';
import { selectUser } from '../../modules/redux/slices/userSlice';
import { useAppDispatch, useAppSelector } from '../../modules/redux/hooks';
import { logoutUserAction } from '../../modules/redux/sagas/user.saga';
import useAppRouter from '../../modules/router/router';

const userService = new UserService();

interface UserDataFormValues {
  firstName: string;
  secondName: string;
  displayName: string;
  email: string;
  login: string;
  phone: string;
}
interface UserPasswordFormValues {
  oldPassword: string;
  newPassword: string;
}

const userDataSchema = object().shape({
  firstName: string()
    .min(2, 'Name is too short')
    .max(30, 'Name is too long')
    .required('Required'),
  secondName: string()
    .min(2, 'Surname is too short')
    .max(30, 'Surname is too long')
    .required('Required'),
  displayName: string()
    .min(2, 'Display name is too short')
    .max(30, 'Display name is too long'),
  email: string()
    .email('Email is invalid')
    .required('Required'),
  login: string()
    .min(2, 'Login is too short')
    .max(30, 'Login is too long')
    .required('Required'),
  phone: string()
    .matches(/^(\+7|8)[0-9]{10}$/, 'This is not correct format')
    .required('Required'),
});
const userPasswordSchema = object().shape({
  oldPassword: string()
    .min(6, 'Password must contain at least 6 symbols')
    .required('Required'),
  newPassword: string()
    .min(6, 'Password must contain at least 6 symbols')
    .required('Required'),
});
export const Profile: React.FC<{}> = () => {
  const history = useHistory();
  const userInitialValues: UserDataFormValues = {
    firstName: '',
    secondName: '',
    displayName: '',
    email: '',
    login: '',
    phone: '',
  };
  const [formValues, setFormValues] = useState(userInitialValues);
  const userPasswordsInitialValues: UserPasswordFormValues = {
    oldPassword: '',
    newPassword: '',
  };

  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const router = useAppRouter();

  const logOut = (): void => {
    dispatch(logoutUserAction);
  };

  useEffect(() => {
    if (user) {
      setFormValues((formValues) => ({
        ...formValues,
        firstName: user.first_name || '',
        secondName: user.second_name || '',
        displayName: user.display_name || '',
        email: user.email || '',
        login: user.login || '',
        phone: user.phone || '',
      }));
    } else {
      router.goAuth();
    }
  }, [user]);

  const FormContainer = styled(Form)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;
  const Title = styled.h1`
    font-family: Arial;
    margin: 20px;
    font-size: 20px;
    line-height: 20px;
    font-weight: 500;
  `;
  const Button = styled.button`
    display: inline-block;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
    padding: 0;
    border: none;
    font-family: Arial;
    font-weight: normal;
    font-size: inherit;
    text-decoration: none;
    cursor: pointer;
    &:disabled {
      cursor: not-allowed;
    }
  `;
  const SubmitButton = styled(Button)`
    width: auto;
    height: 37px;
    margin: 5px auto;
    padding: 0 8px;
    border-radius: 8px;
    color: black;
    background-color: #D6EAF8;

    &:hover {
      background-color: #AED6F1;
    }
    &:disabled {
      background-color: #EBF5FB;
    }
  `;
  const GoBackButton = styled(Button)`
    width: auto;
    height: 37px;
    margin: 5px;
    padding: 0 8px;
    border-radius: 8px;
    color: black;
    background-color: #E8DAEF;

    &:hover {
      background-color: #D2B4DE;
    }
  `;
  const LogOutButton = styled(Button)`
    width: auto;
    height: 37px;
    margin: 5px;
    padding: 0 8px;
    border-radius: 8px;
    color: black;
    background-color: #D1F2EB;

    &:hover {
      background-color: #A3E4D7;
    }
  `;

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={formValues || userInitialValues}
        onSubmit={(values, actions): Promise<void> => userService.changeUserInfo(values)
          .then(() => {
            history.push('/');
          })
          .catch((err: ErrorReason) => {
            actions.setFieldError('phone', err.reason);
          })}
        validationSchema={userDataSchema}
      >
      {({ dirty, isValid, isSubmitting }): React.ReactElement => (
        <FormContainer>
          <Title>Profile Page</Title>
          <FormFiled name="firstName" label="First Name" />
          <FormFiled name="secondName" label="Second Name" />
          <FormFiled name="displayName" label="Display Name" />
          <FormFiled name="email" label="Email" type="email" />
          <FormFiled name="login" label="Login" />
          <FormFiled name="phone" label="Phone" type="tel" />
          <SubmitButton type="submit" disabled={!dirty || !isValid || isSubmitting}>Submit</SubmitButton>
        </FormContainer>
      )}
      </Formik>
      <Formik
        initialValues={userPasswordsInitialValues}
        onSubmit={(values, actions): Promise<void> => userService.changePassword(values)
          .then(() => {
            history.push('/');
          })
          .catch((err: ErrorReason) => {
            actions.setFieldError('newPassword', err.reason);
          })}
        validationSchema={userPasswordSchema}
      >
      {({ dirty, isValid, isSubmitting }): React.ReactElement => (
        <FormContainer>
          <FormFiled name="oldPassword" label="Old Password" type="password" />
          <FormFiled name="newPassword" label="New Password" type="password" />
          <SubmitButton type="submit" disabled={!dirty || !isValid || isSubmitting}>Change Password</SubmitButton>
        </FormContainer>
      )}
      </Formik>
      <GoBackButton type="button" onClick={router.goBack}>Go back</GoBackButton>
      <LogOutButton type="button" onClick={logOut}>Log out</LogOutButton>
    </div>
  );
};

export default Profile;
