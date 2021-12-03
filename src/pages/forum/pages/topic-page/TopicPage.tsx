import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ForumRouteParams } from '../../routes';
import {
  getComments, getTopic, getTopicCommentCount, leaveComment,
} from '../../api';
import { Topic } from '../../types/topic';
import TopicPreviewer from '../../components/topic-previewer/TopicPreviewer';
import { Comment } from '../../types/comment';
import CommentViewer from './components/comment-viewer/CommentViewer';
import CommentLeaver from './components/comment-leaver/CommentLeaver';
import { useAppSelector } from '../../../../modules/redux/hooks';
import { selectUser } from '../../../../modules/redux/slices/userSlice';

const TopicPage: React.VFC = () => {
  const { topicId } = useParams<ForumRouteParams>();

  const user = useAppSelector(selectUser)!;

  const [loading, setLoading] = useState(true);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loadingComments, setLoadingComments] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentsOffset, setCommentsOffset] = useState(0);

  useEffect(() => {
    getTopic(topicId)
      .then((topic) => setTopic(topic))
      .catch(() => setTopic(null))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setLoadingComments(true);
    getComments(topicId, commentsOffset)
      .then((newComments) => setComments([...comments, ...newComments]))
      .catch(() => {
        // todo [sitnik] придумать обработку ошибки
      })
      .finally(() => setLoadingComments(false));
  }, [commentsOffset]);

  const handleLeaveComment = (text: string): Promise<void> => leaveComment(topicId, text, user.id)
    .then((comment) => {
      setComments((prevComments) => ([...prevComments, comment]));
      return getTopicCommentCount(topicId);
    }).then((commentsCount) => {
      if (topic) {
        topic.commentsCount = commentsCount;
        setTopic({ ...topic });
      }
    });

  const handleLoadMoreCommentButtonClick = (): void => {
    // todo [sitnik] исправить потенциальную ошибку с некорректным смещением
    setCommentsOffset(comments.length);
  };

  return (
    <>
      {loading ? (
        'Загрузка'
      ) : (
        <>
          {!topic ? (
            <div>Не найдено или редирект</div>
          ) : (
            <>
              <TopicPreviewer
                id={topic.id}
                title={topic.title}
                author={topic.author}
                commentsCount={topic.commentsCount}
                createdAt={topic.createdAt}
              />
              <CommentLeaver handleLeaveComment={handleLeaveComment} />
              <div>
                {comments.map((comment) => (
                  <CommentViewer
                    key={comment.id}
                    id={comment.id}
                    text={comment.text}
                    author={comment.author}
                    createdAt={comment.createdAt}
                  />
                ))}
                {loadingComments ? (
                  'Загрузка комментариев'
                ) : (
                  <div>
                    <button type="button" onClick={handleLoadMoreCommentButtonClick}>
                      Загрузить ещё
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default TopicPage;
