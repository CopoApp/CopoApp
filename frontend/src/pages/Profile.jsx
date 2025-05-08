import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { getUser } from "../adapters/user-adapter";
import { logUserOut } from "../adapters/auth-adapter";
// import { UpdateUsernameForm } from "../components/UpdateUsernameForm";
import Navbar from "../components/Navbar";
import { updateUserProfile } from "../adapters/user-adapter";


export default function UserPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const isCurrentUserProfile = currentUser && currentUser.id === Number(id);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    about_me: "",
    profile_pic: "",
    location: "",
    location_latitude: 0,
    location_longitude: 0,
    saved_pets_count: 0,
    created_at: "",
    updated_at: ""
  })

  useEffect(() => {
    const loadUser = async () => {
      const [user, error] = await getUser(id);
      if (error) return setError(error);
      setUserProfile(user);
    };

    loadUser();
  }, [id]);

  useEffect(() => {
    if (userProfile) {
      setFormData({
        username: userProfile.username || "",
        email: userProfile.email || "",
        about_me: userProfile.about_me || "",
        profile_pic: userProfile.profile_pic || "",
        location: userProfile.location || "",
        location_latitude: userProfile.location_latitude || 0,
        location_longitude: userProfile.location_longitude || 0,
        saved_pets_count: userProfile.saved_pets_count || 0,
        created_at: userProfile.created_at || "",
        updated_at: userProfile.updated_at || ""
      });
    }
  }, [userProfile]);
  

  const handleLogout = async () => {
    logUserOut();
    setCurrentUser(null);
    navigate("/");
  };

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      // To do - Send image file to the firebase
    } else {
      setFormData({ ...formData, [name]: value})
    }
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // TEMP: Replace with actual upload
      setFormData((prev) => ({
        ...prev,
        profile_pic: imageUrl,
      }));
    }
  };

  const handleSaveChanges = async (event) => {
    event.preventDefault();
    try {
      const [userProfile, error] = await updateUserProfile(id, formData)
      console.log(`User Id - ${userProfile.id} updated successfully`)
    } catch (error) {
      console.error(error);
      setError("Failed to save profile changes. Please try again.")
    }
  };

  if (error)
    return (
      <p>Sorry, there was a problem loading the user. Please try again later.</p>
    );

  if (!userProfile) return null;

  return (
    <>
      <div className="profile-container" style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
        <h1>{userProfile.username}'s Profile</h1>

        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <img
            src={userProfile.profile_pic || "https://via.placeholder.com/150"}
            alt="Profile"
            style={{ width: 150, height: 150, borderRadius: "50%", objectFit: "cover" }}
          />
          {isCurrentUserProfile && (
            <div>
              <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
            </div>
          )}
        </div>

        <div className="profile-fields">
          <div style={{ marginBottom: "1rem" }}>
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isCurrentUserProfile}
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>Bio:</label>
            <textarea
              name="about_me"
              value={formData.about_me || ""}
              onChange={handleInputChange}
              disabled={!isCurrentUserProfile}
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location || ""}
              onChange={handleInputChange}
              disabled={!isCurrentUserProfile}
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>
        </div>

        {isCurrentUserProfile && (
          <>
            {/* <UpdateUsernameForm
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            /> */}
            <button onClick={handleSaveChanges} >
              Save Changes
            </button>
            <button onClick={handleLogout}>Log Out</button>
          </>
        )}
      </div>
      <Navbar />
    </>
  );
}
