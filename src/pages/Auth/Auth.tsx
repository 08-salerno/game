/* eslint-disable no-console */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { object, string } from 'yup';
import FormFiled from '../../components/FormField';
import AuthService from '../../modules/api/AuthService';
import { ErrorReason } from '../../modules/api/types';
import { FormikSubmit } from '../../modules/utils/formik.utils';
import { useAppDispatch, useAppSelector } from '../../modules/redux/hooks';
import { selectUser } from '../../modules/redux/slices/userSlice';
import { fetchUserAction } from '../../modules/redux/sagas/user.saga';
import useAppRouter from '../../modules/router/router';

const authService = new AuthService();

interface MyFormValues {
  login: string;
  password: string;
}

const SignInSchema = object().shape({
  login: string()
    .min(2, 'Login is too short')
    .max(30, 'Login is too long')
    .required('Required'),
  password: string()
    .min(6, 'Password must contain at least 6 symbols')
    .required('Required'),
});

export const Auth: React.FC<{}> = () => {
  const initialValues: MyFormValues = {
    login: '',
    password: '',
  };

  const router = useAppRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const dispatchFetchUser = (): void => {
    dispatch(fetchUserAction);
  };

  useEffect(() => {
    if (user) {
      router.goMain();
    } else {
      dispatchFetchUser();
    }
  }, [user]);

  const handleSubmit: FormikSubmit<MyFormValues> = (values, actions): Promise<void> => authService
    .signIn(values)
    .then(() => {
      dispatchFetchUser();
      router.goMain();
    })
    .catch((err: ErrorReason) => {
      actions.setErrors({ password: err.reason });
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
    background-color: #d6eaf8;

    &:hover {
      background-color: #aed6f1;
    }
    &:disabled {
      background-color: #ebf5fb;
    }
  `;
  const RegisterButton = styled(Button)`
    width: auto;
    height: 37px;
    margin: 5px auto;
    padding: 0 8px;
    border-radius: 8px;
    color: black;
    background-color: #e8daef;

    &:hover {
      background-color: #d2b4de;
    }
  `;
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={SignInSchema}
      >
        {({ dirty, isValid, isSubmitting }): React.ReactElement => (
          <FormContainer>
            <Title>Auth Page</Title>
            <FormFiled name="login" label="Login" />
            <FormFiled name="password" label="Password" type="password" />
            <SubmitButton type="submit" disabled={!dirty || !isValid || isSubmitting}>
              Submit
            </SubmitButton>
          </FormContainer>
        )}
      </Formik>
      <RegisterButton type="button" onClick={router.goRegister}>
        Don&apos;t have an account?
      </RegisterButton>
    </div>
  );
};

export default Auth;
