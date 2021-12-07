import styled from 'styled-components';
import { colors } from '../../styles/colors';

export const CreateBlock = styled.div`
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const TopicsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial;
  margin: 20px auto;
  width: calc(100vw - 300px)
`;
export const TopicPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial;
  margin: 20px auto;
  width: calc(100vw - 300px)
`;
export const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial;
  margin: 20px auto;
  width: calc(100vw - 300px)
`;
export const LoadingText = styled.div`
  font-size: 14px;
  line-height: 12px;
  margin: 20px auto;
`;
export const TopicContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid ${(props): string => props.theme.forum.underline};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: ${(props): string => props.theme.form.font};
  padding: 10px;
  cursor: ${(props): string => (props.theme.hasOnClick ? 'pointer' : 'default')};
  ${(props): string => (props.theme.hasOnClick ? `
    &:hover {
      background-color: ${props.theme.forum.topicHover};
      border-bottom: 1px solid ${props.theme.forum.underlineHover};
    }` : '')};
`;
export const TopicTitle = styled.p`
  display: block;
  margin: auto 0;
  font-weight: 900;
  font-size: 24px;
  line-height: 26px;
  padding: 10px;
`;
export const TopicInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 18px;
  padding: 10px 10px 0;
`;
export const TopicUser = styled.div`
  justify-self: flex-start;
  margin-right: auto;
`;
export const TopicCommentsCounter = styled.div`
  padding: 0 20px;
`;
export const TopicDate = styled.div`
  padding: 0 20px;
  color: ${(props): string => props.theme.altFont};
`;

export const CommentContainer = styled.div`
  width: 80%;
  border-bottom: 1px solid ${(props): string => props.theme.forum.underline};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: ${(props): string => props.theme.font};
  padding: 10px 10px 0;
`;
export const CommentInfo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  padding: 10px;
`;
export const CommentUser = styled.div`
  font-weight: bold;
  margin-right: 20px;
`;
export const CommentDate = styled.div`
  font-size: 14px;
  color: ${(props): string => props.theme.altFont};
`;
export const CommentText = styled.p`
  display: block;
  margin: auto 0;
  font-size: 22px;
  line-height: 24px;
  padding: 10px;
`;
