import { useState, useEffect, useContext } from 'react';
import CurrentUserContext from '../contexts/current-user-context';
import FileAttachmentButton from './FileAttachmentButton';
import { updateComment, deleteCommentImages } from '../adapters/comment-adapter';
import { deleteComment } from '../adapters/comment-adapter';
import { Card, Button, TextArea, Text, Flex, Box, IconButton, Heading } from '@radix-ui/themes';
import { FilePlusIcon, TrashIcon } from '@radix-ui/react-icons';

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
    const [res, err] = await deleteComment(comment.id);
    if (res) handleUpdate(res);
  };

  return (
    <li key={comment.id} className="comment-container">
      <Card style={{ width: '100%' }}>
        <Flex direction={'column'}>
          <Flex gap={'2'}>
            {comment.profile_pic && (
              <img
                src={comment?.profile_pic}
                alt="Profile Picture"
                style={{ height: '50px', borderRadius: '50%', width: '50px' }}
              />
            )}
            <Flex direction={'column'} width={'100%'}>
              {<Text weight={'bold'}>{comment.username}</Text>}
              {currentComment?.id === comment.id && isEditing && userCanEdit(comment.user_id) ? (
                <TextArea
                  type="text"
                  value={commentData.content}
                  onChange={handleChange}
                  placeholder="Write a comment..."
                />
              ) : (
                <Text>{comment?.content}</Text>
              )}
              <ul className="image-list-container">
                <Flex gap={'3'}>
                  {comment.images.length > 0 &&
                    comment.images.map((img) => {
                      return (
                        <li key={img.id}>
                          <Flex
                            direction={'column'}
                            width={'fit-content'}
                            justify={'center'}
                            align={'center'}
                          >
                            <img
                              src={img.img_src}
                              alt="Attached Image"
                              style={{ height: '100px' }}
                            />
                            {currentComment?.id === comment.id && isEditing && (
                              <IconButton
                                type="button"
                                color="red"
                                onClick={() => handleRemoveImage(comment.id, img.id)}
                              >
                                <TrashIcon style={{ pointerEvents: 'none' }} />
                              </IconButton>
                            )}
                          </Flex>
                        </li>
                      );
                    })}
                </Flex>
              </ul>
            </Flex>
          </Flex>

          <ul>
            <Flex gap={'3'}>
              {currentComment?.id === comment.id &&
                isEditing &&
                fileData.map((file, index) => {
                  return (
                    <li key={index}>
                      <Flex direction={'column'} width={'fit-content'} align={'center'}>
                        <img
                          src={URL.createObjectURL(file)}
                          alt="Attached Image"
                          style={{ height: '100px' }}
                        />
                        <IconButton
                          type="button"
                          color="red"
                          value={index}
                          onClick={removeAttachedFile}
                        >
                          <TrashIcon style={{ pointerEvents: 'none' }} />
                        </IconButton>
                      </Flex>
                    </li>
                  );
                })}
            </Flex>
          </ul>

          <Flex justify={'end'} align={'center'} gap={'2'} wrap={'wrap'}>
            {currentComment?.id === comment.id && isEditing && (
              <FileAttachmentButton handleChange={handleChange} innerText={'Upload Image'} />
            )}
            {userCanEdit(comment.user_id) && (
              <Button color="red" onClick={() => handleDelete()}>
                Delete Comment
              </Button>
            )}
            {userCanEdit(comment.user_id) && (
              <Button value={comment.id} onClick={() => handleEdit(comment?.content)}>
                {currentComment?.id === comment.id && isEditing ? 'Cancel' : 'Edit Comment'}
              </Button>
            )}
            {currentComment?.id === comment.id && isEditing && (
              <Button color={isEditing ? 'green' : ''} onClick={handleSubmit}>
                Save Changes
              </Button>
            )}
          </Flex>
        </Flex>
      </Card>
    </li>
  );
}
