import React from 'react'
import Lottie from 'lottie-react';
import loadingAnimationData from './Animations/Animation - Loading2.json'

function Loading() {

    return (
        <div style={containerStyle}>
            <Lottie
                animationData={loadingAnimationData}
                loop={true}
                play={true}
                style={animationStyle}
            />
        </div>
    );
}

const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
};

const animationStyle = {
    width: '200px', // Adjust the width and height to fit your animation
    height: '200px',
};


export default Loading