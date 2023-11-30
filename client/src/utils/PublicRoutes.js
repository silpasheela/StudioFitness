import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';



function PublicRoutes() {

    const authState = useSelector((state) => {
        return state.auth?.authState;
    })

    let redirect;

    if (authState?.role === 'trainer') {

        if (authState?.service) {
            redirect = '/trainer/dashboard';
        } else {
            redirect = '/trainer/editprofile';
        }
    } else if (authState?.role === 'user') {

        if (authState?.dateOfBirth) {
            redirect = '/user/dashboard';
        } else {
            redirect = '/user/editprofile';
        }

    } else {
        redirect = '/admin/dashboard';
    }
    
    return (
        !authState ? <Outlet /> : <Navigate to={redirect} />
    )

}

export default PublicRoutes