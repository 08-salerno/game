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
    <div className="formField">
    <label htmlFor="firstName" className="formField__label">{label}</label>
      <Field
        label={label}
        name={name}
        type={type}
        autoComplete="off"
        helperText={<ErrorMessage name={name} />}
        className="formField__input"
      />
      <div className="formField__error-placeholder">
        <ErrorMessage component="p" className="formField__error" name={name} />
      </div>
    </div>
);

export default FormField;
