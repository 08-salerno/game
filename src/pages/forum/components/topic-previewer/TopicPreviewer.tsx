import React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  TopicCommentsCounter, TopicContainer, TopicDate, TopicInfo, TopicTitle, TopicUser,
} from '../../style';
import { TopicPreview } from '../../types/topic-preview';

export type TopicItemProps = TopicPreview & {
  onClick?: (topicId: string) => void;
};

const TopicPreviewer: React.VFC<TopicItemProps> = (props) => {
  const {
    createdAt, title, commentCount, id, onClick,
  } = props;

  const handleTopicClick = (): void => {
    if (onClick) onClick(id);
  };

  const theme = {
    hasOnClick: !!onClick,
  };

  return (
    <ThemeProvider theme={theme}>
      <TopicContainer onClick={handleTopicClick}>
        <TopicTitle>{title}</TopicTitle>
        <TopicInfo>
          <TopicUser>%USERNAME%</TopicUser>
          <TopicCommentsCounter>Комментариев: {commentCount || 0}</TopicCommentsCounter>
          {/* todo [sitnik] подумать над парсингом даты */}
          <TopicDate>{createdAt}</TopicDate>
        </TopicInfo>
      </TopicContainer>
    </ThemeProvider>
  );
};

export default TopicPreviewer;
