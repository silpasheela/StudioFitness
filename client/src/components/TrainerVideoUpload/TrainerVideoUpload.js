import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'react-toastify';
import { instance } from '../../api/axiosInstance';
import {
    Typography,
    TextField,
    Button,
    Paper,
    Box,
    Container,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';


function TrainerVideoUpload() {

    const navigate = useNavigate();


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);

    const onDrop = (acceptedFiles) => {
        setFile(acceptedFiles[0]);
        setVideoPreview(URL.createObjectURL(acceptedFiles[0]));
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'video/*',
        multiple: false,
    });

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('video', file);
            formData.append('title', title);
            formData.append('description', description);
    
            const response = await instance.post('trainer/upload-class', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            });
    
            console.log(response.data.message);
            setTitle('');
            setDescription('');
            setFile(null);
            setVideoPreview(null);

            toast.success('Video uploaded successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            navigate('/trainer/dashboard');

        } catch (error) {
            console.error('Error uploading video:', error);
            toast.error(`${error?.response?.data?.message}`, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <Container component="main" maxWidth="sm" sx={{paddingTop:'15vh',minHeight:'100vh'}}>
            <Paper elevation={3} style={paperStyle}>
            <Typography variant="h5" style={headerStyle}>
                Trainer Class Upload
            </Typography>
            <Box style={inputContainerStyle}>
                <TextField
                label="Title"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
            </Box>
            <Box style={inputContainerStyle}>
                <TextField
                label="Description"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                />
            </Box>
            {videoPreview && (
                <Box style={videoPreviewContainerStyle}>
                <Typography variant="subtitle1">Video Preview:</Typography>
                <video controls width="100%">
                    <source src={videoPreview} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                </Box>
            )}
            <Box {...getRootProps()} style={dropzoneStyles}>
                <input {...getInputProps()} />
                <Typography sx={{fontFamily:'cursive', color:'GrayText'}}>Drag 'n' drop a video file here, or click to select a file</Typography>
            </Box>
            <Button onClick={handleUpload} variant="contained" color="primary" style={uploadButtonStyle}>
                Upload Video
            </Button>
            </Paper>
        </Container>
    );
};

const paperStyle = {
    padding: '20px',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)', 
    backdropFilter: 'blur(10px)',
    borderRadius: '10px',
    marginTop: '50px',
};

const headerStyle = {
    color: 'green',
    marginBottom: '20px',
    fontSize:'30px',
    fontWeight:'bold'
};

const inputContainerStyle = {
    margin: '10px 0',
};


const videoPreviewContainerStyle = {
    margin: '20px 0',
    textAlign: 'left',
};

const dropzoneStyles = {
    border: '2px dashed #cccccc',
    borderRadius: '10px',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    marginTop: '20px',
    backgroundColor: '#fafafa',
};

const uploadButtonStyle = {
    marginTop: '20px',
    backgroundColor: '#6EC72D',
    color: '#000',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
    '&:hover': { backgroundColor: '#fff' , color: '#6EC72D'} 
};

export default TrainerVideoUpload