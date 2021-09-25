/* eslint-disable no-console */
import * as React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormFiled from '../../components/FormField';
import AuthService from '../../modules/api/AuthService';

const authService = new AuthService();

 interface MyFormValues {
   firstName: string;
   secondName: string;
   email: string;
   login: string;
   phone: string;
   password: string;
   checkPassword: string;
 }

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Name is too short')
    .max(30, 'Name is too long')
    .required('Required'),
  secondName: Yup.string()
    .min(2, 'Surname is too short')
    .max(30, 'Surname is too long')
    .required('Required'),
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
  password: Yup.string()
    .min(6, 'Password must contain at least 6 symbols')
    .required('Required'),
  checkPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords should match')
    .required('Required'),
});

export const Register: React.FC<{}> = () => {
  const history = useHistory();
  const initialValues: MyFormValues = {
    firstName: '',
    secondName: '',
    email: '',
    login: '',
    phone: '',
    password: '',
    checkPassword: '',
  };
  const handleSubmit = (values: MyFormValues): Promise<any> => authService.signUp(values)
    .then(() => {
      history.push('/');
    })
    .catch(console.log);

  const goAuth = (): void => {
    history.push('/auth');
  };

  useEffect(() => {
    authService.getUser()
      .then(() => {
        history.push('/');
      })
      .catch((err) => console.log('error', err));
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
  const AuthorizeButton = styled(Button)`
    width: auto;
    height: 37px;
    margin: 5px auto;
    padding: 0 8px;
    border-radius: 8px;
    color: black;
    background-color: #E8DAEF;

    &:hover {
      background-color: #D2B4DE;
    }
  `;

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(handleSubmit)}
        validationSchema={SignUpSchema}
      >
      {({ dirty, isValid, isSubmitting }): React.ReactElement => (
        <FormContainer className="form">
          <Title className="form__title">Register Page</Title>
          <FormFiled name="firstName" label="First Name" />
          <FormFiled name="secondName" label="Second Name" />
          <FormFiled name="email" label="Email" type="email" />
          <FormFiled name="login" label="Login" />
          <FormFiled name="phone" label="Phone" type="tel" />
          <FormFiled name="password" label="Password" type="password" />
          <FormFiled name="checkPassword" label="Check Password" type="password" />
          <SubmitButton type="submit" disabled={!dirty || !isValid || isSubmitting} className="button form__button">Submit</SubmitButton>
        </FormContainer>
      )}
      </Formik>
      <AuthorizeButton type="button" className="button" onClick={goAuth}>Already have an account?</AuthorizeButton>
    </div>
  );
};

export default Register;
