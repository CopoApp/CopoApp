import { useState, useEffect, useContext } from 'react';
import { getUser } from '../adapters/user-adapter';
import CurrentUserContext from '../contexts/current-user-context';
import FileAttachmentButton from './FileAttachmentButton';
import { createComment } from '../adapters/comment-adapter';
import { useParams } from 'react-router-dom';
import { Card, Button, TextArea, Text, Flex, Box, IconButton } from '@radix-ui/themes';
import { FilePlusIcon, TrashIcon } from '@radix-ui/react-icons';
import user_placeholder from '../pages/Assets/user_placeholder.svg';

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
    console.log('hit');

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
      <Card>
        <Flex gap={'3'} justify={'center'} align={'center'}>
          <Box>
            <img
              src={userInformation.profile_pic || user_placeholder}
              alt="profile picture"
              style={{ height: '50px', borderRadius: '50%', width: '50px' }}
            />
          </Box>
          <Flex direction={'column'} width={'100%'}>
            <Text weight={'medium'}>{userInformation.username}</Text>
            <TextArea
              type="text"
              onChange={handleChange}
              name="content"
              value={content}
              placeholder="Write a comment..."
            />
          </Flex>
        </Flex>
        <Flex justify={'end'} align={'center'} gap={'2'}>
          <FileAttachmentButton
            innerText={<FilePlusIcon width={'20px'} height={'20px'} />}
            handleChange={handleChange}
          />
          <Button type="submit" color="green" name="images">
            Submit
          </Button>
        </Flex>

        <ul>
          <Flex gap={'3'}>
            {fileData?.length > 0 &&
              fileData?.map((img, index) => {
                return (
                  <li key={index}>
                    <Flex direction={'column'} width={'fit-content'} align={'center'}>
                      <img
                        src={URL.createObjectURL(img)}
                        alt="Attached Image"
                        style={{ height: '100px' }}
                      />
                      <IconButton
                        type="button"
                        color="red"
                        value={index}
                        onClick={handleRemoveImage}
                      >
                        <TrashIcon style={{ pointerEvents: 'none' }} />
                      </IconButton>
                    </Flex>
                  </li>
                );
              })}
          </Flex>
        </ul>
      </Card>
    </form>
  );
}
