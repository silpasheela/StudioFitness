import React from 'react'
import UserSubscription from '../components/UserSubscription/UserSubscription'
import UserSideBar from '../components/UserSideBar/UserSideBar'
import NavBar from '../components/NavBar/NavBar'
import { useSelector } from 'react-redux'
import NoActiveSubscription from '../components/Shared/NoActiveSubscription'

function UserSubscriptionPage() {

  
    const subscriptionData = useSelector((state) => {
      return state?.auth?.authState;
    })

    console.log("subsauth",subscriptionData)

    return (
    <>
    <NavBar/>
    <UserSideBar/>

    {/* <UserSubscription/> */}

    {    subscriptionData?.subscriptionDetails?.status === 'active' 
      ? <UserSubscription /> 
      : <NoActiveSubscription/>
    }
    </>
  )
}

export default UserSubscriptionPage