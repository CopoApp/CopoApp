import { useContext, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { logUserIn } from '../adapters/auth-adapter';
import CurrentUserContext from '../contexts/current-user-context';
import { NavLink } from 'react-router-dom';

import { Card } from '@radix-ui/themes';
import { Header } from '@radix-ui/themes/components/table';
import { TextField } from '@radix-ui/themes';
import { Button } from '@radix-ui/themes';
import { Flex } from '@radix-ui/themes';
import { Callout } from '@radix-ui/themes';

import * as yup from 'yup';

// schema for yup validation
const schema = yup.object().shape({
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required'),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const [errorText, setErrorText] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  // users shouldn't be able to see the login page if they are already logged in.
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

    if (email.length === 0 || password.length === 0)
      return setErrorText(`Username and password required`);

    const [user, error] = await logUserIn({ email, password });

    // Handle Invalid email and password (404)
    if (error && error.cause === 404) return setErrorText(`Invalid Credentials`);

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
      <Flex justify="center" align="center" height="100vh">
        <Card>
          <Flex direction="column" gap="3" width="300px">
            <Header>Sign in</Header>
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
              <NavLink to="/sign-up">
                <Button variant="soft">Create Account</Button>
              </NavLink>
              <Button onClick={handleSubmit}>Sign in</Button>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </>
  );
}
