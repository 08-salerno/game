import React from 'react';
import { format } from 'date-fns';
import { TopicPreview } from '../../types/topic-preview';
import FlexContainer from '../styled/FlexContainer';
import TopicContainer from '../styled/TopicContainer';
import LineItem from '../styled/LineItem';
import TopicInfo from '../styled/TopicInfo';
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

  const hasOnClick = !!onClick;

  return (
    <TopicContainer hoverable={hasOnClick} onClick={handleTopicClick}>
      <FlexContainer>
        <LineItem>
            <Avatar url={author.avatar} />
        </LineItem>
        <LineItem>{author?.login}</LineItem>
        <LineItem>{format(new Date(createdAt), dateFormat)}</LineItem>
      </FlexContainer>
      <h1>{title}</h1>
      <FlexContainer>
        <TopicInfo>Комментариев: {commentsCount || 0}</TopicInfo>
      </FlexContainer>
    </TopicContainer>
  );
};

export default TopicPreviewer;
