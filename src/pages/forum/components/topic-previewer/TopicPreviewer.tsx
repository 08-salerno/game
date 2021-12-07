import React from 'react';
import { format } from 'date-fns';
import { ThemeProvider } from 'styled-components';
import {
  TopicCommentsCounter, TopicContainer, TopicDate, TopicInfo, TopicTitle, TopicUser,
} from '../../style';
import { TopicPreview } from '../../types/topic-preview';
import Avatar from '../avatar/avatar';
import { dateFormat } from '../../../../modules/utils/constants';

export type TopicItemProps = TopicPreview & {
  onClick?: (topicId: number) => void;
};

const TopicPreviewer: React.VFC<TopicItemProps> = (props) => {
  const {
    createdAt, title, commentsCount, id, onClick, author,
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
        <TopicInfo><Avatar url={author.avatar} />
          <TopicUser>{author?.login}</TopicUser>
          <TopicCommentsCounter>Комментариев: {commentsCount || 0}</TopicCommentsCounter>
          <TopicDate>{format(new Date(createdAt), dateFormat)}</TopicDate>
        </TopicInfo>
      </TopicContainer>
    </ThemeProvider>
  );
};

export default TopicPreviewer;
