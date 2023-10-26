import React from 'react'
import './Trainer.css'
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button } from '@mui/material';


function Trainer() {

    const navigate = useNavigate();

    const handleViewMoreClick = () => {
        navigate('/viewtrainers');
    };

    return (
        <React.Fragment>
        <div className="section-title">
        <h1 className="title">Our Trainers</h1>
        </div>
        <div className='trainercard' style={{marginTop:50}}>
            <Card sx={{ maxWidth: 345,margin: 3  }}>
                <CardMedia
                    sx={{ height: 300 }}
                    image="https://res.cloudinary.com/djd2rpgil/image/upload/v1698057228/trainers/jwoqmp3lpjh7sq7ja9cy.webp"
                    title=""
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    Malone Franklyn
                </Typography>
                    <Typography variant="body2" color="text.secondary">
                    Cardio exercise, which is sometimes referred to as aerobic exercise, is any rhythmic activity that raises your heart rate into your target heart rate zone.
                    </Typography>
                </CardContent>
                <CardActions sx={{paddingLeft:14,marginBottom:2}}>
                    <InstagramIcon/>
                    <LinkedInIcon/>
                    <TwitterIcon/>
                    <EmailIcon/>
                </CardActions>
            </Card>
            
            <Card sx={{ maxWidth: 345,margin: 3  }}>
                <CardMedia
                    sx={{ height: 300 }}
                    image="https://res.cloudinary.com/djd2rpgil/image/upload/v1698057229/trainers/sjpwu2zxqfoj79ufhsjp.jpg"
                    title=""
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    Trace Rudolph
                </Typography>
                    <Typography variant="body2" color="text.secondary">
                    A Zumba instructor is a fitness instructor who specializes in teaching Zumba, which is a group fitness workout that blends a variety of dance styles and Latin music.
                    </Typography>
                </CardContent>
                <CardActions sx={{paddingLeft:14,marginBottom:2}}>
                    <InstagramIcon/>
                    <LinkedInIcon/>
                    <TwitterIcon/>
                    <EmailIcon/>
                </CardActions>
            </Card>

            <Card sx={{ maxWidth: 345,margin: 3  }}>
                <CardMedia
                    sx={{ height: 300 }}
                    image="https://res.cloudinary.com/djd2rpgil/image/upload/v1698057230/trainers/tq8io2zpprnhlosanxiv.jpg"
                    title=""
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    Xander Reilly
                </Typography>
                    <Typography variant="body2" color="text.secondary">
                    A yoga instructor is a certified yoga teacher who conducts classes with groups of people which involves meditation and yoga poses. Create lesson plans for yoga classes.
                    </Typography>
                </CardContent>
                <CardActions sx={{paddingLeft:14,marginBottom:2}}>
                    <InstagramIcon/>
                    <LinkedInIcon/>
                    <TwitterIcon/>
                    <EmailIcon/>
                </CardActions>
            </Card>

            <Button 
                endIcon={<ArrowForwardIosIcon />}
                onClick={handleViewMoreClick}
                sx={{ 
                    marginBottom: -50, 
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
                VIEW MORE
            </Button>
        </div>

        
        </React.Fragment>
    )
}

export default Trainer