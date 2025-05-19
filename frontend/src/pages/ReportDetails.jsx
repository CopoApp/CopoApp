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

const breeds = ['Labrador', 'German Shepherd', 'Bulldog', 'Poodle', 'Mixed']; // example list
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
      pet_breed: report?.pet_breed || '',
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
      <div className="report-details">
        {currentUser?.id !== report?.author_user_id ? (
          <></>
        ) : (
          <button type="button" onClick={handleEdit}>
            {isEditing ? 'Exit Editing' : 'Edit Post'}
          </button>
        )}
        {isEditing ? (
          <button type="button" onClick={handleDeletePost}>
            Delete Post
          </button>
        ) : (
          <></>
        )}

        <h2 style={{ display: isEditing ? 'none' : 'block' }}>{report.pet_name}</h2>
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
            {formData.images?.length > 0 &&
              formData.images?.map((img, index) => {
                return (
                  <li key={index}>
                    <img src={img.img_src} alt="Post image" style={{ height: '100px' }} />

                    <button
                      value={img.id}
                      style={{ display: isEditing ? 'block' : 'none' }}
                      onClick={handleDeleteImages}
                    >
                      Delete Photo
                    </button>
                  </li>
                );
              })}
          </ul>
          <div id="file-attachment-container" style={{ display: isEditing ? 'block' : 'none' }}>
            {fileData.map((file, index) => (
              <li key={file.name}>
                <button value={index} onClick={handleRemoveLocalImage}>
                  Remove Image
                </button>
                {file.name}
              </li>
            ))}
            <FileAttachmentButton
              fileData={fileData}
              setFileData={setFileData}
              handleChange={handleInput}
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
          <strong>Breed:</strong> {report.pet_breed}
        </p>
        <label style={{ display: isEditing ? 'block' : 'none' }}>Breed:</label>
        <select
          name="pet_breed"
          value={formData.pet_breed}
          onChange={handleInput}
          required
          style={{ display: isEditing ? 'block' : 'none' }}
        >
          {breeds.map((b) => (
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

        <p style={{ display: isEditing ? 'none' : 'block' }}>
          <strong>Height:</strong> {report.pet_height} in
        </p>
        <label htmlFor="height" style={{ display: isEditing ? 'block' : 'none' }}>
          Height:{' '}
        </label>
        <input
          onChange={handleInput}
          name="pet_height"
          id="height"
          type="number"
          value={formData?.pet_height}
          style={{ display: isEditing ? 'block' : 'none' }}
        />

        <p style={{ display: isEditing ? 'none' : 'block' }}>
          <strong>Last Seen:</strong> {report.last_seen_location}
        </p>
        <label htmlFor="last_seen_location" style={{ display: isEditing ? 'block' : 'none' }}>
          Last Seen:{' '}
        </label>
        <input
          onChange={handleInput}
          name="last_seen_location"
          id="location"
          type="text"
          value={formData?.last_seen_location}
          style={{ display: isEditing ? 'block' : 'none' }}
        />

        <p style={{ display: isEditing ? 'none' : 'block' }}>
          <strong>Contact Email:</strong> {report.contact_email}
        </p>
        <label htmlFor="contact_email" style={{ display: isEditing ? 'block' : 'none' }}>
          Contact Email:{' '}
        </label>
        <input
          onChange={handleInput}
          name="contact_email"
          id="email"
          type="text"
          value={formData?.contact_email}
          style={{ display: isEditing ? 'block' : 'none' }}
        />

        <p style={{ display: isEditing ? 'none' : 'block' }}>
          <strong>Contact Phone:</strong> {report.contact_phone_number}
        </p>
        <label htmlFor="contact_phone_number" style={{ display: isEditing ? 'block' : 'none' }}>
          Contact Phone:{' '}
        </label>
        <input
          onChange={handleInput}
          name="contact_phone_number"
          id="phone-number"
          type="text"
          value={formData?.contact_phone_number}
          style={{ display: isEditing ? 'block' : 'none' }}
        />

        <p style={{ display: isEditing ? 'none' : 'block' }}>
          <strong>Description:</strong> {report.content}
        </p>
        <label htmlFor="content" style={{ display: isEditing ? 'block' : 'none' }}>
          Description:{' '}
        </label>
        <input
          onChange={handleInput}
          name="content"
          id="content"
          type="text"
          value={formData?.content}
          style={{ display: isEditing ? 'block' : 'none' }}
        />

        {isEditing ? (
          <>
            <button type="submit" onClick={handleSaveChanges}>
              Save Changes{' '}
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
      <CommentSection />
      <Navbar />
    </>
  );
}
