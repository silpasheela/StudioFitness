import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';


function TrainerProtectedRoutes() {

    const authState = useSelector((state) => {
        return state.auth?.authState;
    })

    return (
        authState?.role === 'trainer' ? <Outlet/> : <Navigate to='/login'/>
    )
}

export default TrainerProtectedRoutes