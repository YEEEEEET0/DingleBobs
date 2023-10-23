import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import LoginModal from './loginModal'; // Make sure the path to LoginModal is correct

const CustomNavbar = ({ hideTitle }) => {
  const [title, setTitle] = useState(true);

  useEffect(() => {
    if (hideTitle) {
      setTitle(false);
    }
  }, [hideTitle]);

  return (
    <Navbar expand="lg" data-bs-theme="dark" fixed='top'>
      <Container>
        <Navbar.Brand>{title ? "DingleBobs inc" : ""}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          {title ? <Nav.Link href="#link">Dashboard</Nav.Link> : null}
          </Nav>
          <LoginModal />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
