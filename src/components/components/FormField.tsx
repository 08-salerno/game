/* eslint-disable react/require-default-props */
import React from 'react';
import { ErrorMessage, Field } from 'formik';

interface FormikFieldProps {
  name: string;
  label: string;
  type?: string;
}

const FormField: React.FC<FormikFieldProps> = ({
  name, label, type = 'text',
}) => (
    <div>
    <label htmlFor="firstName">{label}</label>
      <Field
        label={label}
        name={name}
        type={type}
        autoComplete="off"
        helperText={<ErrorMessage name={name} />}
      />
      <ErrorMessage component="div" name={name} />
    </div>
);

export default FormField;
