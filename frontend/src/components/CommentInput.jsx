import { useState, useEffect, useContext } from 'react';
import { getUser } from '../adapters/user-adapter';
import CurrentUserContext from '../contexts/current-user-context';
import FileAttachmentButton from './FileAttachmentButton';
import { createComment } from '../adapters/comment-adapter';
import { useParams } from 'react-router-dom';

export default function CommentInput({ handleUpdate }) {
  const { id } = useParams();
  const { currentUser } = useContext(CurrentUserContext);
  const [userInformation, setUserInformation] = useState([]);
  // State to manage attached files
  const [fileData, setFileData] = useState([]);
  // State to manage the data entered in the form
  const [content, setContent] = useState('');

  useEffect(() => {
    const loadUserInformation = async () => {
      const [userInformation, error] = await getUser(currentUser.id);
      if (error) return;
      setUserInformation(userInformation);
    };
    loadUserInformation();
  }, [currentUser]);

  const handleChange = (event) => {
    const { type, files } = event.target;

    const img = files?.[0];

    if (type === 'file' && img) {
      setFileData([...fileData, files[0]]);
    } else {
      setContent(event.target.value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = new FormData();
    body.append('content', content);
    fileData.forEach((file) => body.append('files', file));
    const [comment, error] = await createComment(id, body);

    if (comment) handleUpdate(comment);
    setFileData([]);
    setContent('');
  };

  const handleRemoveImage = (event) => {
    event.preventDefault();
    const removeIndex = Number(event.target.value);
    const updatedFileData = fileData.filter((_, index) => index !== removeIndex);
    setFileData(updatedFileData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>{userInformation.username}</p>
      <img src={userInformation.profile_pic} alt="profile picture" style={{ height: '100px' }} />
      <input type="text" onChange={handleChange} name="content" value={content} />
      <FileAttachmentButton handleChange={handleChange} />
      <button type="submit" name="images">
        Submit
      </button>
      <ul>
        {fileData?.length > 0 &&
          fileData?.map((img, index) => {
            return (
              <li key={index}>
                <img
                  src={URL.createObjectURL(img)}
                  alt="Attached Image"
                  style={{ height: '100px' }}
                />
                <button type="button" value={index} onClick={handleRemoveImage}>
                  Delete Image
                </button>
              </li>
            );
          })}
      </ul>
    </form>
  );
}
