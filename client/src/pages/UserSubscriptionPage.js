import React from "react";
import UserSubscription from "../components/UserSubscription/UserSubscription";
import UserSideBar from "../components/UserSideBar/UserSideBar";
import NavBar from "../components/NavBar/NavBar";
import { useSelector } from "react-redux";
import NoActiveSubscription from "../components/Shared/NoActiveSubscription";
import { Box } from "@mui/material";

function UserSubscriptionPage() {
  const subscriptionData = useSelector((state) => {
    return state?.auth?.authState;
  });

  console.log("hey",subscriptionData);

  return (
    <div className="user-subscription" style={{}}>
      <>
        <NavBar />

        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xl: "row",
              lg: "row",
              md: "row",
              sm: "column",
              xs: "column",
            },
          }}>
          <UserSideBar />
          {subscriptionData?.subscriptionDetails?.status === "active" ? (
            <UserSubscription />
          ) : (
            <NoActiveSubscription />
          )}
        </Box>
      </>
    </div>
  );
}

export default UserSubscriptionPage;
