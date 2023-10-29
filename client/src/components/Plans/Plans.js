import React from 'react';
import './Plans.css'
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router-dom';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button } from '@mui/material';


function Plans() {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/viewplandetails');
    };


    return (
        <React.Fragment>
        <div className="section-title" style={{alignItems:"center"}}>
        <h1 className="title">Subscribe Now</h1>
        </div>
        <div className='plancard' style={{display:'flex', }}>
            <Card className='subcard' sx={{ maxWidth: 345 , height:250 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" className='h5'>
                    Standard - Rs. 999/-
                </Typography>
                    <Typography variant="body2" color="text.secondary">
                    <li>Progress Tracking</li>
                    <li>Pre-recorded Classes</li>
                    <li>Live Chat Support</li>
                    <li>Time Restrictions</li>
                    </Typography>
                </CardContent>
                <CardActions sx={{paddingLeft:16,marginBottom:2}}>
                <button className='btn-element-plan'>View </button>
                </CardActions>
            </Card>

            <Card className='subcard' sx={{ maxWidth: 345,height:250 }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" className='h5'>
                    Premium - Rs. 1999/-
                </Typography>
                    <Typography variant="body2" color="text.secondary">
                    <li>Progress Tracking</li>
                    <li>Pre-recorded Classes</li>
                    <li>Personal Trainer</li>
                    <li>Live Chat Support</li>
                    </Typography>
                </CardContent>
                <CardActions sx={{paddingLeft:16,marginBottom:2}}>
                <button className='btn-element-plan'>View </button>
                </CardActions>
            </Card>
            <div style={{marginRight:0}}>
            <Button 
                endIcon={<ArrowForwardIosIcon />}
                onClick={handleClick}
                sx={{ 
                    marginTop:30,
                    marginRight:-15,
                    backgroundColor: '#88C13E', 
                    color: '#fff', 
                    '&:hover': { backgroundColor: '#000',color: '#88C13E', },
                    padding: '10px 15px',
                    borderRadius: '20px',
                    textTransform: 'none',
                    fontSize: '15px',
                    fontWeight: 'bold'
                }}
                >
                VIEW DETAILS
            </Button>
            </div>

        </div>

        </React.Fragment>
    )
}

export default Plans