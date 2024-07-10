import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, InputGroup, Col } from 'react-bootstrap';
import { api } from '../../lib/constants';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import logo from '../../images/logo.png';
import { website } from '../../lib/constants';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../App.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError(null);
      }, 7000); // Clear the error after 7 seconds

      return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
    }
  }, [error]);

  const openWebsite = () => {
    window.open(`${website}`, '_blank'); // Open link in a new tab
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(`/user/login`, {
        username,
        password
      });
      // console.log('Logged in user:', response.data);
      localStorage.setItem('token', response.data.token); // Store token for persistent login
      toast.success('Successfully logged in', {
        position: 'top-left',
        autoClose: 3000 // Close after 3 seconds
      });
      setError(null);
      navigate('/'); // Redirect to home page after login
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      toast.error('Login failed');
      return;
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="background-style background-login">
      <Col sm={6} md={4}>
        <div className="horizontally-center">
          <a
            href="Park Vocal Studio website"
            target="_blank"
            rel="noopener noreferrer"
            onClick={openWebsite}
          >
            <img src={logo} alt="Park Vocal Studio logo" className="logo-login" />
          </a>
        </div>
        <Form
          onSubmit={handleLogin}
          style={{
            padding: '20px',
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}
        >
          {error && <Alert variant="danger">{error}</Alert>}

          <Form.Group className="mb-3 pb-3">
            <Form.Label className="pb-2">Username</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input-field"
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
                className="input-field"
              />
              <Button variant="outline-secondary" onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </Button>
            </InputGroup>
          </Form.Group>

          <div className="d-flex justify-content-center">
            <Button
              type="submit"
              variant="primary"
              className="btn-lg"
              style={{ paddingLeft: '30px', paddingRight: '30px' }}
            >
              Login
            </Button>
          </div>
        </Form>
      </Col>
    </div>
  );
};

export default Login;
