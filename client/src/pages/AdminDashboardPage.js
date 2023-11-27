import React from 'react'
import AdminSideBar from '../components/AdminSideBar/AdminSideBar'
import AdminCharts from '../components/AdminDashboardCharts/AdminCharts'

function AdminDashboardPage() {

  // const authState = useSelector((state) => {
  //   console.log("authState",authState)
  //   return state?.auth?.authState;
  // })

  return (
    <>
      <AdminSideBar/>
      <AdminCharts/>
    </>
  )
}

export default AdminDashboardPage