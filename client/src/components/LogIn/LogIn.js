/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react"
import './LogIn.css'
import Form from '../Shared/Form'
import { useNavigate, useSearchParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setAuth } from "../../app/features/Auth/authSlice"
import jwt_decode from "jwt-decode";


function LogIn() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const googleToken = searchParams.get("googleToken")

    useEffect(() => {
  
      if (googleToken) {
        const decodedToken = jwt_decode(googleToken);
        const user = {...decodedToken,role:'user',token:googleToken}
        localStorage.setItem('user', JSON.stringify(user))  
        dispatch(setAuth())
        navigate("/user/dashboard")
      }
    }, [googleToken])


    return (
        <div className='loginpage'>
            <Form formType="login"></Form>
        </div>
    )
}

export default LogIn