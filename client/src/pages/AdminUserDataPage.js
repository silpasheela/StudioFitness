import React from 'react'
import AdminUserData from '../components/AdminUserData/AdminUserData'
import AdminSideBar from '../components/AdminSideBar/AdminSideBar'


function AdminUserDataPage() {
  return (
    <div className='loginpage'>
        <AdminSideBar/>
        <AdminUserData></AdminUserData>
    </div>
  )
}

export default AdminUserDataPage