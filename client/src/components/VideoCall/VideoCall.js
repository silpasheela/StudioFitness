/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { instance } from "../../api/axiosInstance";

function randomID(len) {
    let result = "";
    if (result) return result;
    var chars = "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
        maxPos = chars.length,
        i;
    len = len || 5;
    for (i = 0; i < len; i++) {
        result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
    }

export function getUrlParams(url = window.location.href) {
    let urlStr = url.split("?")[1];
    return new URLSearchParams(urlStr);
}

function VideoCall() {
    const { id } = useParams();

    const roomID = getUrlParams().get("roomID") || randomID(5);
    const containerRef = useRef(null);
    const [personalLink, setPersonalLink] = useState(null);
    const [callInProgress, setCallInProgress] = useState(false);
    const [callEnd, setCallEnd] = useState(false);
    const [userId, setUserId] = useState(null);

    // const [zp, setZp] = useState(null);

    useEffect(() => {
        const fetchAppointmetDetails = async () => {
        const { data } = await instance.get(`/trainer/view-appointments/${id}`);
        setUserId(data?.appointment?.userId);
        };

        fetchAppointmetDetails();
    }, []);

    useEffect(() => {
        if (containerRef.current) {
        myMeeting(containerRef.current);
        }
    }, []);

    const authState = useSelector((state) => {
        return state.auth?.authState;
    });

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const socket = io("http://localhost:4000/");
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
        if (socket && personalLink && userId) {
        socket.emit("new call", {
            personalLink,
            userId,
        });
        }
    }, [personalLink, userId]);

    useEffect(() => {
        if (callEnd) {
        socket.emit("new call", {
            personalLink: null,
            userId: null,
        });
        }
    }, [callEnd]);

    let myMeeting = async (element) => {
        // Check if a call is already in progress
        if (callInProgress) {
        return;
        }

        // Step 1: Install the Zego Cloud SDK using NPM

        // Step 2: Generate a Kit Token
        const appID = 556730801;
        const serverSecret = "b9a6ca17126aa0b5fc87564f2c550a4f";
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        roomID,
        randomID(5),
        randomID(5)
        );

        // Step 3: Create an instance object from the Kit Token
        const zpInstance = ZegoUIKitPrebuilt.create(kitToken);
        // setZp(zpInstance);

        // Generate personal link
        const link =
        window.location.protocol +
        "//" +
        window.location.host +
        window.location.pathname +
        "?roomID=" +
        roomID;
        setPersonalLink(link);
        // socket.emit('new call' , link);

        // Step 4: Start a call
        zpInstance.joinRoom({
        container: element,
        sharedLinks: [
            {
            name: "Personal link",
            url: link,
            },
        ],
        scenario: {
            mode: ZegoUIKitPrebuilt.VideoConference,
        },
        onLeaveRoom: () => {
            setCallEnd(true);
            window.close();
        },
        Complete: () => {
            setCallInProgress(true);
        },
        });
    };
    return (
        <div
        className="myCallContainer"
        ref={containerRef}
        style={{ width: "100vw", height: "100vh" }}></div>
    );
}

export default VideoCall;
