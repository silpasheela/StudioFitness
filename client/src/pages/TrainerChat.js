import React from "react";
import ChatUI from "../components/ChatUI/ChatUI";
import NavBar from "../components/NavBar/NavBar";

function TrainerChat() {
    return (
        <>
        <NavBar/>
        <ChatUI role="trainer"></ChatUI>
        </>
    );
}

export default TrainerChat;
