import React from 'react'
import UserSubscription from '../components/UserSubscription/UserSubscription'
import UserSideBar from '../components/UserSideBar/UserSideBar'
import NavBar from '../components/NavBar/NavBar'

function UserSubscriptionPage() {
  return (
    <>
    <NavBar/>
    <UserSideBar/>
    <UserSubscription/>
    </>
  )
}

export default UserSubscriptionPage