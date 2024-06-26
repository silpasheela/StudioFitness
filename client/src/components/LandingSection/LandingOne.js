import React from "react";
import "./LandingOne.css";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import SpaIcon from "@mui/icons-material/Spa";
import SportsMartialArtsIcon from "@mui/icons-material/SportsMartialArts";
import { Box } from "@mui/material";

function LandingOne() {
    return (
        <Box
        sx={{
            marginTop: {
            xl: "7rem",
            lg: "7rem",
            md: "3rem",
            sm: "-2rem",
            xs: "2rem",
            },
        }}>
        <div className="banner-area banner-style-one">
            <div className="border1"></div>
            <div className="border2"></div>
            <div className="border3"></div>
            <div className="border4"></div>

            <div className="landing-title-container">
            <h1>FUEL YOUR</h1>
            <h2>BODY <span>FITNESS</span></h2>
            <button className="landing-btn">Be one of us</button>
            </div>
        </div>

        <div className="our-service-area">
            <div className="container">
            <div className="service-row">
                <div className="">
                <div className="section-title">
                    <h1 className="title" style={{ fontStyle: "italic" }}>
                    Our Services
                    </h1>
                </div>
                </div>
            </div>
            </div>

            <div className="main">
            <div className="start">
                <div className="service-box">
                <div className="content">
                    <FitnessCenterIcon />
                    <h4 className="h4">Strength Equipment</h4>
                    <p className="p1">
                    Praesent a diam at velit finibus vehicula sit amet eu dui.
                    Vestibulum rutrum dignissim arcu, vitae convallis
                    </p>
                </div>
                </div>
                <div className="service-box">
                <div className="content">
                    <SportsGymnasticsIcon />
                    <h4 className="h4">Health Equipment</h4>
                    <p className="p1">
                    Praesent a diam at velit finibus vehicula sit amet eu dui.
                    Vestibulum rutrum dignissim arcu, vitae convallis
                    </p>
                </div>
                </div>
                <div className="service-box">
                <div className="content">
                    <SportsMartialArtsIcon />
                    <h4 className="h4">Energy Equipment</h4>
                    <p className="p1">
                    Praesent a diam at velit finibus vehicula sit amet eu dui.
                    Vestibulum rutrum dignissim arcu, vitae convallis
                    </p>
                </div>
                </div>
            </div>
            <div className="end">
                <div className="service-box">
                <div className="content">
                    <MonitorHeartIcon />
                    <h4 className="h4">Weight Equipment</h4>
                    <p className="p2">
                    Praesent a diam at velit finibus vehicula sit amet eu dui.
                    Vestibulum rutrum dignissim arcu, vitae convallis
                    </p>
                </div>
                </div>
                <div className="service-box">
                <div className="content">
                    <DirectionsRunIcon />
                    <h4 className="h4">Gym Equipment</h4>
                    <p className="p2">
                    Praesent a diam at velit finibus vehicula sit amet eu dui.
                    Vestibulum rutrum dignissim arcu, vitae convallis
                    </p>
                </div>
                </div>
                <div className="service-box">
                <div className="content">
                    <SpaIcon />
                    <h4 className="h4">Fitness Equipment</h4>
                    <p className="p2">
                    Praesent a diam at velit finibus vehicula sit amet eu dui.
                    Vestibulum rutrum dignissim arcu, vitae convallis
                    </p>
                </div>
                </div>
            </div>
            </div>
        </div>
        </Box>
    );
}

export default LandingOne;
