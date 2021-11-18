import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NavBar = styled.nav`
  overflow: hidden;
  background-color: ${(props): string => props.theme.navbar.backgroundColor};
  font-family: Arial;
`;
export const DropDown = styled.div`
  float: left;
  overflow: hidden;
`;
export const DropDownContent = styled.div`
  display: none;
  position: absolute;
  background-color: ${(props): string => props.theme.navbar.buttonBackground};
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;

  ${DropDown}:hover & {
    display: block;
  }
`;
export const DropDownHead = styled.button`
  font-size: 16px;
  border: none;
  outline: none;
  color: ${(props): string => props.theme.navbar.font};
  padding: 14px 16px;
  background-color: ${(props): string => props.theme.navbar.backgroundColor};
  font-family: inherit; 
  margin: 0; 

  ${DropDown}:hover & {
    color: ${(props): string => props.theme.navbar.fontHover};
  }
`;
export const DropDownLink = styled(Link)`
  float: none;
  background-color: ${(props): string => props.theme.navbar.buttonBackground};
  color: ${(props): string => props.theme.navbar.buttonText};
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  &:hover {
    background-color: ${(props): string => props.theme.navbar.buttonHover};
  }
`;
export const DropDownButton = styled.button`
  width: 100%;
  font-size: 16px;
  text-align: start;
  border: none;
  outline: none;
  color: ${(props): string => props.theme.navbar.buttonText};
  padding: 14px 16px;
  background-color: ${(props): string => props.theme.navbar.buttonBackground};
  font-family: inherit; 
  margin: 0; 
  &:hover {
    background-color: ${(props): string => props.theme.navbar.buttonHover};
  }
`;
export const NavBarLink = styled.a`
float: left;
font-size: 16px;
color: ${(props): string => props.theme.navbar.font};
text-align: center;
background-color: ${(props): string => props.theme.navbar.backgroundColor};
padding: 14px 16px;
text-decoration: none;
&:hover {
  color: ${(props): string => props.theme.navbar.fontHover};
}
`;
