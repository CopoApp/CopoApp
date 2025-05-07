import { useContext, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { logUserIn } from "../adapters/auth-adapter";
import CurrentUserContext from "../contexts/current-user-context";
import { NavLink } from "react-router-dom";

import user_icon from "./assets/person.png";
import email_icon from "./assets/email.png";
import password_icon from "./assets/password.png";
import user_avatar from "./assets/userAvatar.png";

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

    const formData = new FormData(event.target);
    const email = formData.get("username");
    const password = formData.get("password");

    const [user, error] = await logUserIn({ email, password });

    // Handle Invalid email and password (404)
    if (error && error.cause === 404)
      return setErrorText(`Invalid Credentials`);

    // Handle invalid password (401)
    if (error && error.cause === 401) return setErrorText(`Incorrect Password`);

    if (error) {
      console.error(error);
      return setErrorText(error.message);
    }

    setCurrentUser(user);
    navigate(`/feed`);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        aria-labelledby="login-heading"
        className="loginContainer"
      >
        <div className="userAvatar">
          <img
            src={user_avatar}
            alt="blank profile picture"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div>

        <div className="header">
          <h2 className="text">Log In</h2>
          <div className="underline"></div>
        </div>
        {/* <label htmlFor="username">Username</label> */}
        <div className="inputs">
          <div className="input">
            <img
              src={email_icon}
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
        {!!errorText && <p>{errorText}</p>}
        <div className="submit-container">
          <button className="submit" type="submit">
            Login
          </button>
        </div>
        <div className="noAccount">
          Don't have an account?{" "}
          <span className="signupSpan">
            <NavLink to="/sign-up">Sign Up</NavLink>
          </span>
        </div>
      </form>
    </>
  );
}
