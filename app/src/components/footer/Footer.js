import React from 'react'
import Logo from '../logo/Logo';
import EmailInput from './EmailInput';
import './Footer.css';
import { FaDiscord, FaInstagram, FaTwitter, FaTelegramPlane } from 'react-icons/fa'
import { Link, NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <div>
            <div className="footer-container">
                <div style={{ flex: 0.5 }}>
                    <Logo />
                    <div className="latest-news">Get the Latest Updates</div>
                    <EmailInput />
                </div>
                <div style={{ flex: 0.34, }}>
                    <h3>Sphere.ART</h3>
                    <div style={{ marginTop: "20px" }}>
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <div className="footer-text">Explore</div>
                        </Link>
                        <Link to="/howitwork" style={{ textDecoration: "none" }}>
                            <div className="footer-text">How it Works</div>
                        </Link>
                        <Link to='/contactus' style={{ textDecoration: 'none' }}>
                            <div className="footer-text">Contact Us</div>
                        </Link>
                    </div>
                </div>
                <div style={{ flex: 0.16, }}>
                    <h3>Support</h3>
                    <div style={{ marginTop: "20px" }}>
                        <div className="footer-text">Help Center</div>
                        <Link to='/tos' style={{ textDecoration: 'none' }}>
                            <div className="footer-text">Terms of service</div>
                        </Link>
                        {/* <div className="footer-text">Legal</div> */}
                        <Link to='/privacy' style={{ textDecoration: 'none' }}>
                            <div className="footer-text">Privacy Policy</div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="copyright-container">
                <div className="copyright-text">CodeDecoders™, All Rights Reserved</div>
                <a href='https://www.instagram.com/sphereart_nft' target={'_blank'}><FaInstagram className="footer-icon" /></a>
                <a href='https://twitter.com/SphereART_NFT' target={'_blank'}><FaTwitter className="footer-icon" /></a>
                <a href='https://t.me/SphereART_NFT' target={'_blank'}><FaTelegramPlane className="footer-icon" /></a>
                <a href='https://discord.gg/JGhTFqcx3T' target={'_blank'}><FaDiscord className="footer-icon" /></a>
            </div>
        </div>
    )
}

export default Footer
