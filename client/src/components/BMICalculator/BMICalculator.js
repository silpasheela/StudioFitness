import React, { useState } from "react";
import { toast } from "react-toastify";
import { instance } from "../../api/axiosInstance";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import MoodBadIcon from "@mui/icons-material/MoodBad";

const containerStyle = {
    
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    maxWidth: "400px",
    margin: "10rem auto",
    // marginTop: '-40vh',
    //   border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    backgroundColor: "rgba(255, 255, 255, 0.55)",
    backdropFilter: "blur(11px)",
    };

    const inputStyle = {
    margin: "8px",
    width: "100%",
    boxSizing: "border-box",
    };

    const buttonStyle = {
    margin: "16px",
    padding: "8px 16px",
    backgroundColor: "#6EC72D",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    };

    const resultContainerStyle = {
    marginTop: "16px",
    };

    const iconStyle = {
    fontSize: "36px",
    margin: "8px",
    };

    function getIconForStatus(status) {
    switch (status) {
        case "Underweight":
        return <ThumbUpIcon style={{ color: "blue", ...iconStyle }} />;
        case "Normal":
        return (
            <SentimentSatisfiedAltIcon style={{ color: "green", ...iconStyle }} />
        );
        case "Overweight":
        return (
            <SentimentDissatisfiedIcon style={{ color: "red", ...iconStyle }} />
        );
        case "Obese":
        return <MoodBadIcon style={{ color: "red", ...iconStyle }} />;
        case "Extremely obese":
        return <MoodBadIcon style={{ color: "darkred", ...iconStyle }} />;
        case "Morbidly obese":
        return <MoodBadIcon style={{ color: "darkred", ...iconStyle }} />;
        default:
        return null;
    }
    }

    function BMICalculator() {
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [bmiResult, setBmiResult] = useState(null);

    const handleCalculateBMI = async () => {
        if (!height || !weight) {
        toast.error("Height and weight cannot be empty!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        return;
        }

        try {
        const response = await instance.post("user/calculate-bmi", {
            height,
            weight,
        });
        setBmiResult(response.data);
        } catch (error) {
        console.error("Error calculating BMI:", error.response.data);
        toast.error("Error calculating BMI!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        }
    };

    return (
        <div style={containerStyle}>
        <Typography
            variant="h4"
            gutterBottom
            sx={{ color: "#000", fontWeight: "bolder", paddingTop: "15px" }}>
            BMI Calculator
        </Typography>
        <TextField
            label="Height"
            variant="outlined"
            InputProps={{
            startAdornment: <InputAdornment position="start">cm</InputAdornment>,
            }}
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            style={inputStyle}
        />
        <TextField
            label="Weight"
            variant="outlined"
            InputProps={{
            startAdornment: <InputAdornment position="start">kg</InputAdornment>,
            }}
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            style={inputStyle}
        />
        <Button
            variant="contained"
            color="primary"
            onClick={handleCalculateBMI}
            style={buttonStyle}>
            Calculate BMI
        </Button>
        {bmiResult && (
            <div style={resultContainerStyle}>
            <Typography variant="h6">Your BMI is: {bmiResult.BMI}</Typography>
            <Typography variant="body1">Status: {bmiResult.Class}</Typography>
            {getIconForStatus(bmiResult.Class)}
            </div>
        )}
        </div>
    );
}

export default BMICalculator;
