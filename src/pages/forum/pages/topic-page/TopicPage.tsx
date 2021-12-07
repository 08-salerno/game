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
import { CommentsContainer, LoadingText, TopicPageContainer } from '../../style';
import { AltButton } from '../../../../styles/Buttons/Buttons';
import CommentLeaver from './components/comment-leaver/CommentLeaver';

const TopicPage: React.VFC = () => {
  const { topicId } = useParams<ForumRouteParams>();

  const [loading, setLoading] = useState(true);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [loadingComments, setLoadingComments] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    getTopic(topicId)
      .then((topic) => setTopic(topic))
      .catch(() => setTopic(null))
      .finally(() => setLoading(false));
  }, []);

  const handleLeaveComment = (text: string): Promise<void> => leaveComment(topicId, text)
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
    setLoadingComments(true);
    getComments(topicId, comments.length)
      .then((newComments) => setComments([...comments, ...newComments]))
      .catch(() => {
        // todo [sitnik] придумать обработку ошибки
      })
      .finally(() => setLoadingComments(false));
  };

  useEffect(() => {
    handleLoadMoreCommentButtonClick();
  }, []);

  return (
    <TopicPageContainer>
      {loading ? (
        <LoadingText>Загрузка</LoadingText>
      ) : (
        <>
          {!topic ? (
            <LoadingText>Не найдено или редирект</LoadingText>
          ) : (
            <>
              <TopicPreviewer
                id={topic.id}
                title={topic.title}
                author={topic.author}
                commentsCount={topic.commentsCount}
                createdAt={topic.createdAt}
              />
              <br />
              <CommentLeaver handleLeaveComment={handleLeaveComment} />
              <CommentsContainer>
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
                  <LoadingText>Загрузка комментариев</LoadingText>
                ) : (
                    <AltButton type="button" onClick={handleLoadMoreCommentButtonClick}>
                      Загрузить ещё
                    </AltButton>
                )}
              </CommentsContainer>
            </>
          )}
        </>
      )}
    </TopicPageContainer>
  );
};

export default TopicPage;
