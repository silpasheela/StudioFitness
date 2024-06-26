import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userGetTrainer } from "../../app/features/User/userSlice";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Avatar from "@mui/material/Avatar";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import IconButton from "@mui/material/IconButton";
import RateReviewIcon from "@mui/icons-material/RateReview";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Rating from "@mui/material/Rating";
import TrainerSlotView from "./TrainerSlotView";
import { instance } from "../../api/axiosInstance";

function TrainerDetailedView() {
    const navigate = useNavigate();

    const [slotId, setSlotId] = useState(null);
    const [dateId, setDateId] = useState(null);

    const [value, setValue] = useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const { id } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userGetTrainer(id));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    const trainer = useSelector((state) => state.user?.user?.trainer);

    const handleBookSlot = (slotId, dateId) => {
        setSlotId(slotId);
        setDateId(dateId);
    };

    const handleFinalBooking = async () => {

        try {
        const response = await instance.post(`user/book-appointment/${id}`, {
            slotId,
            dateId,
        });
        if (response.status === 201) {
            toast.success("Appointment booked successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            navigate("/user/booking-success");
        }
        } catch (error) {
        toast.error(`${error.response.data.error}`, {
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
        <Stack
        direction={"column"}
        sx={{
            width: "75%",
            border: 2,
            backgroundColor: "#000",
            paddingTop: 5,
            borderColor: "#6EC72D",
            borderRadius: 10,
            marginTop: "25vh",
            marginLeft: "26.5vh",
        }}>
        <Box
            sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            }}>
            <Box>
            <Avatar
                sx={{ height: 250, width: 250 }}
                alt={trainer?.fullName}
                src={trainer?.profilePicture}
            />
            </Box>
            <Box sx={{ marginTop: 10, marginLeft: "-15%" }}>
            <Typography
                variant="h4"
                sx={{ fontWeight: "bolder", color: "#fff" }}
                align="left">
                {trainer?.fullName}
            </Typography>
            <Typography align="left" sx={{ color: "#6EC72D" }}>
                {trainer?.qualification}
            </Typography>
            <Typography
                variant="h6"
                sx={{
                fontWeight: "bolder",
                color: "#757575",
                fontFamily: "initial",
                }}
                align="left">
                {trainer?.service.service} Instructor
            </Typography>
            <Typography align="left" component="legend"></Typography>
            <Rating
                name="read-only"
                value={5}
                readOnly
                sx={{ marginLeft: -14 }}
            />
            </Box>

            <Box sx={{ marginTop: 5 }}>
            <Typography sx={{ fontSize: 13, color: "#fff" }} align="left">
                <IconButton sx={{ color: "#fff" }}>
                <ThumbUpOffAltIcon />
                </IconButton>
                2 Votes
            </Typography>
            <Typography sx={{ fontSize: 13, color: "#fff" }} align="left">
                <IconButton sx={{ color: "#fff" }}>
                <CalendarMonthIcon />
                </IconButton>
                Slots
            </Typography>
            <Typography sx={{ fontSize: 13, color: "#fff" }} align="left">
                <IconButton sx={{ color: "#fff" }}>
                <RateReviewIcon />
                </IconButton>
                2 Feedbacks
            </Typography>
            <Typography sx={{ fontSize: 13, color: "#fff" }} align="left">
                <IconButton sx={{ color: "#fff" }}>
                <LocationOnIcon />
                </IconButton>
                {trainer?.state}
            </Typography>
            <Button
                fullWidth
                sx={{
                marginTop: 3,
                borderColor: "#6EC72D",
                color: "#6EC72D",
                border: "1px solid",
                "&:hover": { backgroundColor: "#6EC72D", color: "#000" },
                }}>
                add feedback
            </Button>
            <Button
                fullWidth
                sx={{
                marginTop: 1.5,
                backgroundColor: "#6EC72D",
                color: "#fff",
                "&:hover": { backgroundColor: "#6EC72D", color: "#000" },
                }}
                onClick={handleFinalBooking}>
                book slot
            </Button>
            </Box>
        </Box>

        <Box sx={{ width: "100%", typography: "body1", marginTop: 2 }}>
            <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                sx={{
                    "& .MuiTab-root": {
                    color: "#fff",
                    "&.Mui-selected": {
                        color: "#6EC72D",
                    },
                    },
                    "& .MuiTabs-indicator": {
                    backgroundColor: "#6EC72D",
                    },
                }}>
                <Tab label="Availability" value="1" />
                <Tab label="Reviews" value="2" />
                </TabList>
            </Box>
            <TabPanel sx={{ color: "#757575" }} align="left" value="1">
                <TrainerSlotView handleBookSlot={handleBookSlot} />
            </TabPanel>
            <TabPanel sx={{ color: "#fff" }} value="2">
                No Reviews
            </TabPanel>
            </TabContext>
        </Box>
        </Stack>
    );
}

export default TrainerDetailedView;
