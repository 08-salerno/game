import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, FormikValues } from 'formik';
import { object, string } from 'yup';
import { ForumRouteParams } from '../../routes';
import {
  getComments, getTopic, getTopicCommentCount, leaveComment,
} from '../../api';
import { Topic } from '../../types/topic';
import TopicPreviewer from '../../components/topic-previewer/TopicPreviewer';
import { Comment } from '../../types/comment';
import CommentViewer from './components/comment-viewer/CommentViewer';
import { CommentsContainer, LoadingText, TopicPageContainer } from '../../style';
import { FormContainer } from '../../../../styles/Forms/Forms';
import FormFiled from '../../../../components/FormField/FormField';
import { AltButton, SubmitButton } from '../../../../styles/Buttons/Buttons';
import { FormikSubmit } from '../../../../modules/utils/formik.utils';

const TopicPage: React.VFC = () => {
  const { topicId } = useParams<ForumRouteParams>();

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
    // todo [sitnik] исправить потенциальную ошибку с некорректным смещением
    setCommentsOffset(comments.length);
  };

  const CommentSchema = object().shape({
    comment: string()
      .min(2, 'Comment is too short')
      .max(300, 'Comment is too long'),
  });

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
              <Formik
                initialValues={{ comment: '' }}
                validationSchema={CommentSchema}
                onSubmit={handleLeaveComment}
              >
                {({ dirty, isValid, isSubmitting }): React.ReactElement => (
                  <FormContainer>
                    <FormFiled name="comment" label="comment" type="comment" />
                    <SubmitButton type="submit" disabled={!dirty || !isValid || isSubmitting}>Submit</SubmitButton>
                  </FormContainer>
                )}
              </Formik>
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
