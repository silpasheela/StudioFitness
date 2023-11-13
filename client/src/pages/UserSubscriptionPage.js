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
      <div className='user-subscription' style={{height:'46.2rem'}}>
        <>
          <NavBar/>
          <UserSideBar/>
          {    subscriptionData?.subscriptionDetails?.status === 'active' 
            ? <UserSubscription /> 
            : <NoActiveSubscription/>
          }
        </>
    </div>
  )
}

export default UserSubscriptionPage