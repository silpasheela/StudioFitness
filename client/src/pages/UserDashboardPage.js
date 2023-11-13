import React from 'react'
import NavBar from '../components/NavBar/NavBar'
import UserSideBar from '../components/UserSideBar/UserSideBar'

function UserDashboardPage() {

  return (

    <div className='user-dashboard' style={{height:'46.2rem'}}>
      <>
        <NavBar/>
        <UserSideBar/>
      </>
    </div>
  )
}

export default UserDashboardPage