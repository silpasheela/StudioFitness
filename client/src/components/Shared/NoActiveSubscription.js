import { Button } from '@mui/material';
import React from 'react'
import AddCircleIcon from '@mui/icons-material/AddCircle'; // Material-UI Add Circle Icon
import { useNavigate } from 'react-router-dom';


function NoActiveSubscription() {


    const navigate = useNavigate();

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        // minHeight: '100vh',
        marginTop: '-30vh',
        width:'500px',
        marginLeft:'80vh',
        color:'#fff',
        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        backdropFilter: 'blur(12px)', 
        paddingTop:'40px',
        paddingBottom:'40px'
    };
    
    const messageStyle = {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
    };
    
    const animationStyle = {
    animation: 'fadeIn 1s ease-in',
    };

    const handleSubscribeClick = () => {
        navigate('/viewplandetails');
    };
    
    return (
        <>
            <div style={containerStyle}>
                <div style={{ ...messageStyle, ...animationStyle }}>No Active Subscription</div>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={animationStyle}
                >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12" y2="8"></line>
                </svg>
            </div>
            <Button variant="contained" 
                onClick={handleSubscribeClick}
                startIcon={<AddCircleIcon />}                 
                sx={{marginLeft:'19vh', 
                    marginTop:'20px',
                    backgroundColor: '#6EC72D', 
                    color: '#000',
                    borderRadius: "5px", 
                    '&:hover': { backgroundColor: '#6EC72D' , color: '#fff'} }}>
            Subscribe</Button>
        </>
    );
    
}

export default NoActiveSubscription