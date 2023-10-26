import React from 'react'
import AdminTrainerData from '../components/AdminTrainerData/AdminTrainerData'
import AdminSideBar from '../components/AdminSideBar/AdminSideBar'


function AdminTrainerDataPage() {
  return (
    <div className='loginpage'>
        <AdminSideBar/>
        <AdminTrainerData></AdminTrainerData>
    </div>
  )
}

export default AdminTrainerDataPage