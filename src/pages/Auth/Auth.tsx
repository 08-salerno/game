/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { object, string } from 'yup';
import { Location } from 'history';
import { StaticContext } from 'react-router';
import { RouteComponentProps } from 'react-router-dom';
import { SubmitButton, AltButton, OAuthButton } from '../../styles/Buttons/Buttons';
import { FormContainer, Title } from '../../styles/Forms/Forms';
import FormFiled from '../../components/FormField/FormField';
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
  const [serviceId, setServiceId] = useState('');

  useEffect(() => {
    (async (): Promise<void> => {
      const { service_id } = await authService.getServiceId();
      setServiceId(service_id);
    })();
  }, []);

  const oAuthUrl = authService.getOAuthUrl(serviceId);

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
            <SubmitButton
              type="submit"
              disabled={!dirty || !isValid || isSubmitting}
            >
              Submit
            </SubmitButton>
          </FormContainer>
        )}
      </Formik>
      <AltButton type="button" onClick={router.goRegister}>
        Don&apos;t have an account?
      </AltButton>
      <OAuthButton>
        <a href={oAuthUrl} target="_self">
          <img
            src="https://yastatic.net/q/logoaas/v2/%D0%AF%D0%BD%D0%B4%D0%B5%D0%BA%D1%81.svg?circle=black&color=fff&first=white"
            alt=""
          />
        </a>
      </OAuthButton>
    </div>
  );
};

export default Auth;
