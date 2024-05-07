// Register.js
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { host } from '../../lib/constants';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${host}/user/register`, { username, password });
      console.log('Added user:', response.data);
      setSuccess(true); // Registration successful
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      setSuccess(false);
    }
  };

  return (
    <Form onSubmit={handleRegister}>
      {success && <Alert variant="success">Registration successful!</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit">Register</Button>
    </Form>
  );
};

export default Register;
