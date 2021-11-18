import styled from 'styled-components';

export const ResultBlock = styled.div`
  display: flex;
  min-width: 200px;
  width: 100%;
  max-width: 800px;
  margin: 5px;
  border-radius: 15px;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  background-color: ${(props): string => props.theme.resultColor};
`;
export const ResultUser = styled.p`
  display: block;
  padding: 5px 50px;
  font-family: Arial;
  margin: 20px;
  font-size: 20px;
  line-height: 20px;
  font-weight: 500;
`;
export const ResultScore = styled.p`
  display: block;
  padding: 5px 50px;
  font-family: Arial;
  margin: 20px;
  font-size: 20px;
  line-height: 20px;
  font-weight: 500;
`;
export const ResultUserCurrent = styled.p`
  position: absolute;
  display: block;
  font-family: Arial;
  margin: 20px;
  font-size: 20px;
  line-height: 20px;
  font-weight: 500;
`;
