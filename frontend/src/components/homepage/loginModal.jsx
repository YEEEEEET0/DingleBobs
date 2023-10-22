import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import RegisterModal from './registerModal';

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
            <Button variant="outline-light" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default LoginModal;
