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
export const SubmitButton = styled(Button)`
background-color: ${(props): string => props.theme.buttons.main.main};
color: ${(props): string => props.theme.buttons.font};

&:hover {
  background-color: ${(props): string => props.theme.buttons.main.hover};
}
&:disabled {
  background-color: ${(props): string => props.theme.buttons.main.disabled};
}
`;
export const AltButton = styled(Button)`
background-color: ${(props): string => props.theme.buttons.alt.main};
color: ${(props): string => props.theme.buttons.font};

&:hover {
  background-color: ${(props): string => props.theme.buttons.alt.hover};
}
&:disabled {
  background-color: ${(props): string => props.theme.buttons.alt.disabled};
}
`;
export const ExitButton = styled(Button)`
background-color: ${(props): string => props.theme.buttons.exit.main};
color: ${(props): string => props.theme.buttons.font};

&:hover {
  background-color: ${(props): string => props.theme.buttons.exit.hover};
}
&:disabled {
  background-color: ${(props): string => props.theme.buttons.exit.disabled};
}
`;
export const OAuthButton = styled.div`
    margin-top: 20px;
  `;
