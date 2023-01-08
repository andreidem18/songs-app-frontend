import React, { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import GenresHandler from './GenresHandler/GenresHandler';

const NavBar = () => {

    const [ showGenres, setShowGenres ] = useState(false);

    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">Music App</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Songs</Nav.Link>
                            <Nav.Link as={Link} to="/artists">Artists</Nav.Link>
                            <Nav.Link as={Link} to="/albums">Albums</Nav.Link>
                            <Nav.Link onClick={() => setShowGenres(true)}>Genres</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <GenresHandler show={showGenres} handleClose={() => setShowGenres(false)} />
        </>
    );
};

export default NavBar;