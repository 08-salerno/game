import React from 'react';
import { Comment } from '../../../../types/comment';

type CommentViewerProps = Omit<Comment, 'topicId'>

const CommentViewer = React.memo<CommentViewerProps>((props) => {
  const { createdAt, text } = props;

  return (
    <div>
        <div>-----------------------------------------------------</div>
        <div>
            <span>Avatar</span>
            <span>Name</span>
            { /* todo [sitnik] подумать над парсингом даты */}
            <span>{createdAt}</span>
        </div>
        <div>
            {text}
        </div>
    </div>
  );
});

export default CommentViewer;
