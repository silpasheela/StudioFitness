import React, {  } from 'react'
import TrainerDetailedView from '../components/TrainerView/TrainerDetailedView';
import NavBar from '../components/NavBar/NavBar';


function TrainerDetailsPage() {

    return (
        <div className='loginpage'>
            <NavBar/>
            <TrainerDetailedView/>
        </div>
    )
}

export default TrainerDetailsPage