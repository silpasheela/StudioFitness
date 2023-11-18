import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { useLocation } from 'react-router-dom';



function PasswordResetEmail() {

    let location = useLocation();

    const handleNavigateToGmail = () => {
        // window.open('https://mail.google.com', '_blank');
        window.location.href = 'https://mail.google.com';
    };

    let role = location.state.role;
    let token = location.state.token;
    console.log("hey",role)
    console.log("hi",token)

    return (
        <div className='common-background' style={{height:'100vh',}}>
            <div style={{paddingTop:'30vh'}}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '20px',
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                        backdropFilter: 'blur(12px)',
                        maxWidth: '300px', 
                        margin: '0 auto',
                    }}
                >

                <EmailIcon color="primary" sx={{ fontSize: 60, color:'#fff' }} />
                <Typography
                    variant="h5"
                    sx={{
                        fontSize: '1.2rem',
                        color: '#fff',
                        textAlign: 'center',
                    }}
                >
                An email with reset instructions has been sent!
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNavigateToGmail}
                    sx={{
                        width: '100%',
                        borderRadius: '10px',
                        backgroundColor: '#6EC72D',
                        color: '#161616',
                        '&:hover': {
                        backgroundColor: '#6EC72D',
                        color: '#fff'
                        },
                    }}
                >
                Open Gmail
                </Button>
                </Box>
            </div>
        </div>
    );
}



export default PasswordResetEmail