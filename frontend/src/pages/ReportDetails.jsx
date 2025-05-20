import {
  getPostDetails,
  getPostImages,
  updatePostDetails,
  deletePostImages,
  deletePost,
} from '../adapters/post-adapter';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/index.css';
import Navbar from '../components/Navbar';
import Comment from '../components/Comment';
import CurrentUserContext from '../contexts/current-user-context';
import CommentSection from '../components/CommentSection';
import FileAttachmentButton from '../components/FileAttachmentButton';
import ReportDetail from '../components/ReportDetail';
import {
  Container,
  Text,
  Heading,
  Flex,
  Card,
  Button,
  IconButton,
  Box,
  Strong,
} from '@radix-ui/themes';
import { TrashIcon } from '@radix-ui/react-icons';
import { AspectRatio } from '@radix-ui/themes';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const types = ['Dogs', 'Cats', 'Rabbits', 'Guinea Pigs', 'Reptiles', 'Ferrets'];

const statuses = ['Lost', 'Found', 'Searching'];

export default function ReportDetails() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [deletedImages, setDeletedImage] = useState([]);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [fileData, setFileData] = useState([]);
  const navigate = useNavigate();

  const imageCarouselSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const loadReportDetails = async () => {
      const [reportDetails, error] = await getPostDetails(id);
      if (error) return;
      setReport(reportDetails);
    };
    loadReportDetails();
  }, [id]);

  useEffect(() => {
    setFormData({
      author_user_id: report?.author_user_id || '',
      status: report?.status || '',
      title: report?.title || '',
      content: report?.content || '',
      contact_email: report?.contact_email || '',
      contact_phone_number: report?.contact_phone_number || '',
      pet_name: report?.pet_name || '',
      pet_weight: report?.pet_weight || 0,
      pet_height: report?.pet_height || 0,
      pet_type: report?.pet_type || '',
      pet_color: report?.pet_color || '',
      last_seen_location: report?.last_seen_location || '',
      last_seen_location_latitude: report?.last_seen_location_latitude || '',
      last_seen_location_longitude: report?.last_seen_location_longitude || '',
      images: report?.images || [],
    });
  }, [report]);

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    const form = new FormData();

    for (let entry in formData) form.append(entry, formData[entry]);
    fileData.forEach((file) => form.append('files', file));

    await deletePostImages(id, deletedImages);
    const [res, error] = await updatePostDetails(id, form);

    setReport(res);
    setIsEditing(false);
    setFileData([]);

    return;
  };

  const handleInput = (event) => {
    const { name, value, type, files } = event.target;

    const img = files?.[0];

    if (type === 'file' && img) {
      setFileData([...fileData, img]);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleDeleteImages = (event) => {
    event.preventDefault();
    const deleteImageId = Number(event.target.value);

    const updatedFileData = formData.images.filter((image) => {
      if (image.id !== deleteImageId) {
        return image;
      } else {
        setDeletedImage([...deletedImages, image]);
      }
    });

    setFormData({ ...formData, images: updatedFileData });
  };

  const handleRemoveLocalImage = (event) => {
    event.preventDefault();
    const removeIndex = Number(event.target.value);
    const updatedFileData = fileData.filter((value, index) => index !== removeIndex);
    setFileData(updatedFileData);
  };

  if (error) return <p>Error: {error}</p>;
  if (!report) return <p>No report found.</p>;

  const handleDeletePost = async (event) => {
    event.preventDefault();

    const [res, error] = await deletePost(id);
    if (error) return;
    setReport(res);
    setIsEditing(false);
    navigate('/reports-log');
  };

  return (
    <>
      <Container size={'2'} pb={'100px'} pt={'30px'} pl={'4'} pr={'4'}>
        <Card>
          <Flex direction={'column'} gap={'2'}>
            <Box>
              {!isEditing && <Heading size={'8'}>{report.pet_name}</Heading>}
              {!isEditing && (
                <>
                  <Text size={'3'}>
                    {<Strong>Reported By: </Strong>} {report.username}
                  </Text>
                </>
              )}
            </Box>
            {isEditing && <Text weight={'bold'}>Pet Name</Text>}

            <input
              onChange={handleInput}
              name="pet_name"
              id="pet-name"
              type="text"
              value={formData?.pet_name}
              style={{ display: isEditing ? 'block' : 'none' }}
            />

            <div className="report-images">
              <ul>
                <Slider {...imageCarouselSettings}>
                  {formData.images?.length > 0 &&
                    formData.images?.map((img, index) => {
                      return (
                        <li key={index}>
                          <Flex direction={'column'} justify={'center'} align={'center'} gap={'2'}>
                            <Flex align={'center'} justify={'center'}>
                              <img
                                src={img.img_src}
                                alt="Post image"
                                style={{ width: '100%', height: '500px' }}
                              />
                            </Flex>

                            {isEditing && (
                              <IconButton color="red" value={img.id} onClick={handleDeleteImages}>
                                <TrashIcon style={{ pointerEvents: 'none' }} />
                              </IconButton>
                            )}
                          </Flex>
                        </li>
                      );
                    })}
                </Slider>
              </ul>
              <div id="file-attachment-container" style={{ display: isEditing ? 'block' : 'none' }}>
                {fileData.map((file, index) => (
                  <li key={file.name} style={{ listStyle: 'none' }}>
                    <Flex justify={'start'} align={'center'} gap={'2'}>
                      <IconButton color="red" value={index} onClick={handleRemoveLocalImage}>
                        <TrashIcon style={{ pointerEvents: 'none' }} />
                      </IconButton>
                      <Text>{file.name}</Text>
                    </Flex>
                  </li>
                ))}
                <FileAttachmentButton
                  fileData={fileData}
                  setFileData={setFileData}
                  handleChange={handleInput}
                  innerText={'Upload Files'}
                ></FileAttachmentButton>
              </div>
            </div>

            <p style={{ display: isEditing ? 'none' : 'block' }}>
              <strong>Status:</strong> {report.status}
            </p>
            <label htmlFor="status" style={{ display: isEditing ? 'block' : 'none' }}>
              Status:{' '}
            </label>
            <select
              onChange={handleInput}
              name="status"
              id="status"
              value={formData?.status}
              style={{ display: isEditing ? 'block' : 'none' }}
              required
            >
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <p style={{ display: isEditing ? 'none' : 'block' }}>
              <strong>Pet Type:</strong> {report.pet_type}
            </p>
            <label style={{ display: isEditing ? 'block' : 'none' }}>Pet Type:</label>
            <select
              name="pet_type"
              value={formData.pet_type}
              onChange={handleInput}
              required
              style={{ display: isEditing ? 'block' : 'none' }}
            >
              <option value=""></option>
              {types.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>

            <p style={{ display: isEditing ? 'none' : 'block' }}>
              <strong>Color:</strong> {report.pet_color || 'No color specified'}
            </p>
            <label htmlFor="color" style={{ display: isEditing ? 'block' : 'none' }}>
              Color:{' '}
            </label>
            <input
              type="color"
              name="pet_color"
              id="pet-color"
              value={formData?.pet_color || '#000000'}
              onChange={handleInput}
              style={{ display: isEditing ? 'block' : 'none' }}
            />
            <p style={{ display: isEditing ? 'none' : 'block' }}>
              <strong>Weight:</strong> {report.pet_weight} lb
            </p>
            <label htmlFor="weight" style={{ display: isEditing ? 'block' : 'none' }}>
              Weight:{' '}
            </label>
            <input
              onChange={handleInput}
              name="pet_weight"
              id="weight"
              type="number"
              value={formData?.pet_weight}
              style={{ display: isEditing ? 'block' : 'none' }}
            />

            <ReportDetail
              title={'Height (in)'}
              data={report.pet_height}
              isEditing={isEditing}
              input={
                <input
                  onChange={handleInput}
                  name="pet_height"
                  id="height"
                  type="number"
                  value={formData?.pet_height}
                />
              }
            ></ReportDetail>

            <ReportDetail
              title={'Last Seen At'}
              data={report.last_seen_location}
              isEditing={isEditing}
              input={
                <input
                  onChange={handleInput}
                  name="last_seen_location"
                  id="location"
                  type="text"
                  value={formData?.last_seen_location}
                />
              }
            ></ReportDetail>

            <ReportDetail
              title={'Contact Email'}
              data={report.contact_email}
              isEditing={isEditing}
              input={
                <input
                  onChange={handleInput}
                  name="contact_email"
                  id="email"
                  type="text"
                  value={formData?.contact_email}
                />
              }
            ></ReportDetail>

            <ReportDetail
              title={'Contact Phone'}
              data={report.contact_phone_number}
              isEditing={isEditing}
              input={
                <input
                  onChange={handleInput}
                  name="contact_phone_number"
                  id="phone-number"
                  type="text"
                  value={formData?.contact_phone_number}
                />
              }
            ></ReportDetail>

            <ReportDetail
              title={'Description'}
              data={report.content}
              isEditing={isEditing}
              input={
                <input
                  onChange={handleInput}
                  name="content"
                  id="content"
                  type="text"
                  value={formData?.content}
                />
              }
            ></ReportDetail>

            {isEditing && (
              <Button type="submit" onClick={handleSaveChanges}>
                Save Changes
              </Button>
            )}

            {currentUser?.id === report?.author_user_id && (
              <Button type="button" onClick={handleEdit}>
                {isEditing ? 'Exit Editing' : 'Edit Post'}
              </Button>
            )}
            {isEditing && (
              <Button type="button" color="red" onClick={handleDeletePost}>
                Delete Post
              </Button>
            )}
          </Flex>
        </Card>
        <Heading size={'7'} mt={'2'} mb={'2'}>
          Comments
        </Heading>
        <CommentSection />
      </Container>
      <Navbar />
    </>
  );
}
