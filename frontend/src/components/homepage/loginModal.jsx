import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import RegisterModal from './RegisterModal'; // Make sure the import path is correct.
import axios from 'axios';

function LoginModal() {
  const [show, setShow] = useState(false);
  const [showRegister, setShowRegister] = useState(false); // Track whether to show RegisterModal

  const handleClose = () => setShow(false);
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
      console.log('Please provide both email and password.');
      return;
    }
  
    const result = await login(email, password);

    const date = new Date();
    date.setTime(date.getTime() + (5 * 24 * 60 * 60 * 1000)); // Expires in 5 days
    const expires = "expires=" + date.toUTCString();
    const cookie = `token=${result.authToken};` + expires + ";path=/";
    document.cookie = cookie;
  
    if (result.msg) {
      console.log('Login successful');
      handleClose();
    } else {
      console.log('Login failed');
      // Handle the login failure, e.g., show an error message.
    }
  };

  return (
    <>
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
            </Form>
          </Modal.Body>
          <Modal.Footer className='bg-body-tertiary border-dark'>
            <Button variant="outline-secondary" onClick={handleShowRegister}>
              Register
            </Button>
            <Button variant="outline-light" onClick={handleLogin}>
              login
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default LoginModal;
