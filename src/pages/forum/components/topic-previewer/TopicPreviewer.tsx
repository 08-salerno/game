import React from 'react';
import { TopicPreview } from '../../types/topic-preview';
import FakeAvatar from '../styled/FakeAvatar';
import FlexContainer from '../styled/FlexContainer';
import TopicContainer from '../styled/TopicContainer';
import LineItem from '../styled/LineItem';
import TopicInfo from '../styled/TopicInfo';

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

  const hasOnClick = !!onClick;

  return (
    <TopicContainer hoverable={hasOnClick} onClick={handleTopicClick}>
      <FlexContainer>
        <LineItem>
            <FakeAvatar />
        </LineItem>
        <LineItem>Name</LineItem>
        {/* todo [sitnik] подумать над парсингом даты */}
        <LineItem>{createdAt}</LineItem>
      </FlexContainer>
      <h1>{title}</h1>
      <FlexContainer>
        <TopicInfo>Комментариев: {commentCount || 0}</TopicInfo>
      </FlexContainer>
    </TopicContainer>
  );
};

export default TopicPreviewer;
