import styled from 'styled-components';

const StatText = styled.p`
  font-family: Arial;
  margin: 20px 0;
  font-size: 20px;
  line-height: 20px;
  font-weight: 900;
  color: ${(props): string => props.theme.font};
`;

export default StatText;
