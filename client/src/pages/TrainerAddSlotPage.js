import React from 'react'
import TrainerAddSlot from '../components/TrainerSlotManagement/TrainerAddSlot'
import TrainerViewSlot from '../components/TrainerSlotManagement/TrainerViewSlot'
import NavBar from '../components/NavBar/NavBar'
import TrainerSideBar from '../components/TrainerSideBar/TrainerSideBar'

function TrainerAddSlotPage() {
    return (
        <>
            <NavBar/>
            <TrainerSideBar/>
            <TrainerAddSlot/>
            <TrainerViewSlot/>
        </>
    )
}

export default TrainerAddSlotPage