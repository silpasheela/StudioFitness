/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar/NavBar";
import UserSideBar from "../components/UserSideBar/UserSideBar";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import VideoChatIcon from "@mui/icons-material/VideoChat";
import BMICalculator from "../components/BMICalculator/BMICalculator";
import { Box } from "@mui/material";

function UserDashboardPage() {
  const [socket, setSocket] = useState(null);
  const [call, setCall] = useState("");

  const authState = useSelector((state) => {
    return state.auth?.authState;
  });

  useEffect(() => {
    const socket = io("https://studio.time-shift.shop/");

    setSocket(socket);
    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      // Event listeners for socket events
      socket.on("connect", () => {
        console.log("Connected to server");
        // Send the user ID to the server for setup
        socket.emit("setup", authState._id);
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from server");
      });
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      socket.on("trainer call", (link) => {
        console.log("trainer is calling ......!!!");
        console.log(link);
        setCall(link);
      });
    }
  }, [socket]);

  return (
    <div className="dashboard">
      <>
        <NavBar />
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xl: "row",
              lg: "row",
              md: "row",
              sm: "row",
              xs: "column",
            },
          }}>
          <UserSideBar />
          <BMICalculator />
        </Box>
        {call && (
          <a
            onClick={() => {
              setCall("");
            }}
            href={call}
            target="_blank"
            rel="noreferrer"
            style={{
              position: "absolute",
              right: "3rem",
              top: "10rem",
              width: "10rem",
              backgroundColor: "lightgreen",
              textDecoration: "none",
              padding: "1rem",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              color: "#1b4366",
              borderRadius: ".5rem",
            }}>
            <VideoChatIcon></VideoChatIcon>
            <span>Join Call</span>
          </a>
        )}
      </>
    </div>
  );
}

export default UserDashboardPage;
