import React from 'react'
import TrainerAddSlot from '../components/TrainerSlotManagement/TrainerAddSlot'
import TrainerViewSlot from '../components/TrainerSlotManagement/TrainerViewSlot'
import NavBar from '../components/NavBar/NavBar'
import TrainerSideBar from '../components/TrainerSideBar/TrainerSideBar'

function TrainerAddSlotPage() {
    return (
        <div style={{height:'1250px'}} className='add-slot'>
        <>
            <NavBar/>
            <TrainerSideBar/>
            <TrainerAddSlot/>
            <TrainerViewSlot/>
        </>
        </div>
    )
}

export default TrainerAddSlotPage