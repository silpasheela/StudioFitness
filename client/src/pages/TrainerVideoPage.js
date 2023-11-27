import React from 'react'
import TrainerVideoUpload from '../components/TrainerVideoUpload/TrainerVideoUpload'
import NavBar from '../components/NavBar/NavBar'

function TrainerVideoPage() {
    return (
        <div className='video-page'>
        <NavBar/>
        <TrainerVideoUpload/>
        </div>
    )
}

export default TrainerVideoPage