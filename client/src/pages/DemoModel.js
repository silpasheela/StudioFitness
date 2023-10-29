import React, { useEffect,useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Demos from '../components/demo/Demos';
import { viewAllPlans } from "../app/features/Data/dataSlice";
import PlanDetails from "../components/PlanDetails.js/PlanDetails"
import { Container, Grid } from '@mui/material';
import {Typography} from "@mui/material";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { uninterceptedApiInstance, instance } from "../api/axiosInstance";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = await loadStripe('pk_test_51O5jK5SFewJqLbl0um0DUGqSV4WRzkXPTe6ACi1ZKiCPXqEYAszxWJnBUUbFub24LDZWMDokTD8VoYYuZO53lUN200H4TGJMNG');



function DemoModel() {



  return (
    <Elements stripe={stripePromise}>
    <Demos/>
    </Elements>
  )
}

export default DemoModel