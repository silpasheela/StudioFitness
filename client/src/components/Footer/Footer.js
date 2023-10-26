import React from 'react';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import './Footer.css';



function Footer() {
        return (
        <div style={{ marginTop: 35 }}>
        <div className="footer">
            <div className="container1">
            <div className="column">
                <h3>About Us</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod eros sed semper pharetra.</p>
            </div>
            <div className="column">
                <h3>Further Info</h3>
                <ul className="footer-links">
                <li><p>Home</p></li>
                <li><p >Services</p></li>
                <li><p>Trainers</p></li>
                </ul>
            </div>
            <div className="column">
                <h3>Contact Us</h3>
                <p>123 Main St, Anytown, USA</p>
                <p>Email: info@studiofitness.com</p>
                <p>Phone: (123) 456-7890</p>
            </div>
            </div>
    
            <div className="socialIcons">
            <IconButton aria-label="Facebook" style={{color:'#fff'}}>
                <FacebookIcon fontSize="large" />
            </IconButton>
            <IconButton aria-label="Twitter" style={{color:'#fff'}}>
                <TwitterIcon fontSize="large" />
            </IconButton>
            <IconButton aria-label="YouTube" style={{color:'#fff'}}>
                <YouTubeIcon fontSize="large" />
            </IconButton>
            <IconButton aria-label="LinkedIn" style={{color:'#fff'}}>
                <LinkedInIcon fontSize="large" />
            </IconButton>
            </div>
    
            <div className="copyRight">
            © 2023 by Silpa Sreekumar. All rights reserved.
            </div>
        </div>
        </div>
    );
}


export default Footer;

