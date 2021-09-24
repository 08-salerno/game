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
  const handleSubmit = (values: MyFormValues): void => {
    authService.sihnUp(values)
      .then(() => {
      // REDIRECT TO "/"
      })
      .catch(console.log);
  };
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

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={(handleSubmit)}
        validationSchema={SignUpSchema}
      >
      {({ dirty, isValid }): React.ReactElement => (
        <Form className="form">
          <h1 className="form__title">Register Page</h1>
          <FormFiled name="firstName" label="First Name" />
          <FormFiled name="secondName" label="Second Name" />
          <FormFiled name="email" label="Email" type="email" />
          <FormFiled name="login" label="Login" />
          <FormFiled name="phone" label="Phone" type="tel" />
          <FormFiled name="password" label="Password" type="password" />
          <FormFiled name="checkPassword" label="Check Password" type="password" />
          <button type="submit" disabled={!dirty || !isValid} className="button form__button">Submit</button>
        </Form>
      )}
      </Formik>
      <button type="button" className="button" onClick={goAuth}>Already have an account?</button>
    </div>
  );
};

export default Register;
