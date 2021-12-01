import { ErrorMessage, Field } from 'formik';
import styled from 'styled-components';

export const FormElement = styled.div`
width: 100%;
max-width: 350px;
padding: 8px 0;
font-family: Arial;
`;
export const Label = styled.label`
display: block;
color: ${(props): string => props.theme.form.label};
font-size: 9px;
line-height: 9px;
font-weight: 500;
`;
export const Input = styled(Field)`
width: 100%;
border: none;
border-bottom: 1px solid ${(props): string => props.theme.form.underline};
color: ${(props): string => props.theme.form.font};
background-color: ${(props): string => props.theme.form.background};
font-weight: 500;
font-size: 14px;
line-height: 16px;
`;
export const ErrorPlaceholder = styled.div`
height: 8px;
`;
export const ErrorText = styled(ErrorMessage)`
margin-block-start: 0;
margin-block-end: 0;
color: red;
font-size: 8px;
line-height: 8px;
font-weight: normal;
`;
