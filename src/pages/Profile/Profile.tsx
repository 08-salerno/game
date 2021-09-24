/* eslint-disable no-console */
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormFiled from '../../components/FormField';
import UserService from '../../modules/api/UserService';

const userService = new UserService();

interface userDataFormValues {
  firstName: string;
  secondName: string;
  displayName: string;
  email: string;
  login: string;
  phone: string;
}
interface userPasswordFormValues {
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
  const userInitialValues: userDataFormValues = {
    firstName: '',
    secondName: '',
    displayName: '',
    email: '',
    login: '',
    phone: '',
  };
  const userPasswordsInitialValues: userPasswordFormValues = {
    oldPassword: '',
    newPassword: '',
  };
  const handleSubmitData = (values: userDataFormValues): void => {
    userService.changeUserInfo(values)
      .then(() => {
      // REDIRECT TO "back"
      })
      .catch(console.log);
  };
  const handleSubmitPasswords = (values: userPasswordFormValues): void => {
    userService.changePassword(values)
      .then(() => {
      // REDIRECT TO "back"
      })
      .catch(console.log);
  };
  const goBack = (): void => {
    history.push('/');
  };
  return (
    <div>
      <Formik
        initialValues={userInitialValues}
        onSubmit={(handleSubmitData)}
        validationSchema={userDataSchema}
      >
      {({ dirty, isValid }): React.ReactElement => (
        <Form className="form">
          <h1 className="form__title">Profile Page</h1>
          <FormFiled name="firstName" label="First Name" />
          <FormFiled name="secondName" label="Second Name" />
          <FormFiled name="displayName" label="Display Name" />
          <FormFiled name="email" label="Email" type="email" />
          <FormFiled name="login" label="Login" />
          <FormFiled name="phone" label="Phone" type="tel" />
          <button type="submit" disabled={!dirty || !isValid} className="button form__button">Submit</button>
        </Form>
      )}
      </Formik>
      <Formik
        initialValues={userPasswordsInitialValues}
        onSubmit={(handleSubmitPasswords)}
        validationSchema={userPasswordSchema}
      >
      {({ dirty, isValid }): React.ReactElement => (
        <Form className="form">
          <FormFiled name="oldPassword" label="Old Password" type="password" />
          <FormFiled name="newPassword" label="New Password" type="password" />
          <button type="submit" disabled={!dirty || !isValid} className="button form__button">Submit</button>
        </Form>
      )}
      </Formik>
      <button type="button" onClick={():void => goBack()} className="button">Go back</button>
    </div>
  );
};

export default Profile;
