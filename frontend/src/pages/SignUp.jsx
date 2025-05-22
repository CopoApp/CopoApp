import { useContext, useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import CurrentUserContext from '../contexts/current-user-context';
import { registerUser } from '../adapters/auth-adapter';
import { NavLink } from 'react-router-dom';
import { Card, TextField, Text, Heading, Button, Flex, Callout } from '@radix-ui/themes';

import * as yup from 'yup';

// schema for yup validation
const schema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
});

// Controlling the sign up form is a good idea because we want to add (eventually)
// more validation and provide real time feedback to the user about usernames and passwords
export default function SignUpPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // users shouldn't be able to see the sign up page if they are already logged in.
  // if the currentUser exists in the context, navigate the user to
  // the /users/:id page for that user, using the currentUser.id value
  if (currentUser) return <Navigate to={`/users/${currentUser.id}`} />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText('');

    // Input Validation Checks
    try {
      await schema.validate({ email, password });
    } catch (error) {
      const { message } = error;
      return setErrorText(message);
    }

    // Handle missing email, username or password
    if (!username || !email || !password)
      return setErrorText('Missing username, email or password');

    const [user, error] = await registerUser({ username, email, password });

    if (error && error.cause === 400)
      return setErrorText(
        `There is currently an ongoing session please log out or clear cookies first.`
      );

    // Handle only unique emails and usernames
    if (error && error.cause === 409)
      return setErrorText(
        `User with same email or username already exists. Please try again with a different email and username.`
      );

    if (error) {
      return setErrorText(error.message);
    }

    if (error) return setErrorText(error.message);

    setCurrentUser(user);
    navigate('/feed');
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'username') setUsername(value);
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
  };

  return (
    <>
      <Flex justify="center" align="center" height="100vh">
        <Card>
          <Flex direction="column" gap="3" width="300px">
            <Heading>Sign Up</Heading>
            <TextField.Root
              type="text"
              autoComplete="username"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            ></TextField.Root>
            <TextField.Root
              type="text"
              autoComplete="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            ></TextField.Root>
            <TextField.Root
              type="password"
              autoComplete="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            ></TextField.Root>
            {errorText && (
              <Callout.Root color="red" size="1">
                <Callout.Text>{errorText}</Callout.Text>
              </Callout.Root>
            )}
            <Flex justify="end" gap="5">
              <Button onClick={handleSubmit}>Sign Up</Button>
            </Flex>
          </Flex>
          <Flex align="center" direction="column" gap="3" pt="2">
            <Text>Already have an account?</Text>
            <NavLink to="/login">
              <Button variant="soft">Log In</Button>
            </NavLink>
          </Flex>
        </Card>
      </Flex>
    </>
  );
}
