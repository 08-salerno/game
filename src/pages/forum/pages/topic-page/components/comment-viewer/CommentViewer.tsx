import React from 'react';
import FakeAvatar from '../../../../components/styled/FakeAvatar';
import FlexContainer from '../../../../components/styled/FlexContainer';
import LineItem from '../../../../components/styled/LineItem';
import { Comment } from '../../../../types/comment';
import CommentContainer from '../styled/CommentContainer';
import CommentTextContainer from '../styled/CommentTextContainer';

type CommentViewerProps = Omit<Comment, 'topicId'>

const CommentViewer = React.memo<CommentViewerProps>((props) => {
  const { createdAt, text } = props;

  return (
    <CommentContainer>
        <FlexContainer>
            <LineItem>
                <FakeAvatar />
            </LineItem>
            <LineItem>Name</LineItem>
            { /* todo [sitnik] подумать над парсингом даты */}
            <LineItem>{createdAt}</LineItem>
        </FlexContainer>
        <CommentTextContainer>
            {text}
        </CommentTextContainer>
    </CommentContainer>
  );
});

export default CommentViewer;
