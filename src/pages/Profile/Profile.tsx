/* eslint-disable no-console */
import * as React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormFiled from '../../components/FormField';
import UserService from '../../modules/api/UserService';
import AuthService from '../../modules/api/AuthService';

const userService = new UserService();
const authService = new AuthService();

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

const userDataSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Name is too short')
    .max(30, 'Name is too long')
    .required('Required'),
  secondName: Yup.string()
    .min(2, 'Surname is too short')
    .max(30, 'Surname is too long')
    .required('Required'),
  displayName: Yup.string()
    .min(2, 'Display name is too short')
    .max(30, 'Display name is too long'),
  email: Yup.string()
    .email('Email is invalid')
    .required('Required'),
  login: Yup.string()
    .min(2, 'Login is too short')
    .max(30, 'Login is too long')
    .required('Required'),
  phone: Yup.string()
    .matches(/^(\+7|8)[0-9]{10}$/, 'This is not correct format')
    .required('Required'),
});
const userPasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(6, 'Password must contain at least 6 symbols')
    .required('Required'),
  newPassword: Yup.string()
    .oneOf([Yup.ref('oldPassword'), null], 'Passwords should match')
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
  const userPasswordsInitialValues: UserPasswordFormValues = {
    oldPassword: '',
    newPassword: '',
  };

  const handleSubmitData = (values: UserDataFormValues): Promise<void> => userService.changeUserInfo(values)
    .then(() => {
      history.push('/');
    })
    .catch(console.log);
  const handleSubmitPasswords = (values: UserPasswordFormValues): Promise<void> => userService.changePassword(values)
    .then(() => {
      history.push('/');
    })
    .catch(console.log);

  const goBack = (): void => {
    history.push('/');
  };
  const logOut = (): void => {
    authService.logOut()
      .then(() => {
        history.push('/auth');
      })
      .catch(console.log);
  };

  useEffect(() => {
    authService.getUser()
      .catch(() => {
        history.push('/');
      });
  });

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
        initialValues={userInitialValues}
        onSubmit={(handleSubmitData)}
        validationSchema={userDataSchema}
      >
      {({ dirty, isValid, isSubmitting }): React.ReactElement => (
        <FormContainer className="form">
          <Title className="form__title">Profile Page</Title>
          <FormFiled name="firstName" label="First Name" />
          <FormFiled name="secondName" label="Second Name" />
          <FormFiled name="displayName" label="Display Name" />
          <FormFiled name="email" label="Email" type="email" />
          <FormFiled name="login" label="Login" />
          <FormFiled name="phone" label="Phone" type="tel" />
          <SubmitButton type="submit" disabled={!dirty || !isValid || isSubmitting} className="button form__button">Submit</SubmitButton>
        </FormContainer>
      )}
      </Formik>
      <Formik
        initialValues={userPasswordsInitialValues}
        onSubmit={(handleSubmitPasswords)}
        validationSchema={userPasswordSchema}
      >
      {({ dirty, isValid, isSubmitting }): React.ReactElement => (
        <FormContainer className="form">
          <FormFiled name="oldPassword" label="Old Password" type="password" />
          <FormFiled name="newPassword" label="New Password" type="password" />
          <SubmitButton type="submit" disabled={!dirty || !isValid || isSubmitting} className="button form__button">Change Password</SubmitButton>
        </FormContainer>
      )}
      </Formik>
      <GoBackButton type="button" onClick={goBack} className="button">Go back</GoBackButton>
      <LogOutButton type="button" onClick={logOut} className="button">Log out</LogOutButton>
    </div>
  );
};

export default Profile;
