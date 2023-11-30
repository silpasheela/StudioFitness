import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';


function AdminProtectedRoutes() {

    const authState = useSelector((state) => {
        return state.auth?.authState;
    })

    console.log(authState)
    
    return (
        authState?.role === 'admin' ? <Outlet/> : <Navigate to='/admin/login'/>
    )
}

export default AdminProtectedRoutes