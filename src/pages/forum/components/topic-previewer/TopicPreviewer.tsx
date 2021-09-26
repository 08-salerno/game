import React from 'react';
import { TopicPreview } from '../../types/topic-preview';

export type TopicItemProps = TopicPreview & {
    onClick?: (topicId: string) => void
}

const TopicPreviewer: React.VFC<TopicItemProps> = (props) => {
  const {
    createdAt, title, commentCount, id, onClick,
  } = props;

  const handleTopicClick = (): void => {
    if (onClick) onClick(id);
  };

  return (
    <div className="TopicItem" onClick={handleTopicClick}>
        <div>-----------------------------------------------------</div>
        <div className="TopicItem__header">
            <span>Avatar</span>
            <span>Name</span>
            { /* todo [sitnik] подумать над парсингом даты */}
            <span>{createdAt}</span>
        </div>
        <div className="TopicItem__title">
            <h1>{title}</h1>
        </div>
        <div className="TopicItem__footer">
            <span>Комментариев: {commentCount || 0}</span>
        </div>
    </div>
  );
};

export default TopicPreviewer;
