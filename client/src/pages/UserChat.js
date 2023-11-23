import React from "react";
import ChatUI from "../components/ChatUI/ChatUI";
import NavBar from "../components/NavBar/NavBar";

function UserChat() {
    return (
        <>
        <NavBar/>
        <ChatUI role="user"></ChatUI>
        </>
    );
}

export default UserChat;
