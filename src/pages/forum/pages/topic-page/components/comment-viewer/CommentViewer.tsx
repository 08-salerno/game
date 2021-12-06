import React from 'react';
import { format } from 'date-fns';
import FlexContainer from '../../../../components/styled/FlexContainer';
import LineItem from '../../../../components/styled/LineItem';
import { Comment } from '../../../../types/comment';
import CommentContainer from '../styled/CommentContainer';
import CommentTextContainer from '../styled/CommentTextContainer';
import Avatar from '../../../../components/avatar/avatar';
import { dateFormat } from '../../../../../../modules/utils/constants';

type CommentViewerProps = Omit<Comment, 'topicId'>

const CommentViewer = React.memo<CommentViewerProps>((props) => {
  const { createdAt, text, author } = props;

  return (
    <CommentContainer>
        <FlexContainer>
            <LineItem>
                <Avatar url={author.avatar} />
            </LineItem>
            <LineItem>{author.login}</LineItem>
            <LineItem>{format(new Date(createdAt), dateFormat)}</LineItem>
        </FlexContainer>
        <CommentTextContainer>
            {text}
        </CommentTextContainer>
    </CommentContainer>
  );
});

export default CommentViewer;
