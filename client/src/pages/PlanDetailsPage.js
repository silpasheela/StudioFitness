import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { viewAllPlans } from "../app/features/Data/dataSlice";
import PlanDetails from "../components/PlanDetails.js/PlanDetails"
import { Container, Grid } from '@mui/material';
import {Typography} from "@mui/material";
import NavBar from "../components/NavBar/NavBar";


function PlanDetailsPage() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(viewAllPlans());
    },[dispatch])

    const plans = useSelector(state => state?.data?.data?.plans);

    console.log("plans",plans)

    return (
        <div className="loginpage">
            <NavBar/>
            <Container sx={{paddingTop:10}}>
                <Typography variant="h2" style={{fontFamily:'revert', fontWeight:'bolder'}}>Find a plan that's right for you</Typography>
                <Grid container spacing={2} sx={{marginLeft:'25vh',marginTop:6}}>
                    {plans?.map((plan) => (
                    <Grid item xs={12} sm={4} key={plan._id}>
                        <PlanDetails plan={plan} />
                    </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    )
}

export default PlanDetailsPage