import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import RegisterModal from './RegisterModal'; // Make sure the import path is correct.
import axios from 'axios';
import { useRef } from 'react';

function LoginModal(params) {
  const [show, setShow] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(''); // State variable for error message
  const ref = useRef();

  useEffect(() => {
    if (document.cookie) {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
      if (token) {
        ref.current.innerHTML = "";
        setLoggedIn(true);
        params.handleLogIn();
      };
    }
  })

  const handleClose = () => {
    setShow(false); 
    setError(''); // Clear the error message when closing the modal
  };

  const handleShow = () => setShow(true);

  // Function to handle switching to RegisterModal
  const handleShowRegister = () => {
    setShow(false); // Close the LoginModal
    setShowRegister(true); // Show the RegisterModal
  };

  // Function to handle closing RegisterModal and switching back to LoginModal
  const handleCloseRegister = () => {
    setShowRegister(false); // Close the RegisterModal
    handleShow(); // Show the LoginModal
  };

  // Function to send a request to check account availability
  const checkAccountAvailability = async (newuser) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/availability', { newuser });
      return response.data;
    } catch (error) {
      console.error('Error checking account availability:', error);
      return { error: true };
    }
  };

  // Function to send a request to create a new account
  const createAccount = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/create', { username, password });
      return response.data;
    } catch (error) {
      console.error('Error creating account:', error);
      return { error: true };
    }
  };

  // Function to send a request to log in
  const login = async (useroremail, password) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { useroremail, password });
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      return { error: true };
    }
  };

  const handleLogin = async () => {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    if (!email || !password) {
      setError('Please provide both email and password.');
      return;
    }

    const result = await login(email, password);

    if (result.authToken) {
      setCookie(result.authToken);
      handleClose();
      ref.current.innerHTML = "logged in";
    } else {
      setError('Login failed');
    }
  };

  const setCookie = (token) => {
    const expirationDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000); // Expires in 5 days
    document.cookie = `token=${token}; expires=${expirationDate.toUTCString()}; path=/`;
  };
  
  return (
    <div ref={ref}>
      <Button variant="outline-light" onClick={handleShow}>
        Login
      </Button>

      {/* Show either LoginModal or RegisterModal based on state */}
      {showRegister ? (
        <RegisterModal
          showRegister={showRegister}
          handleCloseRegister={handleCloseRegister}
          handleShowLogin={handleShow}
        />
      ) : (
        <Modal show={show} onHide={handleClose} data-bs-theme="dark" className='modal'>
          <Modal.Header closeButton className='bg-body-tertiary border-dark'>
            <Modal.Title className='text-light-emphasis'>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body className='bg-body-tertiary text-light-emphasis'>
            <Form>
              <Form.Group>
                <Form.Label>Email address</Form.Label>
                <Form.Control id='loginEmail' type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control id='loginPassword' type="Password" placeholder="Enter password" />
              </Form.Group>
              {error && <p className="text-danger">{error}</p>} {/* Display error message */}
            </Form>
          </Modal.Body>
          <Modal.Footer className='bg-body-tertiary border-dark'>
            <Button variant="outline-secondary" onClick={handleShowRegister}>
              Register
            </Button>
            <Button variant="outline-light" onClick={handleLogin}>
              Login
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default LoginModal;