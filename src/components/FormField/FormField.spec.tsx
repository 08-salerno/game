import React from 'react';
import { render } from 'enzyme';
import { Formik } from 'formik';
import FormField from './FormField';

it('FormField', () => {
  expect(render(<Formik
    initialValues={{}}
    onSubmit={() => {}}
  >
    {(): React.ReactElement => (
        <FormField name="firstName" label="First Name" />
    )}
                </Formik>)).toMatchSnapshot();
});
