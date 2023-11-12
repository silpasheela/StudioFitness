import React, { useEffect } from 'react'
import { toast } from 'react-toastify';
import StripeCheckout from "react-stripe-checkout";
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Divider, Stack, TextField, Typography } from "@mui/material";
import { instance } from '../../api/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { viewPlan } from '../../app/features/Data/dataSlice';
import { subsAuth, updateAuth } from '../../app/features/Auth/authSlice';

function Checkout() {

    const navigate = useNavigate();

    const date = new Date();
    const formattedDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;

    const { id } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(viewPlan(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[dispatch])

    const planData = useSelector((state) => {
        return state.data.data.plan
    })

    const authState = useSelector((state) => {
        return state.auth.authState;
    })

    console.log("my",authState)

    console.log(planData)

    const onToken = async (token) => {
        try {
            const response = await instance.post("user/create-subscription", {
                planId: `${planData.planId}`, 
                token: token.id,
                userId: `${authState._id}`, 
            });
    
            if (response.status === 201) {
                const data = response.data;
                dispatch(updateAuth(data));
                dispatch(subsAuth())
                toast.success('Subscribed successfully!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                navigate('/user/subscription-details');
                console.log(data);
            } else {
                console.error("Subscription creation failed.");
                toast.error('Subscription creation failed!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (error) {
            console.error("Error creating subscription:", error);
            toast.error('User already have an active subscription!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };



    //


        return (
            <div>
                <Stack
                    direction= { 'row'}
                    spacing={5}
                    sx={{
                        marginTop: '10rem',
                        padding: '2rem'
                    }}>
                    <Box
                        sx={{
                            width: {lg: '65%' , md: '65%' , sm: '100%' , xs:'100%'},
                            border: '1px gray dotted',
                            padding: '1rem 0',
                            borderRadius: '.5rem'
                        }}>
                        <Typography
                            variant='h4'
                            sx={{
                                alignSelf: 'flex-start',
                                paddingLeft: '3.5rem',
                                marginBottom: '1.5rem',
                                color:'#88C13E',
                                fontWeight:'bolder',
                            }}>
                            Booking Info
                        </Typography>
                        <Stack direction= 'column' spacing={3} padding= '0 3.5rem'>
                            <TextField
                                id="fullName"
                                label="Full name"
                                variant="outlined"
                                value={authState?.fullName}
                            />
                            <TextField
                                id="email"
                                label="Email"
                                variant="outlined"
                                value={authState?.email}
                            />
                            <TextField
                                id="phone"
                                label="Phone"
                                variant="outlined"
                                value={authState?.mobileNumber}
                            />
                            <TextField
                                id="planName"
                                // label="Plan Name"
                                variant="outlined"
                                value={planData?.planName}
                            />
                        </Stack>
                    </Box>
                    <Box sx={{
                        width: {lg:'30%' , md: '30%' , sm: '100%' , xs: '100%'},
                        border: '1px gray dotted',
                        borderRadius: '.3rem'
                    }}>
                        <Typography variant='h4' padding= '1rem' sx={{color:'#88C13E', fontWeight:'bolder'}}>Booking Summary</Typography>
                        <Divider />
                        <Stack padding='.8rem' direction='row' spacing={2}>
                            <Box padding= '.3rem 0rem'>
                                <Typography
                                    variant='subtitle1' 
                                    sx={{color: 'gray'}}
                                >

                                </Typography>
                            </Box>
                        </Stack>
                        <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '.4rem 1.5rem'
                        }}>
                            <Typography
                                sx={{
                                    fontSize: '1rem',
                                    letterSpacing: '.05rem'
                                }}
                            >
                                Date
                            </Typography>
                            <Typography  sx={{
                                    fontSize: '1rem',
                                    letterSpacing: '.05rem'
                            }}>
                            {formattedDate}
                            </Typography>
                        </Box>
                        <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '.4rem 1.5rem'
                        }}>
                            <Typography
                                sx={{
                                    fontSize: '1rem',
                                    letterSpacing: '.05rem'
                                }}
                            >
                                Plan
                            </Typography>
                            <Typography  sx={{
                                    fontSize: '1rem',
                                    letterSpacing: '.05rem'
                            }}>
                            {planData?.planName}
                            </Typography>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '.4rem 1.5rem'
                        }}>
                            <Typography
                                sx={{
                                    fontSize: '1rem',
                                    letterSpacing: '.05rem'
                                }}
                            >
                                Validity
                            </Typography>
                            <Typography  sx={{
                                fontSize: '1rem',
                                letterSpacing: '.05rem'
                            }}>
                            1 Month
                            </Typography>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            padding: '.4rem 1.5rem'
                        }}>
                            <Typography
                                sx={{
                                    fontSize: '1rem',
                                    letterSpacing: '.05rem'
                                }}
                            >
                                Amount
                            </Typography>
                            <Typography  sx={{
                                fontSize: '1rem',
                                letterSpacing: '.05rem'
                            }}>
                            Rs. {planData?.planAmount} /-
                            </Typography>
                        </Box>

                        <Divider sx={{ width: '90%', margin: '.5rem auto' }} />
                        <Box sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                padding: '.4rem 1.5rem'
                        }}>
                            <Typography
                                sx={{
                                    fontSize: '2rem',
                                    letterSpacing: '.05rem',
                                    fontFamily:'serif',
                                    fontWeight:'bolder'
                                }}
                            >
                                Total
                            </Typography>
                            <Typography  sx={{
                                fontSize: '2rem',
                                letterSpacing: '.05rem',
                                fontFamily:'serif',
                                fontWeight:'bolder'
                            }}>
                            Rs. {planData?.planAmount} /-
                            </Typography>
                        </Box>
                        <StripeCheckout
                            stripeKey={process.env.REACT_APP_STRIPE_KEY}
                            token={onToken}
                            name="StudioFitness"
                            description="Subscription Payment"
                            amount={`${planData?.planAmount*100}`}
                            currency="inr"
                        />
                    </Box>
                </Stack>
                <Button onClick={()=> navigate('/viewplandetails')} sx={{
                    backgroundColor: '#88C13E', 
                    color: '#000', 
                    '&:hover': { backgroundColor: '#000',color: '#88C13E', }
                }}>Go Back</Button>
            </div>
        );
}

export default Checkout