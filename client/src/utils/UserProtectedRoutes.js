import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';


function UserProtectedRoutes() {

    const authState = useSelector((state) => {
        return state.auth?.authState;
    })

    return (
        authState?.role === 'user' ? <Outlet/> : <Navigate to='/login'/>
    )
}

export default UserProtectedRoutes