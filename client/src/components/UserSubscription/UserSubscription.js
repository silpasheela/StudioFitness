import React, { useEffect } from "react";
import { confirmAlert } from "react-confirm-alert"; 
import "react-confirm-alert/src/react-confirm-alert.css"; 
import { toast } from "react-toastify";
import { Box, Unstable_Grid2 as Grid } from "@mui/material";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    CardHeader,
    TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { instance } from "../../api/axiosInstance";
import { subsAuth } from "../../app/features/Auth/authSlice";

function UserSubscription() {
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(subsAuth());
    // }, [dispatch]);

    const navigate = useNavigate();

    const subscriptionData = useSelector((state) => {
        return state.auth.authState;
    });

    const handleCancelSubscription = async (e) => {
        confirmAlert({
        title: "Confirm to cancel",
        message: "Are you sure you want to cancel your subscription?",
        buttons: [
            {
            label: "Yes",
            onClick: async () => {
                try {
                const response = await instance.put(
                    `user/subscription/cancel/${subscriptionData._id}`
                );
                console.log(response);
                //update subs details in authstate
                dispatch(subsAuth());
                toast.success("Cancellation successful!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                } catch (error) {
                console.log(error);
                toast.error("No active Subscription available!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                }
            },
            },
            {
            label: "No",
            },
        ],
        });
    };

    return (
        <Box
        sx={{
            width: "90%",
            margin: "auto",
            marginTop: {
            xl: "10rem",
            lg: "10rem",
            md: "10rem",
            sm: "7rem",
            xs: "7rem",
            },
            marginLeft: {
            xl: "15rem",
            lg: "15rem",
            md: "15rem",
            sm: "auto",
            xs: "auto",
            },
        }}>
        <Card
            sx={{
            width: {
                xl: "125vh",
                lg: "125vh",
                md: "90%",
                sm: "100%",
                xs: "100%",
            },
            borderColor: "green",
            }}
            style={{ backgroundColor: "rgba(228, 233, 237, 0.9)" }}>
            <CardHeader title="Subscription Details" />
            <CardContent sx={{ pt: 0, paddingLeft: 5, paddingRight: 5 }}>
            <Box>
                <Grid container spacing={3}>
                <Grid xs={12} md={12} lg={6}>
                    <TextField
                    fullWidth
                    label="Plan"
                    disabled
                    value={
                        subscriptionData?.subscriptionDetails?.planId ===
                        process.env.REACT_APP_PREMIUM_ID
                        ? "Premium Plan"
                        : "Standard Plan"
                    }
                    />
                </Grid>
                <Grid xs={12} md={12} lg={6}>
                    <TextField
                    fullWidth
                    label="Subscription Id"
                    disabled
                    value={subscriptionData?.subscriptionDetails?.subscriptionId}
                    />
                </Grid>
                <Grid xs={12} md={12} lg={6}>
                    <TextField
                    fullWidth
                    label="Start Date"
                    disabled
                    value={new Date(
                        subscriptionData?.subscriptionDetails?.startDate
                    ).toLocaleDateString()}
                    />
                </Grid>
                <Grid xs={12} md={12} lg={6}>
                    <TextField
                    fullWidth
                    label="End Date"
                    disabled
                    value={new Date(
                        subscriptionData?.subscriptionDetails?.endDate
                    ).toLocaleDateString()}
                    />
                </Grid>
                <Grid xs={12} md={12} lg={6}>
                    <TextField
                    fullWidth
                    label="Pricing"
                    disabled
                    value={subscriptionData?.subscriptionDetails?.amount}
                    />
                </Grid>
                <Grid xs={12} md={12} lg={6}>
                    <TextField
                    fullWidth
                    label="Status"
                    disabled
                    value={subscriptionData?.subscriptionDetails?.status}
                    />
                </Grid>
                </Grid>
            </Box>
            </CardContent>
            <Divider />
            <CardActions
            sx={{ justifyContent: "flex-end", paddingLeft: 5, paddingRight: 5 }}>
            <Button
                variant="contained"
                onClick={handleCancelSubscription}
                sx={{
                backgroundColor: "#161616",
                color: "#6EC72D",
                borderRadius: "5px",
                "&:hover": { backgroundColor: "#161616", color: "#fff" },
                }}>
                Cancel Subscription
            </Button>
            </CardActions>
        </Card>
        <Button
            variant="contained"
            onClick={() => navigate("/")}
            sx={{
            marginTop: "8vh",
            marginRight: "7.5rem",
            backgroundColor: "#6EC72D",
            color: "#161616",
            borderRadius: "5px",
            "&:hover": { backgroundColor: "#6EC72D", color: "#fff" },
            }}>
            Go to Home
        </Button>
        </Box>
    );
}

export default UserSubscription;
