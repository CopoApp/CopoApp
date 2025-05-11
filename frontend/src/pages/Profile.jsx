import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { getUser, updateUserProfile } from "../adapters/user-adapter";
import { logUserOut } from "../adapters/auth-adapter";
import Navbar from "../components/Navbar";
import "../styles/index.css";

export default function EditProfile() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const { id } = useParams();
  const isCurrentUserProfile = currentUser?.id === Number(id);

  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    about_me: "",
    profile_pic: "",
    location: "",
    location_latitude: 0,
    location_longitude: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load user profile data
  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      const [user, error] = await getUser(id);
      if (error) {
        setError(error);
      } else {
        setUserProfile(user);
      }
      setIsLoading(false);
    };
    loadUser();
  }, [id]);

  // Sync formData with userProfile when loaded
  useEffect(() => {
    if (userProfile) {
      setFormData({
        username: userProfile.username || "",
        about_me: userProfile.about_me || "",
        profile_pic: userProfile.profile_pic || "",
        location: userProfile.location || "",
        location_latitude: userProfile.location_latitude || 0,
        location_longitude: userProfile.location_longitude || 0,
      });
    }
  }, [userProfile]);

  const handleLogout = async () => {
    await logUserOut();
    setCurrentUser(null);
    navigate("/");
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file" && files?.[0]) {
      const imageUrl = URL.createObjectURL(files[0]); // TEMP: Replace with actual upload
      setFormData((prev) => ({ ...prev, profile_pic: imageUrl }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const [updatedUserProfile, updateError] = await updateUserProfile(
        id,
        formData
      );
      if (error) throw new Error(updateError);
      setUserProfile(updatedUserProfile, updateError);
      setIsEditing(false);
    } catch (err) {
      setError("Failed to save profile changes. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="profile-container">
        <p style={{ textAlign: "center" }}>Loading profile...</p>
      </div>
    );
  }

  if (error && !userProfile) {
    return (
      <div className="profile-container">
        <p className="error-message">
          Sorry, there was a problem loading the user. Please try again later.
        </p>
      </div>
    );
  }

  if (!userProfile) return null;

  return (
    <>
      <div className="profile-container">
        <h1>{userProfile.username}'s Profile</h1>

        <div className="profile-image-container">
          <img
            className="profile-image"
            src={userProfile.profile_pic || "https://via.placeholder.com/150"}
            alt="Profile"
          />
          {isCurrentUserProfile && isEditing && (
            <div className="file-input-container">
              <input
                type="file"
                id="profile-image-input"
                className="file-input"
                accept="image/*"
                onChange={handleInputChange}
              />
              <label htmlFor="profile-image-input" className="file-input-label">
                Choose new photo
              </label>
            </div>
          )}
        </div>

        <form onSubmit={handleSaveChanges}>
          <div className="form-group">
            <label className="form-label">Username</label>
            {isEditing ? (
              <input
                type="text"
                name="username"
                className="form-control"
                value={formData.username}
                onChange={handleInputChange}
              />
            ) : (
              <div className="static-text">{formData.username}</div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Bio</label>
            {isEditing ? (
              <textarea
                name="about_me"
                className="form-control"
                value={formData.about_me}
                onChange={handleInputChange}
              />
            ) : (
              <div className="static-text">
                {formData.about_me || "No bio provided yet."}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Location</label>
            {isEditing ? (
              <input
                type="text"
                name="location"
                className="form-control"
                value={formData.location}
                onChange={handleInputChange}
              />
            ) : (
              <div className="static-text">
                {formData.location || "No location specified."}
              </div>
            )}
          </div>

          {error && <div className="error-message">{error}</div>}

          {isCurrentUserProfile && (
            <div className="button-group">
              {isEditing ? (
                <>
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              )}
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          )}
        </form>
      </div>

      <Navbar />
    </>
  );
}
