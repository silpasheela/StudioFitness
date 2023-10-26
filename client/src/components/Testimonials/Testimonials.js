import React from 'react'
import './Testimonials.css'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function Testimonials() {
    return (
        <React.Fragment>
        <div className="section-title">
        <h1 className="title">Our Client says</h1>
        </div>
        <div className='clientcard' style={{display:'flex', justifyContent:'center'}}>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 300 }}
                    image="https://img.freepik.com/premium-photo/woman-gym-with-blur-background-ai_431161-15100.jpg?size=626&ext=jpg&ga=GA1.1.967060102.1696464000&semt=ais"
                    title=""
                />
                <CardContent sx={{backgroundColor:'#000', borderRadius:'15px'}}>
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bolder', color:'#fff'}}>
                    Brenda Frazier
                </Typography>
                    <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#99D76C' ,fontFamily: 'cursive'}}>
                    "Fitness within is the cleanest and most organized gym I've ever seen! I have no words to say how wonderful they are! Domenic makes you feel super comfortable, Kaitlyn helps you eat better and healthy!"
                    </Typography>
                </CardContent>
            </Card>

            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 300 }}
                    image="https://img.freepik.com/premium-photo/smiling-beautiful-very-cute-face-fit-girl-standing-gym-wearing-top-clothing_935410-747.jpg"
                    title=""
                />
                <CardContent sx={{backgroundColor:'#000', borderRadius:'15px'}}>
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bolder', color:'#fff'}}>
                    Vivian Estrada
                </Typography>
                    <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#99D76C',fontFamily: 'cursive' }}>
                    "Since joining Fitness Within one year ago, I have become stronger and I have lost 38lbs.  The workouts are always different, hard and fun!  The trainers will push you harder than though you could go."
                    </Typography>
                </CardContent>
            </Card>

            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 300 }}
                    image="https://img.freepik.com/premium-photo/handsome-athletic-man-smiling-looking-camera-fitness-trainer-gym-jock_826801-5771.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1696291200&semt=ais"
                    title=""
                />
                <CardContent sx={{backgroundColor:'#000', borderRadius:'15px'}}>
                    <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bolder', color:'#fff'}}>
                    Martin Alex
                </Typography>
                    <Typography variant="body2" sx={{ fontStyle: 'italic', color: '#99D76C', fontFamily: 'cursive',}}>
                    "I will have been training at Fitness Within 3 years December 2020. Since working out here I am stronger and in better shape than at any other time in my life. I find every class and every trainer are different.!"
                    </Typography>
                </CardContent>
            </Card>



        </div>
        </React.Fragment>
    )
}

export default Testimonials