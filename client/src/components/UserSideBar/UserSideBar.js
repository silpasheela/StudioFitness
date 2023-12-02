import React from "react";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import EventIcon from "@mui/icons-material/Event";
import ChatIcon from "@mui/icons-material/Chat";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function UserSideBar() {
    const navigate = useNavigate();

    const authState = useSelector((state) => {
        return state.auth.authState;
    });

    return (
        <Stack
        direction="row"
        spacing={4}
        sx={{
            width: { xl: "10vw", lg: "10vw", md: "10vw", sm: "10vh", xs: "100%" },
            height: "350px",
            paddingLeft: "0",
            paddingTop: {
            xl: "16.55vh",
            lg: "16.55vh",
            md: "8vh",
            sm: "8vh",
            xs: "8vh",
            },
        }}>
        <Paper
            sx={{
            background: "black",
            color: "#fff",
            borderRadius: "0",
            }}>
            <MenuList
            sx={{
                minWidth: {
                xl: "25vw",
                lg: "25vw",
                md: "25vw",
                sm: "100%",
                xs: "100%",
                },
                paddingTop: "4.5vh",
            }}>
            <MenuItem
                onClick={() => navigate("/user/editprofile")}
                sx={{
                fontSize: "25px",
                fontWeight: "bolder",
                fontFamily: "inherit",
                color: "#88C13E",
                borderBottom: "1px solid #555",
                "&:hover": {
                    backgroundColor: "#333",
                },
                }}>
                <ManageAccountsIcon
                fontSize="large"
                sx={{ paddingRight: "20px", color: "#fff" }}
                />
                Account Settings
            </MenuItem>
            <MenuItem
                onClick={() => navigate("/user/subscription-details")}
                sx={{
                fontSize: "25px",
                fontWeight: "bolder",
                fontFamily: "inherit",
                color: "#88C13E",
                borderBottom: "1px solid #555",
                "&:hover": {
                    backgroundColor: "#333",
                },
                }}>
                <SubscriptionsIcon
                fontSize="large"
                sx={{ paddingRight: "20px", color: "#fff" }}
                />{" "}
                My Subscriptions
            </MenuItem>

            {authState?.subscriptionDetails &&
                authState?.subscriptionDetails?.status === "active" &&
                authState?.subscriptionDetails?.planId ===
                process.env.REACT_APP_PREMIUM_ID && (
                <MenuItem
                    onClick={() => navigate("/user/viewtrainers")}
                    sx={{
                    fontSize: "25px",
                    fontWeight: "bolder",
                    fontFamily: "inherit",
                    color: "#88C13E",
                    borderBottom: "1px solid #555",
                    "&:hover": {
                        backgroundColor: "#333",
                    },
                    }}>
                    <PersonAddIcon
                    fontSize="large"
                    sx={{ paddingRight: "20px", color: "#fff" }}
                    />{" "}
                    Book My Trainer
                </MenuItem>
                )}

            {authState?.subscriptionDetails &&
                authState?.subscriptionDetails?.status === "active" &&
                authState?.subscriptionDetails?.planId ===
                process.env.REACT_APP_PREMIUM_ID && (
                <MenuItem
                    onClick={() => navigate("/user/view-appointments")}
                    sx={{
                    fontSize: "25px",
                    fontWeight: "bolder",
                    fontFamily: "inherit",
                    color: "#88C13E",
                    borderBottom: "1px solid #555",
                    "&:hover": {
                        backgroundColor: "#333",
                    },
                    }}>
                    <EventIcon
                    fontSize="large"
                    sx={{ paddingRight: "20px", color: "#fff" }}
                    />{" "}
                    My Appointments
                </MenuItem>
                )}

            <MenuItem
                onClick={() => navigate("/user/view-classes")}
                sx={{
                fontSize: "25px",
                fontWeight: "bolder",
                fontFamily: "inherit",
                color: "#88C13E",
                borderBottom: "1px solid #555",
                "&:hover": {
                    backgroundColor: "#333",
                },
                }}>
                <OndemandVideoIcon
                fontSize="large"
                sx={{ paddingRight: "20px", color: "#fff" }}
                />{" "}
                My Classes
            </MenuItem>
            <MenuItem
                onClick={() => navigate("/user/chat")}
                sx={{
                fontSize: "25px",
                fontWeight: "bolder",
                fontFamily: "inherit",
                color: "#88C13E",
                "&:hover": {
                    backgroundColor: "#333",
                },
                }}>
                <ChatIcon
                fontSize="large"
                sx={{ paddingRight: "20px", color: "#fff" }}
                />{" "}
                Chat Support
            </MenuItem>
            </MenuList>
        </Paper>
        </Stack>
    );
}

export default UserSideBar;
