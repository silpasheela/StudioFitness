import React from 'react'
import Lottie from 'lottie-react';
import animationData from './Animations/Animation - 1698907920382.json'



function NoTrainerAvailable() {
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
};

const messageStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
    marginTop:'8px'
};

const animationStyle = {
    width: '300px', // Adjust the width and height to fit your animation
    height: '300px',
};

export default NoTrainerAvailable