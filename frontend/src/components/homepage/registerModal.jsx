import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function RegisterModal({ showRegister, handleCloseRegister, handleShowLogin }) {
  const [show, setShow] = useState(showRegister);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [validEmail, setValidEmail] = useState(true);

  const handleClose = () => {
    setShow(false);
    handleCloseRegister();
  };

  const handleShow = () => setShow(true);

  const handleRegister = () => {
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

    if (password === confirmPassword) {
      // Passwords match, proceed with registration
      setPasswordsMatch(true);
      setValidEmail(true);
      // Add your registration logic here
      // You can also clear the password fields or submit the form, etc.
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
          </Form.Group>

          <Form.Group>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control id='confirmPassword' type="password" placeholder="Confirm password" />
            {!passwordsMatch && <div className="text-danger">Passwords do not match</div>}
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
