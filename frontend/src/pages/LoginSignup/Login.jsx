import { useContext, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { logUserIn } from "../../adapters/auth-adapter";
import CurrentUserContext from "../../contexts/current-user-context";
import "./SignupLogin.css";

import user_icon from "../Assets/person.png";
import email_icon from "../Assets/email.png";
import password_icon from "../Assets/password.png";

export default function LoginPage() {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  // users shouldn't be able to see the login page if they are already logged in.
  // if the currentUser exists in the context, navigate the user to
  // the /users/:id page for that user, using the currentUser.id value
  if (currentUser) return <Navigate to={`/users/${currentUser.id}`} />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText("");

    const [user, error] = await logUserIn({ username, password });
    if (error) return setErrorText(error.message);

    setCurrentUser(user);
    navigate(`/users/${user.id}`);
  };

  return (
    <>
      <h1>Login Page</h1>
      <form
        onSubmit={handleSubmit}
        aria-labelledby="login-heading"
        className="loginContainer"
      >
        <div className="header">
          <h2 className="text">Log In</h2>
          <div className="underline"></div>
        </div>
        {/* <label htmlFor="username">Username</label> */}
        <div className="inputs">
          <div className="input">
            <img
              src={user_icon}
              alt="user icon"
              style={{ width: "15px", height: "auto", padding: "none" }}
              className="userIconLogin"
            />
            <input
              type="text"
              placeholder="Username"
              autoComplete="username"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          {/* 
          <label htmlFor="password">Password</label> */}

          <div className="input">
            <img
              src={password_icon}
              alt="password icon"
              style={{ width: "17px", height: "auto", padding: "none" }}
              className="passwordIconLogin"
            />
            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="submit-container">
          <div className="submit">Log in!</div>
        </div>
      </form>
      {!!errorText && <p>{errorText}</p>}
    </>
  );
}
