import { useContext, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { registerUser } from "../adapters/auth-adapter";

import user_icon from "./assets/person.png";
import email_icon from "./assets/email.png";
import password_icon from "./assets/password.png";
import user_avatar from "./assets/userAvatar.png";

// Controlling the sign up form is a good idea because we want to add (eventually)
// more validation and provide real time feedback to the user about usernames and passwords
export default function SignUpPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // users shouldn't be able to see the sign up page if they are already logged in.
  // if the currentUser exists in the context, navigate the user to
  // the /users/:id page for that user, using the currentUser.id value

  // NOTE: Josue
  // Removed redirect so I can still test the sign-up page while logged in.
  // Add back if we want to block logged-in users from signing up again.

  // if (currentUser) return <Navigate to={`/users/${currentUser.id}`} />;
  // if (currentUser) return <Navigate to="/" />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText("");
    if (!username || !password)
      return setErrorText("Missing username or password");

    const formData = new FormData(event.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");

    if (!username || !email || !password)
      return setErrorText("Missing username, email or password");

    const [user, error] = await registerUser({ username, email, password });

    // Handle missing email, username or password
    if (error && error.cause === 400)
      return setErrorText(`Email, username, and password required`);

    // Handle only unique emails and usernames
    if (error && error.cause === 409)
      return setErrorText(
        `User with same email and username already exists. Please try again with a different email and username.`
      );

    if (error) {
      console.error(error);
      return setErrorText(error.message);
    }

    if (error) return setErrorText(error.message);

    setCurrentUser(user);
    navigate("/feed");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") setUsername(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="signupContainer">
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
          <h2 className="text">Create New User</h2>
          <div className="underline" />
        </div>

        <div className="inputs">
          <div className="input">
            <img src={user_icon} alt="user icon" className="userIconLogin" />
            <input
              autoComplete="off"
              type="text"
              placeholder="Username"
              id="username"
              name="username"
              onChange={handleChange}
              value={username}
              required
            />
          </div>

          <div className="input">
            <img src={email_icon} alt="email icon" className="userEmailIcon" />
            <input
              autoComplete="off"
              type="email"
              placeholder="Email"
              id="email"
              name="email"
              onChange={handleChange}
              value={email}
              required
            />
          </div>

          <div className="input">
            <img
              src={password_icon}
              alt="password icon"
              className="userPasswordIcon"
            />
            <input
              autoComplete="off"
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              onChange={handleChange}
              value={password}
              required
            />
          </div>
        </div>

        {!!errorText && <p>{errorText}</p>}

        <div className="submit-container">
          <button className="submit" type="submit">
            Sign Up Now!
          </button>
        </div>

        <div className="haveAccount">
          Already have an account with us?{" "}
          <Link to="/login" className="loginSpan">
            Log in!
          </Link>
        </div>
      </form>
    </>
  );
}
