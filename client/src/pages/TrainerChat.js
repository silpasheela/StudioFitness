import React from "react";
import ChatUI from "../components/ChatUI/ChatUI";
import NavBar from "../components/NavBar/NavBar";

function TrainerChat() {
    return (
        // <Box sx={{ padding: "3rem" }}>
        <>
        <NavBar/>
        <ChatUI role="trainer"></ChatUI>
        </>
        // </Box>
    );
}

export default TrainerChat;
