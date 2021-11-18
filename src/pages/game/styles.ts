import styled from 'styled-components';
import Modal from 'react-modal';

export const Popup = styled.div`
  display: flex;
  align-items: center;
  justify-content:center;
  flex-direction: column;
  inset: none;
  color: ${(props): string => props.theme.font};
`;
export const StyledModal = styled(Modal)`
  position: relative;
  background: ${(props): string => props.theme.backgroundColor};
  overflow: auto;
  border-radius: 4px;
  outline: none;
  padding: 20px;
  margin: 40vh 200px;
  border-radius: 25px;
`;
export const Title = styled.h1`
  font-family: Arial;
  margin: 20px;
  font-size: 20px;
  line-height: 20px;
  font-weight: 900;
color: ${(props): string => props.theme.font};
`;
export const StatText = styled.p`
  font-family: Arial;
  margin: 20px 0;
  font-size: 20px;
  line-height: 20px;
  font-weight: 500;
  color: ${(props): string => props.theme.font};
`;
