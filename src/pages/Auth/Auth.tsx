/* eslint-disable no-console */
import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormFiled from '../../components/components/FormField';
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
  const initialValues: MyFormValues = {
    login: '',
    password: '',
  };
  const handleSubmit = (values: MyFormValues): void => {
    authService.signIn(values)
      .then(() => {
        // REDIRECT TO "/"
      })
      .catch(console.log);
  };
  return (
     <div>
       <h1>Auth Page</h1>
       <Formik
         initialValues={initialValues}
         onSubmit={(handleSubmit)}
         validationSchema={SignInSchema}
       >
       {({ dirty, isValid }): React.ReactElement => (
          <Form>
            <FormFiled name="login" label="Login" />
            <FormFiled name="password" label="Password" type="password" />
            <button type="submit" disabled={!dirty || !isValid}>Submit</button>
          </Form>
       )}
       </Formik>
       <Link to="/register">Register</Link>
     </div>
  );
};

export default withRouter(Auth);
