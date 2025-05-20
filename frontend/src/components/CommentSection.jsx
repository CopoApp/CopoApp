import { useState, useEffect } from 'react';
import { getPostComments } from '../adapters/comment-adapter';
import { useParams } from 'react-router-dom';
import Comment from './Comment';
import CommentInput from './CommentInput';
import { Flex } from '@radix-ui/themes';

export default function CommentSection() {
  const { id } = useParams();
  const [currentComment, setCurrentComment] = useState(undefined);
  const [postComments, setPostComments] = useState([]);

  useEffect(() => {
    const loadPostComments = async () => {
      const [comments, error] = await getPostComments(id);
      if (error) return;
      setPostComments(comments);
    };
    loadPostComments();
  }, [currentComment]);

  const handleUpdate = (comment) => {
    setCurrentComment(comment);
  };

  return (
    <>
      <CommentInput handleUpdate={handleUpdate} />
      <Flex direction={'column'} mt={'20px'} gap={'2'}>
        {postComments?.length > 0 &&
          postComments?.map((comment) => {
            return (
              <Comment
                key={comment.id}
                comment={comment}
                setPostComments={setPostComments}
                handleUpdate={handleUpdate}
                currentComment={currentComment}
              />
            );
          })}
      </Flex>
    </>
  );
}
