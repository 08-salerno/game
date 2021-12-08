import styled from 'styled-components';
import { Form } from 'formik';

export const FormContainer = styled(Form)`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
`;
export const Title = styled.h1`
font-family: Arial;
margin: 20px;
font-size: 20px;
line-height: 20px;
font-weight: 500;
color: ${(props): string => props.theme.font};
`;
