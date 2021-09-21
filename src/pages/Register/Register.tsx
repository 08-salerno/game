import * as React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormFiled from '../../components/components/FormField';

 interface MyFormValues {
   firstName: string;
   secondName: string;
   email: string;
   login: string;
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
  password: Yup.string()
    .min(6, 'Password must contain at least 6 symbols')
    .required('Required'),
  checkPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords should match')
    .required('Required'),
});

export const Register: React.FC<{}> = () => {
  const initialValues: MyFormValues = {
    firstName: '',
    secondName: '',
    email: '',
    login: '',
    password: '',
    checkPassword: '',
  };
  const handleSubmit = (values: MyFormValues): void => {
    // eslint-disable-next-line no-console
    console.log({ values });
  };
  return (
     <div>
       <h1>Register Page</h1>
       <Formik
         initialValues={initialValues}
         onSubmit={(handleSubmit)}
         validationSchema={SignUpSchema}
       >
       {({ dirty, isValid }): React.ReactElement => (
          <Form>
            <FormFiled name="firstName" label="First Name" />
            <FormFiled name="secondName" label="Second Name" />
            <FormFiled name="email" label="Email" type="email" />
            <FormFiled name="login" label="Login" />
            <FormFiled name="password" label="Password" type="password" />
            <FormFiled name="checkPassword" label="Check Password" type="password" />
            <button type="submit" disabled={!dirty || !isValid}>Submit</button>
          </Form>
       )}
       </Formik>
     </div>
  );
};

export default Register;
