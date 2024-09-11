import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import {AiFillProfile, AiOutlineWoman} from "react-icons/ai";
import nailslogo from '../images/nailslogo.png';

const Navigation = () => {

    const token = sessionStorage.getItem('token');
    const user = token ? JSON.parse(sessionStorage.getItem('user')) : null;
    const isAdmin = user ? user.role === 'admin' : false;

    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary navigation">
                <Container>
                    <Navbar.Brand href="#"><img src={nailslogo} width="170px" height="140px" alt="Ana nails" /> </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Pocetna</Nav.Link>
                            <Nav.Link href="/about">O nama</Nav.Link>
                            <Nav.Link href="/products">Preporuceni Proizvodi</Nav.Link>
                            <Nav.Link href="/services">Usluge</Nav.Link>

                            {
                                token ?
                                    <>
                                        <Nav.Link href="/reservations">Rezervisi</Nav.Link>
                                    </>
                                    :
                                    <Nav.Link href="/login">Login</Nav.Link>
                            }

                            {
                                isAdmin ?
                                    <Nav.Link href="/admin">Admin</Nav.Link>
                                    : null
                            }

                            {
                                token ?
                                    <>
                                        <Nav.Link href="#" onClick={
                                            () => {
                                                sessionStorage.removeItem('token');
                                                sessionStorage.removeItem('user');
                                                window.location = '/';
                                            }
                                        }>Logout</Nav.Link>
                                    </>
                                    :
                                    null
                            }

                        </Nav>
                        {
                            user && <>
                                <Nav>
                                    <Nav.Link href="#"><AiFillProfile size={30}/> Dobrodosli, {user.name}</Nav.Link>
                                </Nav>
                            </>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Navigation;