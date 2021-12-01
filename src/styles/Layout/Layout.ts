import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-height: 100%;
  background-color: ${(props): string => props.theme.backgroundColor};
`;
export default Layout;
