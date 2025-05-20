import React, { useEffect, useState } from 'react';
import '../styles/index.css';
import { createPost, attachPostImages } from '../adapters/post-adapter';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import FileAttachmentButton from '../components/FileAttachmentButton';

const types = ['Dogs', 'Cats', 'Rabbits', 'Guinea Pigs', 'Reptiles', 'Ferrets'];
// example list

import {
  Box,
  Container,
  Select,
  TextField,
  Card,
  Flex,
  TextArea,
  Button,
  Text,
  Callout,
} from '@radix-ui/themes';
import { IconButton } from '@radix-ui/themes';
import { TrashIcon } from '@radix-ui/react-icons';

import * as yup from 'yup';

// schema for yup validation
const schema = yup.object().shape({
  pet_name: yup.string().required(),
  pet_weight: yup.number().integer().min(0).max(1000).required(),
  pet_height: yup.number().integer().min(0).max(1000).required(),
  contact_email: yup.string().email().required(),
  contact_phone_number: yup.string().length(10).required(),
  last_seen_location: yup.string().required(),
});

export default function PetReportForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    status: 'Lost',
    title: '',
    content: '',
    contact_email: '',
    contact_phone_number: '',
    pet_name: '',
    pet_height: 0,
    pet_weight: 0,
    pet_type: '',
    pet_color: '',
    last_seen_location: '',
    last_seen_location_latitude: 0,
    last_seen_location_longitude: 0,
  });
  const [fileData, setFileData] = useState([]);
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;

    if (type === 'file') {
      setFileData([...fileData, files[0]]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    // User cannot attach more than five files
    if (fileData.length > 5) return setMessage('You cannot attach more than 5 files');

    // Input Validation Checks
    try {
      await schema.validate(formData);
    } catch (error) {
      const { message } = error;
      return setMessage(message);
    }

    const data = new FormData();

    for (let item in formData) {
      data.append(item, formData[item]);
    }

    fileData.forEach((file) => data.append('files', file));

    const [post, error] = await createPost(data);

    if (post) {
      console.log(`Post created sucessfully! 🎉`);
      navigate('/feed');
    }

    if (error) {
      setMessage(`Failed to create post. Please try again.`);
    }
  };

  const handleRemoveImage = (event) => {
    event.preventDefault();
    const removeIndex = Number(event.target.value);
    const updatedFileData = fileData.filter((value, index) => index !== removeIndex);
    setFileData(updatedFileData);
  };

  return (
    <>
      <Container
        className="reports-list-container"
        size={'2'}
        pb={'100px'}
        pt={'30px'}
        pl={'4'}
        pr={'4'}
      >
        <Card>
          <Flex direction={'column'} gap={'3'}>
            <Flex direction={'column'}>
              {/* Pet name field */}
              <Text weight={'medium'}>Pet Name*</Text>
              <TextField.Root
                onChange={handleChange}
                name="pet_name"
                value={formData.pet_name}
                placeholder="Name"
                required
              ></TextField.Root>
            </Flex>

            {/* List of Breeds */}
            <Flex direction={'column'}>
              <Text weight={'medium'}>Pet Type</Text>
              <select name="pet_type" value={formData.pet_type} onChange={handleChange}>
                {types.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </Flex>

            {/* Last Seen Location */}
            <Box>
              <Text weight={'medium'}>Last Seen At*</Text>
              <TextField.Root
                name="last_seen_location"
                value={formData.last_seen_location}
                onChange={handleChange}
                placeholder="Location"
                required
              ></TextField.Root>
            </Box>

            {/* Color Picker */}
            <Flex direction={'column'}>
              <Text weight={'medium'}>Color</Text>
              <input
                type="color"
                name="pet_color"
                value={formData.pet_color || '#000000'}
                onChange={handleChange}
              />
            </Flex>

            <Flex direction={'column'}>
              <Text weight={'medium'}>Weight (lb)</Text>
              <Text weight={'light'} size={'1'}>
                *In pounds
              </Text>
              <input
                type="number"
                name="pet_weight"
                value={formData.pet_weight}
                onChange={handleChange}
              />
            </Flex>
            <Flex direction={'column'}>
              <Text weight={'medium'}>Height (in)</Text>
              <Text weight={'light'} size={'1'}>
                *In inches
              </Text>
              <input
                type="number"
                name="pet_height"
                value={formData.pet_height}
                onChange={handleChange}
              />
            </Flex>

            <p style={{ display: fileData.length > 5 ? 'block' : 'none' }}>
              You can only upload up to 5 files
            </p>

            <Flex direction={'column'}>
              <Text weight={'medium'}>Photos</Text>
              <Text weight={'light'} size={'1'}>
                *Max. 5
              </Text>
              <Flex direction={'column'} gap={'2'}>
                {fileData.map((file, index) => (
                  <Flex key={index} direction={'row'} gap={'1'} justify={'start'} align={'center'}>
                    <Text>{file.name}</Text>
                    <IconButton value={index} onClick={handleRemoveImage}>
                      <TrashIcon style={{ pointerEvents: 'none' }} />
                    </IconButton>
                  </Flex>
                ))}
              </Flex>
            </Flex>

            <Callout.Root
              style={{ display: fileData.length >= 5 ? 'block' : 'none' }}
              color="red"
              size={'1'}
            >
              <Callout.Text>You can only upload up to 5 files</Callout.Text>
            </Callout.Root>

            <FileAttachmentButton
              fileData={fileData}
              setFileData={setFileData}
              handleChange={handleChange}
              innerText={'Upload Files'}
            ></FileAttachmentButton>

            {/* Pet name field */}
            <Flex direction={'column'}>
              <Text weight={'medium'}>Email*</Text>
              <TextField.Root
                type="email"
                name="contact_email"
                value={formData.contact_email}
                onChange={handleChange}
                required
                placeholder="Email"
              ></TextField.Root>
            </Flex>

            <Flex direction={'column'}>
              <Text weight={'medium'}>Phone Number*</Text>
              <TextField.Root
                name="contact_phone_number"
                value={formData.contact_phone_number}
                onChange={handleChange}
                required
                placeholder="Phone Number"
              ></TextField.Root>
            </Flex>

            <Flex direction={'column'}>
              <Text weight={'medium'}>Additional Details</Text>
              <TextArea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Additonal Details..."
              ></TextArea>
            </Flex>

            <Callout.Root style={{ display: message ? 'block' : 'none' }} color="red" size={'1'}>
              <Callout.Text>{message}</Callout.Text>
            </Callout.Root>

            <Button mt={'2'} onClick={handleSubmit}>
              Submit
            </Button>
          </Flex>
        </Card>
      </Container>
      <Navbar />
    </>
  );
}
