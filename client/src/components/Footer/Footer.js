import React from 'react';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import './Footer.css';



function Footer() {
        return (
        <>
        <div style={{ marginTop: 50 }}>
        <div className="footer">
            <div className="container1">
            <div className="column">
                <h2>About Us</h2>
                <p style={{color:'#9F9F9F'}}>StudioFitness is one of Europe's largest specialist fitness retailers. We are proud to offer our customers the best selection of fitness equipment on the planet at the very best price and with the best service.</p>
            </div>
            <div className="column">
                <h2>Further Info</h2>
                <ul className="footer-links">
                <li><p style={{color:'#9F9F9F'}}>Home</p></li>
                <li><p style={{color:'#9F9F9F'}}>Services</p></li>
                <li><p style={{color:'#9F9F9F'}}>Trainers</p></li>
                </ul>
            </div>
            <div className="column">
                <h2>Contact Us</h2>
                <p style={{color:'#9F9F9F'}}>123 Main Street, Anytown, USA</p>
                <p style={{color:'#9F9F9F'}}>Email: info@studiofitness.com</p>
                <p style={{color:'#9F9F9F'}}>Phone: (123) 456-7890</p>
            </div>

            <div style={{marginRight:'-10vh',marginTop:'13vh'}}>
                <input type="text" className="submitform" placeholder="Enter your email address"/>
                <span className="input-group-btn">
                    <button className="default-submit-btn" type="button">SUBSCRIBE</button>
                </span>
            </div>

            </div>
    
            <div className="socialIcons" style={{}}>
            <IconButton fontSize='small' aria-label="Facebook" style={{color:'#3A559F',backgroundColor: '#fff',}}>
                <FacebookIcon  />
            </IconButton>
            <IconButton fontSize='small'aria-label="YouTube" style={{color:'#F70000',backgroundColor: '#fff',}}>
                <YouTubeIcon  />
            </IconButton>
            <IconButton fontSize='small'aria-label="Twitter" style={{color:'#03A9F4',backgroundColor: '#fff',}}>
                <TwitterIcon />
            </IconButton>
            <IconButton fontSize='small'aria-label="Instagram" style={{color:'#e95950',backgroundColor: '#fff',}}>
                <InstagramIcon  />
            </IconButton>
            <IconButton fontSize='small'aria-label="LinkedIn" style={{color:'#0077B7',backgroundColor: '#fff',}}>
                <LinkedInIcon  />
            </IconButton>
            </div>

    
            <div className="copyRight" style={{color:'#9F9F9F', fontSize:'12px'}}>
            ©2023 by Silpa Sreekumar. All rights reserved.
            </div>
        </div>
        </div>
        </>
    );
}


export default Footer;

