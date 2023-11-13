import React from 'react'
import UserAppointments from '../components/UserAppointments/UserAppointments'
import NavBar from '../components/NavBar/NavBar'
import UserSideBar from '../components/UserSideBar/UserSideBar'

function UserAppointmentsPage() {
    return (
        <div className='common-background-user'>
            <NavBar/>
            <UserSideBar/>
            <UserAppointments/>
        </div>
    )
}

export default UserAppointmentsPage