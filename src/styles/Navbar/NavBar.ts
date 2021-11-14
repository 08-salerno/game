import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const NavBar = styled.nav`
  overflow: hidden;
  background-color: #333;
  font-family: Arial;
`;
export const DropDown = styled.div`
  float: left;
  overflow: hidden;
`;
export const DropDownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;

  ${DropDown}:hover & {
    display: block;
  }
`;
export const DropDownButton = styled.button`
  font-size: 16px;
  border: none;
  outline: none;
  color: white;
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit; 
  margin: 0; 

  ${DropDown}:hover & {
    color: grey;
  }
`;
export const DropDownLink = styled(Link)`
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
  &:hover {
    background-color: Gainsboro;
  }
`;
export const NavBarLink = styled.a`
float: left;
font-size: 16px;
color: white;
text-align: center;
padding: 14px 16px;
text-decoration: none;
&:hover {
  color: grey;
}
`;
