import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { login } from '../redux/actions/authActions';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  width: 100%;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => (theme.body === '#ffffff' ? '#f9f9f9' : '#333')};
`;

const Input = styled.input`
  padding: 12px;
  margin: 10px 0;
  border: 1px solid ${({ theme }) => (theme.body === '#ffffff' ? '#ccc' : '#555')};
  border-radius: 5px;
  font-size: 16px;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => (theme.body === '#ffffff' ? '#fff' : '#444')};

  &:focus {
    border-color: ${({ theme }) => (theme.body === '#ffffff' ? '#007BFF' : '#80b3ff')};
    outline: none;
  }
`;

const Button = styled.button`
  padding: 12px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const RememberContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;

  label {
    font-size: 14px;
    color: ${({ theme }) => theme.text};
  }
`;

const Checkbox = styled.input`
  margin-right: 5px;
`;

const TextLink = styled(Link)`
  color: ${({ theme }) => (theme.body === '#ffffff' ? '#007BFF' : '#80b3ff')};
  text-decoration: none;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

const Footer = styled.div`
  margin-top: 20px;
  font-size: 14px;
  text-align: center;

  a {
    color: ${({ theme }) => (theme.body === '#ffffff' ? '#007BFF' : '#80b3ff')};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password, keepSignedIn }, navigate));
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h2>Login to GupShup</h2>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <RememberContainer>
          <label>
            <Checkbox
              type="checkbox"
              checked={keepSignedIn}
              onChange={(e) => setKeepSignedIn(e.target.checked)}
            />
            Keep me signed in
          </label>
          <TextLink to="/forgot-password">Forgot Password?</TextLink>
        </RememberContainer>

        <Button type="submit">Login</Button>

        <Footer>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </Footer>
      </Form>
    </Container>
  );
};

export default Login;
