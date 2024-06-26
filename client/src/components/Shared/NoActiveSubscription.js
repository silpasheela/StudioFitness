import { Box, Button } from "@mui/material";
import React from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle"; // Material-UI Add Circle Icon
import { useNavigate } from "react-router-dom";

function NoActiveSubscription() {
    
    const navigate = useNavigate();

    const messageStyle = {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "20px",
    };

    const animationStyle = {
        animation: "fadeIn 1s ease-in",
    };

    const handleSubscribeClick = () => {
        navigate("/viewplandetails");
    };

    return (
        <>
        <div>
            <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "80%",
                margin: "auto",
                marginTop: {
                xl: "10rem",
                lg: "10rem",
                md: "10rem",
                sm: "5rem",
                xs: "5rem",
                },
                marginLeft: {
                xl: "55vh",
                lg: "55vh",
                md: "auto",
                sm: "auto",
                xs: "auto",
                },
                color: "#fff",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(12px)",
                paddingTop: "40px",
                paddingBottom: "40px",
            }}>
            <div style={{ ...messageStyle, ...animationStyle }}>
                No Active Subscription
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={animationStyle}>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12" y2="8"></line>
            </svg>
            </Box>
            <Button
            variant="contained"
            onClick={handleSubscribeClick}
            startIcon={<AddCircleIcon />}
            sx={{
                width: "40%",
                margin: "auto",
                marginTop: "20px",
                marginLeft: {
                xl: "75vh",
                lg: "75vh",
                md: "auto",
                sm: "auto",
                xs: "auto",
                },
                backgroundColor: "#6EC72D",
                padding: ".5rem 1rem",
                color: "#000",
                borderRadius: "5px",
                "&:hover": { backgroundColor: "#6EC72D", color: "#fff" },
            }}>
            Subscribe
            </Button>
        </div>
        </>
    );
}

export default NoActiveSubscription;
