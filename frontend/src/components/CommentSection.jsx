import { useState, useEffect } from 'react';
import { getPostComments } from '../adapters/comment-adapter';
import { useParams } from 'react-router-dom';
import Comment from './Comment';
import CommentInput from './CommentInput';

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
    </>
  );
}
