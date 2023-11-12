import React from 'react'
import '../components/Shared/SharedStyles.css'
import NavBar from '../components/NavBar/NavBar'
import TrainerSideBar from '../components/TrainerSideBar/TrainerSideBar'
import TrainerAppointmentsView from '../components/TrainerView/TrainerAppointmentsView'

function TrainerAppoinmentsPage() {
    return (
        <div className='common-background'>
            <NavBar/>
            <TrainerSideBar/>
            <TrainerAppointmentsView/>
        </div>
    )
}

export default TrainerAppoinmentsPage