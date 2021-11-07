/* eslint-disable no-console */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import { object, string } from 'yup';
import { Location } from 'history';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import FormFiled from '../../components/FormField';
import AuthService from '../../modules/api/AuthService';
import { ErrorReason } from '../../modules/api/types';
import { FormikSubmit } from '../../modules/utils/formik.utils';
import { useAppDispatch, useAppSelector } from '../../modules/redux/hooks';
import { fetchUserAction } from '../../modules/redux/sagas/user.saga';
import useAppRouter from '../../modules/router/router';
import { selectUser } from '../../modules/redux/slices/userSlice';

const authService = new AuthService();

interface MyFormValues {
  login: string;
  password: string;
}

type LocationState = {
  from: Location;
};

const OAuthBlock = styled.div`
    margin-top: 20px ;
`;

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

const SignInSchema = object().shape({
  login: string()
    .min(2, 'Login is too short')
    .max(30, 'Login is too long')
    .required('Required'),
  password: string()
    .min(6, 'Password must contain at least 6 symbols')
    .required('Required'),
});

export const Auth: React.FC<Partial<RouteComponentProps<{}, StaticContext, LocationState>>> = (props) => {
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
      const to = props.location?.state?.from?.pathname ?? '/';
      router.go(to);
    } else {
      dispatchFetchUser();
    }
  }, [user]);

  const handleSubmit: FormikSubmit<MyFormValues> = (values, actions): Promise<void> => authService
    .signIn(values)
    .then(() => {
      dispatchFetchUser();
      router.go((props.location as Location<LocationState>).state.from.pathname);
    })
    .catch((err: ErrorReason) => {
      actions.setErrors({ password: err.reason });
    });

  // const OAuthSignIn = ():void => {
  //   new AuthService().getServiceId()
  //     .then((data) => {
  //       // ${(data as {'service_id':string}).service_id}
  //       window.location = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${(data as {'service_id':string}).service_id}&redirect_uri=http://local.ya-praktikum.tech`;
  //     });
  // };

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
      <OAuthBlock >
        <img src="https://yastatic.net/q/logoaas/v2/%D0%AF%D0%BD%D0%B4%D0%B5%D0%BA%D1%81.svg?circle=black&color=fff&first=white" alt="" />
      </OAuthBlock>
    </div>
  );
};

export default Auth;
