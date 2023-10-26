import React, { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setAuth } from "../app/features/Auth/authSlice"
import Demos from '../components/demo/Demos'
import jwt_decode from "jwt-decode";


function DemoModel() {

  // const navigate = useNavigate()
  // const dispatch = useDispatch()
  // const [searchParams] = useSearchParams()
  // const googleToken = searchParams.get("googleToken")
  // const decodedToken = jwt_decode(googleToken);
  // console.log(decodedToken);


  // useEffect(() => {
  //   console.log(googleToken)

  //   if (googleToken) {
  //     const user = {...decodedToken,token:googleToken}
  //     console.log(user)
  //     localStorage.setItem('user', JSON.stringify(user))

  //     // localStorage.setItem('user',JSON.stringify(data?.user));

  //     dispatch(setAuth())
  //     navigate("/user/dashboard")
  //   }
  // }, [googleToken])

  return (
    <Demos/>
  )
}

export default DemoModel