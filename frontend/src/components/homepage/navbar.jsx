import React from 'react';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button'

import LoginModal from './loginModal';

const CustomNavbar = () => {
  return (
    <Navbar expand="lg" data-bs-theme="dark" fixed='top' >
      <Container >
        <Navbar.Brand >DingleBobs inc</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto"> 
            <Nav.Link href="#link">Dashboard</Nav.Link>
          </Nav>
            <LoginModal />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomNavbar;