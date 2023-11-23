import React from 'react'
import Lottie from 'lottie-react';
import animationData from './Animations/Animation - 1700741587662.json'

function NoAppointmentsFound() {
    return (
        <div style={containerStyle}>
            <Lottie
            animationData={animationData}
            loop={true}
            play={true}
            style={animationStyle}
            />
            <p style={messageStyle}>No Trainers Available</p>
        </div>
    );
}


const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // minHeight: '100vh',
};

const messageStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
    marginTop:'8px'
};

const animationStyle = {
    width: '500px', // Adjust the width and height to fit your animation
    height: '500px',
};


export default NoAppointmentsFound