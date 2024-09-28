import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signup } from '../redux/actions/authActions';
import styled from 'styled-components';

const FormContainer = styled.div`
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
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  background-color: ${({ theme }) => (theme.body === '#ffffff' ? '#ffffff' : '#222')};
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  font-size: 24px;
  color: ${({ theme }) => theme.text};
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
margin-bottom: 10px;
  padding: 15px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px; /* Added margin top for spacing */
  transition: background-color 0.3s, box-shadow 0.3s;

  &:hover {
    background-color: #0056b3;
    box-shadow: 0 4px 10px rgba(0, 123, 255, 0.2);
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const Signup = () => {
  const dispatch = useDispatch();
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup({ name, email, password }))
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <Title>Signup</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <Button type="submit">Signup</Button>
      </Form>
    </FormContainer>
  );
};

export default Signup;
