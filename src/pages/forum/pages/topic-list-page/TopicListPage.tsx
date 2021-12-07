import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getTopicPreviews } from '../../api';
import { TopicPreview } from '../../types/topic-preview';
import TopicPreviewer from '../../components/topic-previewer/TopicPreviewer';
import ForumRoutes from '../../routes';
import { selectIsAuthorized } from '../../../../modules/redux/slices/userSlice';
import { AltButton, SubmitButton } from '../../../../styles/Buttons/Buttons';
import { CreateBlock, LoadingText, TopicsContainer } from '../../style';

const TopicListPage: React.VFC = () => {
  const [topics, setTopics] = useState<TopicPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [topicsOffset, setTopicsOffset] = useState(0);

  const isUserAuthorized = useSelector(selectIsAuthorized);

  useEffect(() => {
    setLoading(true);
    getTopicPreviews(topicsOffset)
      .then((newTopics) => {
        setTopics([...topics, ...newTopics]);
      })
      .catch(() => {
        // todo [sitnik] уведомить об шибке
      })
      .finally(() => setLoading(false));
  }, [topicsOffset]);

  const { url } = useRouteMatch();
  const history = useHistory();

  const handleTopicClick = (topicId: number): void => {
    history.push(`${url}/${topicId}`);
  };

  const handleCreateTopicButtonClick = (): void => {
    history.push(`${url}${ForumRoutes.TOPIC_CREATE}`);
  };

  const handleLoadMoreTopicsButtonClick = (): void => {
    setTopicsOffset(topics.length);
  };

  return (
    <div>
        {isUserAuthorized && (
          <CreateBlock>
            <SubmitButton type="button" onClick={handleCreateTopicButtonClick}>Создать тему</SubmitButton>
          </CreateBlock>
        )}
      <TopicsContainer>
        {
          topics.map((topic) => (
            <TopicPreviewer
              key={topic.id}
              id={topic.id}
              title={topic.title}
              author={topic.author}
              commentsCount={topic.commentsCount}
              createdAt={topic.createdAt}
              onClick={handleTopicClick}
            />
          ))
        }
        {loading ? <LoadingText>Загрузка списка</LoadingText> : (
          <div>
            <AltButton type="button" onClick={handleLoadMoreTopicsButtonClick}>Загрузить ещё</AltButton>
          </div>
        )}
      </TopicsContainer>
    </div>
  );
};

export default TopicListPage;
