import * as React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormFiled from '../../components/components/FormField';

 interface MyFormValues {
   email: string;
   password: string;
 }

const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email is invalid')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Password must contain at least 6 symbols')
    .required('Required'),
});

export const Auth: React.FC<{}> = () => {
  const initialValues: MyFormValues = {
    email: '',
    password: '',
  };
  const handleSubmit = (values: MyFormValues): void => {
    // eslint-disable-next-line no-console
    console.log({ values });
  };
  return (
     <div>
       <h1>Auth Page</h1>
       <Formik
         initialValues={initialValues}
         onSubmit={(handleSubmit)}
         validationSchema={SignUpSchema}
       >
       {({ dirty, isValid }): React.ReactElement => (
          <Form>
            <FormFiled name="email" label="Email" type="email" />
            <FormFiled name="password" label="Password" type="password" />
            <button type="submit" disabled={!dirty || !isValid}>Submit</button>
          </Form>
       )}
       </Formik>
     </div>
  );
};

export default Auth;
