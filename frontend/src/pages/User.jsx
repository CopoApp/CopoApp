import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { getUser } from "../adapters/user-adapter";
import { logUserOut } from "../adapters/auth-adapter";
import UpdateUsernameForm from "../components/UpdateUsernameForm";

export default function UserPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const isCurrentUserProfile = currentUser && currentUser.id === Number(id);

  useEffect(() => {
    const loadUser = async () => {
      const [user, error] = await getUser(id);
      if (error) return setError(error);
      setUserProfile(user);
    };
    loadUser();
  }, [id]);

  const handleLogout = async () => {
    logUserOut();
    setCurrentUser(null);
    navigate("/");
  };

  if (error) return <p>Error loading user.</p>;
  if (!userProfile) return <p>Loading...</p>;

  const username = isCurrentUserProfile
    ? currentUser.username
    : userProfile.username;
  return (
    <>
      <h1>{username}</h1>
      <p>Welcome to your profile!</p>
      {isCurrentUserProfile && (
        <>
          <UpdateUsernameForm
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
          <button onClick={handleLogout}>Log Out</button>
        </>
      )}
    </>
  );
}
