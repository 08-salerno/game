/* eslint-disable no-console */
import * as React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormFiled from '../../components/FormField';
import AuthService from '../../modules/api/AuthService';
import { ErrorReason } from '../../modules/api/types';

const authService = new AuthService();

 interface MyFormValues {
   login: string;
   password: string;
 }

const SignInSchema = Yup.object().shape({
  login: Yup.string()
    .min(2, 'Login is too short')
    .max(30, 'Login is too long')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Password must contain at least 6 symbols')
    .required('Required'),
});

export const Auth: React.FC<{}> = () => {
  const history = useHistory();
  const initialValues: MyFormValues = {
    login: '',
    password: '',
  };

  const goRegister = (): void => {
    history.push('/register');
  };

  useEffect(() => {
    authService.getUser()
      .then(() => {
        history.push('/');
      })
      .catch((err: ErrorReason) => console.log(`Instant log in failed: ${err.reason}`));
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
  const RegisterButton = styled(Button)`
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
        onSubmit={(values, actions): Promise<void> => authService.signIn(values)
          .then(() => {
            history.push('/');
          })
          .catch((err: ErrorReason) => {
            actions.setFieldError('password', err.reason);
          })}
        validationSchema={SignInSchema}
      >
      {({ dirty, isValid, isSubmitting }): React.ReactElement => (
        <FormContainer>
          <Title>Auth Page</Title>
          <FormFiled name="login" label="Login" />
          <FormFiled name="password" label="Password" type="password" />
          <SubmitButton type="submit" disabled={!dirty || !isValid || isSubmitting}>Submit</SubmitButton>
        </FormContainer>
      )}
      </Formik>
      <RegisterButton type="button" onClick={goRegister}>Don&apos;t have an account?</RegisterButton>
    </div>
  );
};

export default Auth;
