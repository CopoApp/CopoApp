import { useState, useEffect, useContext } from 'react';
import CurrentUserContext from '../contexts/current-user-context';
import FileAttachmentButton from './FileAttachmentButton';
import { updateComment, deleteCommentImages } from '../adapters/comment-adapter';
import { deleteComment } from '../adapters/comment-adapter';

export default function Comment({ comment, setPostComments, handleUpdate, currentComment }) {
  const { currentUser } = useContext(CurrentUserContext);
  // State to manage the data entered in the form
  const [commentData, setCommentData] = useState(comment);
  // State to manage attached files
  const [fileData, setFileData] = useState([]);
  // State to manage removed images
  const [removedImages, setRemovedImages] = useState([]);

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (event) => {
    const { type, files } = event.target;

    const img = files?.[0];

    if (type === 'file' && img) {
      setFileData([...fileData, files[0]]);
    } else {
      setCommentData({ ...commentData, content: event.target.value });
    }
  };

  const userCanEdit = (userId) => currentUser.id === userId;

  const handleEdit = (content) => {
    setIsEditing(!isEditing);
    setCommentData({ ...commentData, content: content });
    setFileData([]);
    handleUpdate(comment);
  };

  const handleSubmit = async () => {
    const form = new FormData();

    for (let file of fileData) form.append('files', file);
    form.append('content', commentData.content);

    const [res, error] = await updateComment(comment.id, form);
    await deleteCommentImages(comment.id, removedImages);

    setIsEditing(false);
    setFileData([]);
    setRemovedImages([]);
    setCommentData({ ...comment, content: '' });
    handleUpdate(null);
  };

  const handleRemoveImage = (commentId, imageId) => {
    const updatedImages = comment.images.filter((image) => {
      if (image.id === imageId) return setRemovedImages([...removedImages, image]);
      return image;
    });

    setPostComments((previousComments) =>
      previousComments.map((comment) =>
        comment.id === commentId ? { ...comment, images: updatedImages } : comment
      )
    );
  };

  const removeAttachedFile = (event) =>
    setFileData((fileData) => fileData.filter((_, index) => index !== Number(event.target.value)));

  const handleDelete = async () => {
    deleteComment(comment.id).then(([res, err]) => handleUpdate(res));
  };

  return (
    <li key={comment.id} className="comment-container">
      {comment.profile_pic && (
        <img src={comment?.profile_pic} alt="Profile Picture" style={{ height: '100px' }} />
      )}
      {<p>{comment.username}</p>}
      {currentComment?.id === comment.id && isEditing && userCanEdit(comment.user_id) ? (
        <input type="text" value={commentData.content} onChange={handleChange} />
      ) : (
        <p>{comment?.content}</p>
      )}
      <ul className="image-list-container">
        {comment.images.length > 0 &&
          comment.images.map((img) => {
            return (
              <li key={img.id}>
                <img src={img.img_src} alt="Attached Image" style={{ height: '100px' }} />
                {currentComment?.id === comment.id && isEditing && (
                  <button onClick={() => handleRemoveImage(comment.id, img.id)}>
                    Remove Image
                  </button>
                )}
              </li>
            );
          })}
      </ul>
      <ul>
        {currentComment?.id === comment.id &&
          isEditing &&
          fileData.map((file, index) => {
            return (
              <li key={index}>
                <img
                  src={URL.createObjectURL(file)}
                  alt="Attached Image"
                  style={{ height: '100px' }}
                />
                <button value={index} onClick={removeAttachedFile}>
                  Remove Attached Image
                </button>
              </li>
            );
          })}
      </ul>
      {currentComment?.id === comment.id && isEditing && (
        <FileAttachmentButton handleChange={handleChange} />
      )}
      {userCanEdit(comment.user_id) && (
        <button value={comment.id} onClick={() => handleEdit(comment?.content)}>
          {currentComment?.id === comment.id && isEditing ? 'Stop Editing' : 'Edit Comment'}
        </button>
      )}
      {currentComment?.id === comment.id && isEditing && (
        <button onClick={handleSubmit}>Save Changes</button>
      )}
      {userCanEdit(comment.user_id) && (
        <button onClick={() => handleDelete()}>Delete Comment</button>
      )}
    </li>
  );
}
