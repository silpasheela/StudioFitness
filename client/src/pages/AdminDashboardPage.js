import React from 'react'
import { useSelector } from 'react-redux';
import AdminSideBar from '../components/AdminSideBar/AdminSideBar'

function AdminDashboardPage() {

  // const authState = useSelector((state) => {
  //   console.log("authState",authState)
  //   return state?.auth?.authState;
  // })

  return (
    <AdminSideBar/>
  )
}

export default AdminDashboardPage