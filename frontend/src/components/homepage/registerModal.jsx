import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function RegisterModal({ showRegister, handleCloseRegister, handleShowLogin }) {
  const [show, setShow] = useState(showRegister);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [error, setError] = useState(false); // Initialize error state
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // Initialize registration success state

  const handleClose = () => {
    setShow(false);
    handleCloseRegister();
  };

  const handleShow = () => setShow(true);

  const handleRegister = async () => {
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
  
    // Regular expression for email validation 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailRegex.test(email)) {
      // Invalid email format
      setValidEmail(false);
      return;
    }
  
    if (password.length < 4) {
      // Password is too short
      setPasswordsMatch(false);
      setValidEmail(true);
      return;
    }
  
    if (password === confirmPassword) { 
      // Passwords match, proceed with registration
      setPasswordsMatch(true);
      setValidEmail(true);
  
      // Send a POST request to your Express API to register the user
      try {
        const response = await axios.post('http://localhost:3000/auth/create', {
          username: email, // Assuming email is the username
          password: password,
        });
  
        if (response.data.msg === "Account has been created") {
          // Registration successful
          // You can handle success here, e.g., display a success message or redirect the user.
          console.log('Registration successful');
          setRegistrationSuccess(true); // Set registration success state to true
  
          // Close the modal after a delay
          setTimeout(() => {
            setShow(false);
            handleCloseRegister();
          }, 1000); // 1000 milliseconds (1 second)
        } else {
          // Handle other responses as needed
          console.error('Registration failed:', response.data);
          setError(true); // Set error state to true
        }
      } catch (error) {
        // Handle any network errors
        console.error('Error registering:', error);
        setError(true); // Set error state to true
      }
    } else {
      // Passwords don't match, show an error message
      setPasswordsMatch(false);
      setValidEmail(true);
    }
  };  

  return (
    <Modal show={show} onHide={handleClose} data-bs-theme="dark" className='modal'>
      <Modal.Header closeButton className='bg-body-tertiary border-dark'>
        <Modal.Title className='text-light-emphasis'>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-body-tertiary text-light-emphasis'>
        <Form>
          <Form.Group>
            <Form.Label>Email address</Form.Label>
            <Form.Control id='registerEmail' type="email" placeholder="Enter email" />
            {!validEmail && <div className="text-danger">Invalid email format</div>}
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control id='registerPassword' type="password" placeholder="Enter password" />
            {passwordsMatch === false && <div className="text-danger">Password must be at least 4 characters long</div>}
          </Form.Group>

          <Form.Group>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control id='confirmPassword' type="password" placeholder="Confirm password" />
            {!passwordsMatch && <div className="text-danger">Passwords do not match</div>}
            {error && <div className="text-danger">Error creating an account, check if you don't already have one</div>}
            {registrationSuccess && <div className="text-success">Success</div>}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className='bg-body-tertiary border-dark'>
        <Button variant="outline-secondary" onClick={handleCloseRegister}>
          Already have an account? Login
        </Button>
        <Button variant="outline-light" onClick={handleRegister}>
          Register
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RegisterModal;
