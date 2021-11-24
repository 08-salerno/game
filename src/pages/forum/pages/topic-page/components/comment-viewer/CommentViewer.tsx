import React from 'react';
import {
  CommentContainer, CommentText, CommentInfo, CommentUser, CommentDate,
} from '../../../../style';
import { Comment } from '../../../../types/comment';

type CommentViewerProps = Omit<Comment, 'topicId'>

const CommentViewer = React.memo<CommentViewerProps>((props) => {
  const { createdAt, text } = props;

  return (
    <>
      <CommentContainer>
        <CommentInfo>
          <CommentUser>%USERNAME%</CommentUser>
          {/* todo [sitnik] подумать над парсингом даты */}
          <CommentDate>{createdAt}</CommentDate>
        </CommentInfo>
        <CommentText>{text}</CommentText>
      </CommentContainer>
    </>
  );
});

export default CommentViewer;
