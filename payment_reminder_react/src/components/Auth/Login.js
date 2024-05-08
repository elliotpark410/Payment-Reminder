import React, { useState } from 'react';
import { Form, Button, Alert, InputGroup, Col } from 'react-bootstrap';
import axios from 'axios';
import { host } from '../../lib/constants';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faMusic } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    setShowPassword(!showPassword);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <Col sm={6} md={4}>
        <h2 className="text-center mb-4">Park Vocal Studio <FontAwesomeIcon icon={faMusic} /></h2>
        <Form onSubmit={handleLogin} style={{ padding: '20px', background: 'white', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3 pb-3">
            <Form.Label className="pb-2">Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
              style={{
                paddingTop: '14px',
                paddingBottom: '14px',
                fontWeight: '500',
                fontSize: '1.2em',
                color: 'black',
               }}
            />
          </Form.Group>

          <Form.Group className="mb-3 pb-3">
            <Form.Label className="pb-2">Password</Form.Label>
            <InputGroup>
              <Form.Control
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                style={{ paddingTop: '14px',
                paddingBottom: '14px',
                fontWeight: '500',
                fontSize: '1.2em',
                color: 'black',
               }}
              />
              <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
              </Button>
            </InputGroup>
          </Form.Group>

          <div className="d-flex justify-content-center">
            <Button type="submit" variant="primary" className="btn-lg" style={{ paddingLeft: '30px', paddingRight: '30px' }}>
              Login
            </Button>
          </div>
        </Form>
      </Col>
    </div>
  );
};

export default Login;
