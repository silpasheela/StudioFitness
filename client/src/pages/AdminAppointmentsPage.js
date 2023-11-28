import React from 'react'
import AdminAppointmentsTable from '../components/AdminAppointments/AdminAppointmentsTable'
import AdminSideBar from '../components/AdminSideBar/AdminSideBar'

function AdminAppointmentsPage() {
  return (
    <div className='loginpage'>
        <AdminSideBar/>
        <AdminAppointmentsTable/>
    </div>
  )
}

export default AdminAppointmentsPage