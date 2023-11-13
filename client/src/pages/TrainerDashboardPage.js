import React from 'react'
import NavBar from '../components/NavBar/NavBar'
import TrainerSideBar from '../components/TrainerSideBar/TrainerSideBar'

function TrainerDashboardPage() {
  return (
    <div className='dashboard' style={{height:'46.2rem'}}>
      <>
      <NavBar/>
      <TrainerSideBar/>
      </>
    </div>
  )
}

export default TrainerDashboardPage