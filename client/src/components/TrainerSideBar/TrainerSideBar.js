import React from "react";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import EventIcon from "@mui/icons-material/Event";
import ChatIcon from "@mui/icons-material/Chat";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function TrainerSideBar() {
    const navigate = useNavigate();

    const authState = useSelector((state) => {
        return state.auth.authState;
    });

    console.log("sidebar auth", authState);

    return (
        <Stack
        direction="row"
        spacing={4}
        sx={{
            width: "10vh",
            height: "330px",
            paddingLeft: "0",
            paddingTop: "16.55vh",
        }}>
        <Paper
            sx={{
            background: "black",
            color: "#fff",
            borderRadius: "0",
            }}>
            <MenuList sx={{ minWidth: "50vh", paddingTop: "4.5vh" }}>
            <MenuItem
                onClick={() => navigate("/trainer/editprofile")}
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
                onClick={() => navigate("/trainer/addslot")}
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
                <MoreTimeIcon
                fontSize="large"
                sx={{ paddingRight: "20px", color: "#fff" }}
                />{" "}
                Add my Slot
            </MenuItem>

            <MenuItem
                onClick={() => navigate("/trainer/view-appointments")}
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
                />
                My Appointments
            </MenuItem>

            <MenuItem
                onClick={() => navigate("/trainer/chat")}
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

export default TrainerSideBar;
