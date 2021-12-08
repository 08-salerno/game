import React from 'react';
import { format } from 'date-fns';
import {
  CommentContainer,
  CommentText,
  CommentInfo,
  CommentUser,
  CommentDate,
  CommentAvatar,
} from '../../../../style';
import { Comment } from '../../../../types/comment';
import Avatar from '../../../../components/avatar/avatar';
import { dateFormat } from '../../../../../../modules/utils/constants';

type CommentViewerProps = Omit<Comment, 'topicId'>;

const CommentViewer = React.memo<CommentViewerProps>((props) => {
  const { createdAt, text, author } = props;

  return (
    <CommentContainer>
      <CommentInfo>
        <CommentAvatar>
          <Avatar url={author.avatar} />
        </CommentAvatar>
        <CommentUser>{author.login}</CommentUser>
        <CommentDate>{format(new Date(createdAt), dateFormat)}</CommentDate>
      </CommentInfo>
      <CommentText>{text}</CommentText>
    </CommentContainer>
  );
});

export default CommentViewer;
