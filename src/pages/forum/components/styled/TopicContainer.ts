import styled from 'styled-components';

const TopicContainer = styled.div<{hoverable?: boolean}>`
  padding: 10px;
  margin: 10px 0;
  box-shadow: 0 0 5px rgb(0 0 0 / 25%);
  
  ${(props): string => (props.hoverable ? `
      &:hover {
        background-color: #efefef
      }
  ` : '')}
 
`;

export default TopicContainer;
