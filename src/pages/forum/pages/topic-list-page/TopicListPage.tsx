import React, { useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { defaultQueryOffset, getTopicPreviews } from '../../api';
import { TopicPreview } from '../../types/topic-preview';
import TopicPreviewer from '../../components/topic-previewer/TopicPreviewer';
import ForumRoutes from '../../routes';
import { selectIsAuthorized } from '../../../../modules/redux/slices/userSlice';

const TopicListPage: React.VFC = () => {
  const [topics, setTopics] = useState<TopicPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [topicsOffset, setTopicsOffset] = useState(0);

  const isUserAuthorized: boolean = useSelector(selectIsAuthorized);

  useEffect(() => {
    setLoading(true);
    getTopicPreviews(topicsOffset)
      .then((newTopics) => {
        setTopics([...topics, ...newTopics]);
      })
      .catch(() => {
        // todo [sitnik] уведомить об шибке + вернуть offset на изначальную позицю-
        // setTopicsOffset(topicsOffset - defaultQueryOffset);
      })
      .finally(() => setLoading(false));
  }, [topicsOffset]);

  const { url } = useRouteMatch();
  const history = useHistory();

  const handleTopicClick = (topicId: string): void => {
    history.push(`${url}/${topicId}`);
  };

  const handleCreateTopicButtonClick = (): void => {
    history.push(`${url}${ForumRoutes.TOPIC_CREATE}`);
  };

  const handleLoadMoreTopicsButtonClick = (): void => {
    // todo [sitnik] исправить потенциальную ошибку с некорректным смещением
    setTopicsOffset(topicsOffset + defaultQueryOffset);
  };

  return (
    <div>
        <div>
            <span>
                <input placeholder="Поиск" />
            </span>
            {isUserAuthorized && (
                <span>
                    <button type="button" onClick={handleCreateTopicButtonClick}>Создать тему</button>
                </span>
            )}
        </div>
        <div>
            {
                topics.map((topic) => (
                    <TopicPreviewer
                      key={topic.id}
                      id={topic.id}
                      title={topic.title}
                      author={topic.author}
                      commentCount={topic.commentCount}
                      createdAt={topic.createdAt}
                      onClick={handleTopicClick}
                    />
                ))
            }
            {loading ? 'Загрузка списка' : (
                <div>
                    <button type="button" onClick={handleLoadMoreTopicsButtonClick}>Загрузить ещё</button>
                </div>
            )}
        </div>
    </div>
  );
};

export default TopicListPage;
