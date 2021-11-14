/* eslint-disable react/require-default-props */
import React from 'react';
import {
  FormElement, Label, Input, ErrorText, ErrorPlaceholder,
} from './style';

interface FormikFieldProps {
  name: string;
  label: string;
  type?: string;
}

const FormField: React.FC<FormikFieldProps> = ({
  name, label, type = 'text',
}) => (
    <FormElement>
      <Label htmlFor="firstName">{label}</Label>
      <Input
        label={label}
        name={name}
        type={type}
        autoComplete="off"

      />
      <ErrorPlaceholder>
        <ErrorText component="p" name={name} />
      </ErrorPlaceholder>
    </FormElement>
);

export default FormField;
