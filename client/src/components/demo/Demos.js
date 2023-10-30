import React, { useEffect } from 'react'
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid, Input } from '@mui/material';
import { Avatar, Button, Card, CardActions, CardContent, Divider, CardHeader, TextField, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userGetSubscriptionDetails } from '../../app/features/User/userSlice';

function Demos() {


    const subscriptionData = useSelector((state) => {
        return state.auth.authState;
    })

    console.log("subsauth",subscriptionData.subscriptionDetails)


    return (
        <Grid
        xs={12}
        md={6}
        lg={8}
        sx={{marginTop:'-36vh', marginLeft:'30rem', }}
        >
            <Card sx={{width:'125vh',borderColor:'green', border:'1px solid'}}>
            <CardHeader
                subheader="The information can be edited"
                title="Subscription Details"
            />
            <CardContent sx={{ pt: 0, paddingLeft:5, paddingRight:5 }}>
                <Box sx={{ m: -1.5 }}>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                    xs={12}
                    md={6}
                    >
                    <TextField
                        fullWidth
                        label="Plan"
                        disabled
                        value={subscriptionData?.subscriptionDetails?.amount === 999 ? 'Standard Plan' : 'Premium Plan'}
                    />
                    </Grid>
                    <Grid
                    xs={12}
                    md={6}
                    >
                    <TextField
                        fullWidth
                        label="Subscription Id"
                        disabled
                        value={subscriptionData?.subscriptionDetails?.subscriptionId}
                    />
                    </Grid>
                    <Grid
                    xs={12}
                    md={6}
                    >
                    <TextField
                        fullWidth
                        label="Start Date"
                        disabled
                        value={new Date(subscriptionData?.subscriptionDetails?.startDate).toLocaleDateString()}
                    />
                    </Grid>
                    <Grid
                    xs={12}
                    md={6}
                    >
                    <TextField
                        fullWidth
                        label="End Date"
                        disabled
                        value={new Date(subscriptionData?.subscriptionDetails?.endDate).toLocaleDateString()}
                    />
                    </Grid>
                    <Grid
                    xs={12}
                    md={6}
                    >
                    <TextField
                        fullWidth
                        label="Pricing"
                        disabled
                        value={subscriptionData?.subscriptionDetails?.amount}
                    />
                    </Grid>
                    <Grid
                    xs={12}
                    md={6}
                    >
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
            <CardActions sx={{ justifyContent: 'flex-end',paddingLeft:5, paddingRight:5 }}>
                <Button variant="contained" 
                        // onClick={() => navigate('/user/dashboard')}
                        sx={{
                            backgroundColor: '#161616', 
                            color: '#6EC72D',
                            borderRadius: "5px", 
                            '&:hover': { backgroundColor: '#161616' , color: '#fff'} 
                        }}>
                Cancel Subscription
                </Button>
            </CardActions>
            </Card>
            <Button variant="contained"
                    sx={{
                        marginTop:'8vh',
                        marginRight:'7.5rem',
                        backgroundColor: '#6EC72D', 
                        color: '#161616',
                        borderRadius: "5px", 
                        '&:hover': { backgroundColor: '#6EC72D' , color: '#fff'} 
                    }}>
                Go Back
                </Button>
        </Grid>
    )
}

export default Demos