/* eslint-disable react/require-default-props */
import React from 'react';
import styled from 'styled-components';
import { ErrorMessage, Field } from 'formik';

interface FormikFieldProps {
  name: string;
  label: string;
  type?: string;
}

const FormElement = styled.div`
  width: 100%;
  max-width: 350px;
  padding: 8px 0;
  font-family: Arial;
`;
const Label = styled.label`
  display: block;
  color: grey;
  font-size: 9px;
  line-height: 9px;
  font-weight: 500;
`;
const Input = styled(Field)`
  width: 100%;
  border: none;
  border-bottom: 1px solid #333;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
`;
const ErrorPlaceholder = styled.div`
  height: 8px;
`;
const ErrorText = styled(ErrorMessage)`
  margin-block-start: 0;
  margin-block-end: 0;
  color: red;
  font-size: 8px;
  line-height: 8px;
  font-weight: normal;
`;

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
