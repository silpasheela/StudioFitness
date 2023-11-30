import React, { useState, useEffect } from 'react';
import {
    Card,
    CardActionArea,
    CardContent,
    Typography,
    Container,
    Grid,
    CircularProgress,
    TextField,
    Box
} from '@mui/material';
import { instance } from '../../api/axiosInstance';
import ReactPlayer from 'react-player';


function UserViewClasses() {

    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchVideos = async () => {

        try {
        const response = await instance.get('user/view-classes');
        setVideos(response.data.videos);
        setLoading(false);
        console.log("my vdos", response);

        } catch (error) {
        console.error('Error fetching videos:', error);
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredVideos = videos.filter((video) =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container sx={{marginTop:'20vh'}}>
        <Typography variant="h3" gutterBottom sx={{fontFamily:'inherit', fontWeight:'bolder'}}>
            My Classes
        </Typography>
        <Box display="flex" marginBottom="25px">
            <TextField
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width:'25%',}}
            sx={{'& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#6EC72D',
                        color:'#000',
                        fontWeight:'bolder',
                        borderRadius: '50px',
                    },
                    '&:hover fieldset': {
                        borderColor: '#6EC72D',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#6EC72D',
                    },
                },
                '& .MuiInputLabel-root': {
                    '&.Mui-focused': {
                        color: '#6EC72D',
                    },
                },}}
            />
        </Box>
        {loading ? (
            <CircularProgress />
        ) : (
            <Grid container spacing={3}>
            {filteredVideos.map((video) => (
                <Grid item key={video?._id} xs={12} sm={6} md={4}>
                <Card style={{ borderRadius: '20px' }}>
                    <CardActionArea>
                    <ReactPlayer
                        url={video?.fileUrl}
                        controls={true}
                        width="100%"
                        height="200px"
                    />
                    <CardContent
                        sx={{
                        minHeight: '100px',
                        backgroundColor: '#000',
                        color: '#6EC72D',
                        }}
                    >
                        <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ fontWeight: 'bolder' }}
                        >
                        {video?.title}
                        </Typography>
                        <Typography
                        variant="body2"
                        color="#fff"
                        fontFamily={'inherit'}
                        fontStyle={'italic'}
                        >
                        {video?.description}
                        </Typography>
                    </CardContent>
                    </CardActionArea>
                </Card>
                </Grid>
            ))}
            </Grid>
        )}
        </Container>
    );
}

export default UserViewClasses;
