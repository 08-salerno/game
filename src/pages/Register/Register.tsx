/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { object, string, ref } from 'yup';
import { BlueButton, PurpleButton } from '../../styles/Buttons/Buttons';
import { FormContainer, Title } from '../../styles/Forms/Forms';
import FormFiled from '../../components/FormField/FormField';
import AuthService from '../../modules/api/AuthService';
import { ErrorReason } from '../../modules/api/types';
import useAppRouter from '../../modules/router/router';
import { useAppSelector } from '../../modules/redux/hooks';
import { selectUser } from '../../modules/redux/slices/userSlice';
import { FormikSubmit } from '../../modules/utils/formik.utils';

const authService = new AuthService();

 interface SignUpFormValue {
   firstName: string;
   secondName: string;
   email: string;
   login: string;
   phone: string;
   password: string;
   checkPassword: string;
 }

const SignUpSchema = object().shape({
  firstName: string()
    .min(2, 'Name is too short')
    .max(30, 'Name is too long')
    .required('Required'),
  secondName: string()
    .min(2, 'Surname is too short')
    .max(30, 'Surname is too long')
    .required('Required'),
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
  password: string()
    .min(6, 'Password must contain at least 6 symbols')
    .required('Required'),
  checkPassword: string()
    .oneOf([ref('password'), null], 'Passwords should match')
    .required('Required'),
});

export const Register: React.FC<{}> = () => {
  const initialValues: SignUpFormValue = {
    firstName: '',
    secondName: '',
    email: '',
    login: '',
    phone: '',
    password: '',
    checkPassword: '',
  };

  const router = useAppRouter();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    if (user) {
      router.goProfile();
    }
  });

  const handleSignUp: FormikSubmit<SignUpFormValue> = (value, actions): Promise<void> => authService
    .signUp(value)
    .then(() => {
      router.goMain();
    })
    .catch((err: ErrorReason) => {
      actions.setErrors({
        checkPassword: err.reason,
      });
    });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSignUp}
        validationSchema={SignUpSchema}
      >
      {({ dirty, isValid, isSubmitting }): React.ReactElement => (
        <FormContainer>
          <Title>Register Page</Title>
          <FormFiled name="firstName" label="First Name" />
          <FormFiled name="secondName" label="Second Name" />
          <FormFiled name="email" label="Email" type="email" />
          <FormFiled name="login" label="Login" />
          <FormFiled name="phone" label="Phone" type="tel" />
          <FormFiled name="password" label="Password" type="password" />
          <FormFiled name="checkPassword" label="Check Password" type="password" />
          <BlueButton type="submit" disabled={!dirty || !isValid || isSubmitting}>Submit</BlueButton>
        </FormContainer>
      )}
      </Formik>
      <PurpleButton type="button" onClick={router.goAuth}>Already have an account?</PurpleButton>
    </div>
  );
};

export default Register;
