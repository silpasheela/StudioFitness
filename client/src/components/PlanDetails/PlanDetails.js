import React, {  } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';


import { Card, CardContent, Typography, Button,  } from '@mui/material'



function PlanDetails({plan}) {

    const navigate = useNavigate();

    const authState = useSelector((state) => {
        return state?.auth?.authState;
    })

    console.log(authState.role);


    return (
        <>
        <Card sx={{
            maxWidth: 350,
            margin: 'auto',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
            borderRadius: 3,
            border: '1px solid',
            borderColor:'green',
            backgroundColor: 'rgba(60, 60, 60, 0.85)', 
            height:350,
            transform: 'skewY(-4deg)',
            transition: 'all 0.5s',
            '&:hover': {
            transform: 'scale(1.05)', // Scale up the card on hover
        },
        }}>
            <CardContent>
                <Typography sx={{
                    fontSize: 36,
                    fontWeight: 'bold',
                    color:'#fff',
                    fontFamily:'inherit'
                }}>{plan.planName}</Typography>
                <Typography sx={{
                    fontSize: 34,
                    fontWeight: 'bold',
                    color: '#6EC72D',
                }}>₹{plan.planAmount}/-</Typography>
                <ul style={{color:'#fff',fontSize: 20, fontStyle:'italic', listStyle: 'none', padding: 0,fontFamily:'inherit' }} >
                {plan.features.map((feature, index) => (
                    <li key={index} style={{borderBottom: '0.15px dashed #000'}} >{feature}</li>
                ))}
                </ul>
                <Button variant="contained" sx={{marginTop:'5%',backgroundColor:'#6EC72D',fontWeight:'bold', color:'#000',
                    '&:hover': { backgroundColor: '#6EC72D' , color: '#fff'}}}
                    onClick={() => navigate(authState?.role === 'user' ? `/user/checkout/${plan._id}` : '/signup')}>
                    {authState?.role === 'user' ? 'Get Started' : 'Signup'}
                </Button>
            </CardContent>
        </Card> 
        </>
    )
}

export default PlanDetails