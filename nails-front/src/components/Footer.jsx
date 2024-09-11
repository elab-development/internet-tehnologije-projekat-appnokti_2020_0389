import React from 'react';
import {FaFacebook, FaHeart, FaInstagram, FaLinkedin} from "react-icons/fa";

const Footer = () => {
    return (
        <>
            <div className="footer_section">
                <div className="container">
                    <div className="footer_sectio_2">
                        <div className="row">
                            <div className="col-lg-4 col-md-4">
                                <h2 className="useful_text">Quick Links</h2>
                                <div className="footer_menu">
                                    <ul>
                                        <li><a href="/">Pocetna</a></li>
                                        <li><a href="/about">O nama</a></li>
                                        <li><a href="/services">Usluge</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-4">
                                <h2 className="useful_text">Informacije</h2>
                                <p className="footer_text">Sve informacije o nama mozete naci na sajtu, i iskreno se nadamo da ce vas nasa usluga oduseviti</p>
                            </div>
                            <div className="col-lg-4 col-md-4">
                                <h2 className="useful_text">Drustvene mreze</h2>
                                <div className="social_icon">
                                    <ul>
                                        <li><a href="#"><FaFacebook/></a></li>
                                        <li><a href="#"><FaInstagram/></a></li>
                                        <li><a href="#"><FaLinkedin/></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="copyright_section">
                <div className="container">
                    <p className="copyright_text">2024 All Rights Reserved. Design by <FaHeart/> Ana <FaHeart /></p>
                </div>
            </div>
        </>
    );
};

export default Footer;