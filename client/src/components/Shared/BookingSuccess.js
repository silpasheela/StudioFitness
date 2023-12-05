import React from 'react';
import { Card, CardContent, Typography, Box, IconButton, Button } from '@mui/material';
import { CheckCircle, Brightness5 } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const successCardStyle = {

    maxWidth: 400,
    margin: 'auto',
    background: 'linear-gradient(to right, #6EC72D, #000)',
    color: 'white',
    borderRadius: 16,
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    height:'20rem'
};

const successIconStyle = {
    fontSize: 64,
    color: 'white',
};

const messageStyle = {
    marginTop: 16,
};

const headerStyle = {
    fontWeight: 'bold',
    marginBottom: 8,
};

const iconButtonStyle = {
    position: 'absolute',
    top: 8,
    right: 8,
    color: 'white',
};

function BookingSuccess() {

    const navigate = useNavigate();

    return (
        <div style={{backgroundColor:'#000', height:'100vh', paddingTop:'25vh'}}>
            <Card style={successCardStyle}>
                <CardContent>
                    <IconButton style={iconButtonStyle} size="medium" disabled>
                    <Brightness5 />
                    </IconButton>
                    <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
                    <CheckCircle style={successIconStyle} />
                    </Box>
                    <Typography variant="h5" component="div" align="center" style={headerStyle}>
                    Appointment Booked Successfully
                    </Typography>
                    <Typography variant="body1" style={messageStyle} align="center">
                    Your appointment has been successfully booked. Thank you!
                    </Typography>
                </CardContent>
            </Card>
            <Button onClick={()=> navigate('/user/dashboard')} sx={{
                    backgroundColor: '#000', 
                    marginTop:'40px',
                    border: '1px #88C13E solid',
                    color: '#88C13E', 
                    '&:hover': { backgroundColor: '#88C13E',color: '#000', }
                }}>Home</Button>
        </div>
    );
}

export default BookingSuccess;
