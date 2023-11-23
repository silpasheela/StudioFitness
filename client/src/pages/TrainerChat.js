import React from "react";
import ChatUI from "../components/ChatUI/ChatUI";
import { Box } from "@mui/material";

function TrainerChat() {
    return (
        <Box sx={{ padding: "3rem" }}>
        <ChatUI role="trainer"></ChatUI>
        </Box>
    );
}

export default TrainerChat;
