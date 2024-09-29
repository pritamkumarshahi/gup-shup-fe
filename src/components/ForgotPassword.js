import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestPasswordReset } from '../redux/actions/authActions';
import styled from 'styled-components';

const ResetContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 110px);
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

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(requestPasswordReset({ email, hostUrl: window.location.origin }));
  };

  return (
    <ResetContainer>
      <Form onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit">Request Password Reset</Button>
      </Form>
    </ResetContainer>
  );
};

export default ForgotPassword;
