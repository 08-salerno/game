import styled from 'styled-components';

const ButtonNormalize = styled.button`
display: inline-block;
-webkit-appearance: none;
-moz-appearance: none;
appearance: none;
margin: 0;
padding: 0;
border: none;
font-family: Arial;
font-weight: normal;
font-size: inherit;
text-decoration: none;
cursor: pointer;
&:disabled {
  cursor: not-allowed;
}
`;
const Button = styled(ButtonNormalize)`
width: auto;
height: 37px;
margin: 5px;
padding: 0 8px;
border-radius: 8px;
color: black;
`;
export const BlueButton = styled(Button)`
background-color: #AED6F1;

&:hover {
  background-color: #5DADE2;
}
&:disabled {
  background-color: #EBF5FB;
}
`;
export const PurpleButton = styled(Button)`
background-color: #D2B4DE;

&:hover {
  background-color: #A569BD;
}
&:disabled {
  background-color: #F4ECF7;
}
`;
export const GreenButton = styled(Button)`
background-color: #A3E4D7;

&:hover {
  background-color: #48C9B0;
}
&:disabled {
  background-color: #E8F8F5;
}
`;
