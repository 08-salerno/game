/* eslint-disable no-console */
import * as React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormFiled from '../../components/FormField';
import AuthService from '../../modules/api/AuthService';

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
  const handleSubmit = (values: MyFormValues): void => {
    authService.signIn(values)
      .then(() => {
        history.push('/');
      })
      .catch(console.log);
  };
  const goRegister = (): void => {
    history.push('/register');
  };

  useEffect(() => {
    authService.getUser()
      .then(() => {
        history.push('/');
      })
      .catch((err) => console.log('error', err));
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(handleSubmit)}
        validationSchema={SignInSchema}
      >
      {({ dirty, isValid }): React.ReactElement => (
        <Form className="form">
          <h1 className="form__title">Auth Page</h1>
          <FormFiled name="login" label="Login" />
          <FormFiled name="password" label="Password" type="password" />
          <button type="submit" disabled={!dirty || !isValid} className="button form__button">Submit</button>
        </Form>
      )}
      </Formik>
      <button type="button" className="button" onClick={goRegister}>Don&apos;t have an account?</button>
    </div>
  );
};

export default Auth;
