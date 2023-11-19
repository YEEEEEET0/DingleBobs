import React, { useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import LoginModal from './loginModal'; // Make sure the path to LoginModal is correct

const CustomNavbar = ({ hideTitle }) => {
  const [title, setTitle] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (hideTitle) {
      setTitle(false);
    }
  }, [hideTitle]);

  const handleLogIn = () => {
    setLoggedIn(true);
    console.log("Logged In 50");
  };

  return (
    <Navbar expand="lg" data-bs-theme="dark" fixed='top'>
      <Container>
        <Navbar.Brand>{title ? "DingleBobs inc" : ""}</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {title ? <Link to="/dashboard" className="nav-link">Dashboard</Link> : null}
          </Nav>
          <LoginModal handleLogIn={handleLogIn}/>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
