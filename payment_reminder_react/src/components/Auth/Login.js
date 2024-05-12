import React, { useState } from 'react';
import { Form, Button, Alert, InputGroup, Col } from 'react-bootstrap';
import axios from 'axios';
import { host } from '../../lib/constants';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import backgroundImg from '../../images/background.jpg';
import musicNotesIcon from '../../images/musicNotes.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImg})`, // Background image
    backgroundSize: 'cover', // Ensures the image covers the entire background
    backgroundPosition: 'center', // Centers the image
    backgroundRepeat: 'no-repeat', // Prevents repeating
    height: '100vh', // Full viewport height
    display: 'flex', // Ensures centering works
    justifyContent: 'center', // Center content horizontally
    alignItems: 'center', // Center content vertically
  };

  const headerStyle = {
    fontSize: '3.0rem', // Large font size
    fontWeight: 'bold',
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', // Subtle shadow for depth
    transition: 'transform 0.3s ease', // Smooth transition for hover effect
  };

  const iconStyle = {
    height: '3.0rem', // Set height to match font size of the header
    marginLeft: '10px', // Add some space between the header text and the icon
  };

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
    <div style={backgroundStyle}>
      <Col sm={6} md={4}>
        <h2 className="text-center mb-4" style={headerStyle}>Park Vocal Studio
        <img src={musicNotesIcon} alt="musical note icon" style={iconStyle} />
        </h2>
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
