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
<<<<<<< HEAD
    if (!username || !password)
      return setErrorText("Missing username or password");
=======

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
>>>>>>> main

    if (error) return setErrorText(error.message);

    setCurrentUser(user);
<<<<<<< HEAD
    navigate(`/users/${user.id}`);
=======
    navigate("/");
>>>>>>> main
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") setUsername(value);
<<<<<<< HEAD
=======
    if (name === "email") setEmail(value);
>>>>>>> main
    if (name === "password") setPassword(value);
  };

  return (
    <>
<<<<<<< HEAD
      <h1>Sign Up</h1>
=======
>>>>>>> main
      <form
        onSubmit={handleSubmit}
        onChange={handleChange}
        aria-labelledby="create-heading"
<<<<<<< HEAD
      >
        <h2 id="create-heading">Create New User</h2>
        <label htmlFor="username">Username</label>
        <input
          autoComplete="off"
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
          value={username}
        />

        <label htmlFor="password">Password</label>
        <input
          autoComplete="off"
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={password}
        />

        {/* In reality, we'd want a LOT more validation on signup, so add more things if you have time
        <label htmlFor="password-confirm">Password Confirm</label>
        <input autoComplete="off" type="password" id="password-confirm" name="passwordConfirm" />
      */}

        <button>Sign Up Now!</button>
      </form>
      {!!errorText && <p>{errorText}</p>}
      <p>
        Already have an account with us? <Link to="/login">Log in!</Link>
      </p>
=======
        className="signupContainer"
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
          <h2 className="text">Create New User</h2>
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
            <img
              src={email_icon}
              alt="email icon"
              style={{ width: "15px", height: "auto", padding: "none" }}
              className="userEmailIcon"
            />
            <input
              autoComplete="off"
              type="text"
              placeholder="Email"
              id="email"
              name="email"
              onChange={handleChange}
              value={email}
              required
            />
          </div>

          {/* <label htmlFor="password">Password</label> */}
          <div className="input">
            <img
              src={password_icon}
              alt="password icon"
              style={{ width: "15px", height: "auto", padding: "none" }}
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

          {/* In reality, we'd want a LOT more validation on signup, so add more things if you have time
            <label htmlFor="password-confirm">Password Confirm</label>
            <input autoComplete="off" type="password" id="password-confirm" name="passwordConfirm" />
          */}
        </div>
        {!!errorText && <p>{errorText}</p>}
        <div className="submit-container">
          <button className="submit" type="submit">
            Sign Up Now!
          </button>
        </div>
        <div className="haveAccount">
          Already have an account with us? <span className="loginSpan"></span>
          <Link to="/login">Log in!</Link>
        </div>
      </form>
>>>>>>> main
    </>
  );
}
