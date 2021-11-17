import styled from 'styled-components';

export const Title = styled.h1`
  font-family: Arial;
  margin: 20px 0;
  font-size: 20px;
  line-height: 20px;
  font-weight: 900;
  color: ${(props): string => props.theme.font};
`;

export const Description = styled.p`
  font-family: Arial;
  margin: 20px 0;
  font-size: 20px;
  line-height: 20px;
  font-weight: 500;
  color: ${(props): string => props.theme.font};
`;
