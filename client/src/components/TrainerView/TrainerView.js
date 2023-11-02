import React from 'react'
import Card from '@mui/material/Card';
import { useNavigate } from 'react-router-dom';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

function TrainerView({trainer}) {

    const navigate = useNavigate();

    const handleBookNow = async () => {
        console.log("trainerid",trainer._id);
        navigate(`/user/trainer/${trainer._id}`);
    };

    //

    return (
        <Card sx={{ maxWidth: 315, boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', transition: '0.3s', borderRadius:'15px',
                '&:hover': {
                    boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
                    transform: 'scale(1.05)'
                }
            }}>
        <CardMedia
            sx={{ height: 230 }}
            image={trainer.profilePicture}
            title={trainer.fullName}
        />
        <CardContent sx={{marginBottom:'-15px',backgroundColor:'#000', color:'#fff' }}>

            <Typography gutterBottom variant="h5" component="div" sx={{fontWeight: 'bolder'}}>
            {trainer.fullName}
            </Typography>
            <Typography variant="body2" color="#6EC72D" sx={{fontStyle: 'italic',fontFamily:'inherit'}}>
            {trainer.service.service} Instructor
            </Typography>
            {/* <Typography sx={{fontSize:12,color:'#9F9F9F', textTransform: 'uppercase'}}>
            {trainer.gender}
            </Typography> */}
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <IconButton sx={{color:'#3A559F',  backgroundColor: '#fff', margin:0.5, marginTop:1.3 }}>
                <FacebookIcon />
            </IconButton>
            </a>

            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <IconButton sx={{ color: '#e95950' , backgroundColor: '#fff',  margin:0.5, marginTop:1.3 }}>
                <InstagramIcon />
            </IconButton>
            </a>

            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
            <IconButton sx={{color: '#03A9F4', backgroundColor: '#fff',  margin:0.5, marginTop:1.3 }}>
                <TwitterIcon />
            </IconButton>
            </a>

        </CardContent>
        <CardActions sx={{ justifyContent: 'center', backgroundColor:'#000' }}>
        {/* <Link to={`/user/trainer/${trainer._id}`} style={{ textDecoration: 'none' }}> */}

            <Button size="small"
                    variant="contained"  
                    fullWidth 
                    onClick={handleBookNow}                  
                    sx={{
                        fontWeight: 'bold',
                        backgroundColor: '#6EC72D', 
                        color: '#161616',
                        borderRadius: "5px", 
                        '&:hover': { backgroundColor: '#6EC72D' , color: '#fff'} 
                    }}>
                        Book now
            </Button>
            {/* </Link> */}

        </CardActions>
        </Card>
    )
}

export default TrainerView
