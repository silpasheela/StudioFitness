import React from 'react';
import './Plans.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function Plans() {
    return (
        <React.Fragment>
        <div className="section-title" style={{alignItems:"center"}}>
        <h1 className="title">Subscribe Now</h1>
        </div>
        <div className='plancard' style={{display:'flex', }}>
            <Card className='subcard' sx={{ maxWidth: 345 , height:250 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" className='h5'>
                    Standard - Rs. 1500/-
                </Typography>
                    <Typography variant="body2" color="text.secondary">
                    <li>Progress Tracking</li>
                    <li>Pre-recorded Classes</li>
                    <li>Live Chat Support</li>
                    <li>Time Restrictions</li>
                    </Typography>
                </CardContent>
                <CardActions sx={{paddingLeft:16,marginBottom:2}}>
                <button className='btn-element-plan'>Buy Now</button>
                </CardActions>
            </Card>

            <Card className='subcard' sx={{ maxWidth: 345,height:250 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" className='h5'>
                    Premium - Rs. 2500/-
                </Typography>
                    <Typography variant="body2" color="text.secondary">
                    <li>Progress Tracking</li>
                    <li>Pre-recorded Classes</li>
                    <li>Personal Trainer</li>
                    <li>Live Chat Support</li>
                    </Typography>
                </CardContent>
                <CardActions sx={{paddingLeft:16,marginBottom:2}}>
                <button className='btn-element-plan'>Buy Now</button>
                </CardActions>
            </Card>
        </div>
        
        </React.Fragment>
    )
}

export default Plans