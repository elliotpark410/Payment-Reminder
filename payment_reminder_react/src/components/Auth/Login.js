import React, { useState } from 'react';
import { Form, Button, Alert, InputGroup } from 'react-bootstrap'; // InputGroup for custom styling
import axios from 'axios';
import { host } from '../../lib/constants';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${host}/user/login`, { username, password });
      console.log('Logged in user:', response.data);
      localStorage.setItem('token', response.data.token); // Store token for persistent login
      setError(null);
      navigate('/'); // Redirect to home page after login
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle the password visibility
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Form onSubmit={handleLogin} style={{ maxWidth: '500px', width: '100%' }}>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Enter your username"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? 'text' : 'password'} // Switch input type
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
            <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
              {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
            </Button>
          </InputGroup>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3" block>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
