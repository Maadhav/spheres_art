import React from 'react'
import Logo from '../logo/Logo';
import EmailInput from './EmailInput';
import './Footer.css';
import { FaDiscord, FaInstagram, FaTwitter, FaTelegramPlane} from 'react-icons/fa'

const Footer = () => {
    return (
        <div>
            <div className="footer-container">
                <div style={{flex: 0.5}}>
                    <Logo/>
                    <div className="latest-news">Get the Latest Updates</div>
                    <EmailInput/>
                </div>
                <div style={{flex: 0.34,}}>
                <h3>Sphere.ART</h3>
                <div style={{marginTop: "20px"}}>
                <div className="footer-text">Explore</div>
                <div className="footer-text">How it Works</div>
                <div className="footer-text">Contact Us</div>
                </div>
                </div>
                <div style={{flex: 0.16,}}>
                <h3>Support</h3>
                <div style={{marginTop: "20px"}}>
                <div className="footer-text">Help Center</div>
                <div className="footer-text">Terms of service</div>
                <div className="footer-text">Legal</div>
                <div className="footer-text">Privacy Policy</div>
                </div>
                </div>
            </div>
            <div className="copyright-container">
                <div className="copyright-text">Sphere.ART, Inc. All Rights Reserved</div>
                <FaInstagram className="footer-icon"/>
                <FaTwitter className="footer-icon"/>
                <FaTelegramPlane className="footer-icon"/>
                <FaDiscord className="footer-icon"/>
            </div>
        </div>
    )
}

export default Footer
