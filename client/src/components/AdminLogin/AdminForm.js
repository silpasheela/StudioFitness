import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid";
import { Typography, Button } from '@mui/material';
import { uninterceptedApiInstance } from '../../api/axiosInstance';
import { setAuth } from '../../app/features/Auth/authSlice';


function AdminForm() {

    const [formData,setFormData] = useState({
        email:'',
        password:''
    });

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
    })

    const [error, setError] = useState(null);

    let errorData = { email: "", password: ""};

    const navigate = useNavigate(); 
    const dispatch = useDispatch();


    const handleInputChange = (e) => {

        const {name,value} = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name] : value
        }));

        setFormErrors((prev) => ({
            ...prev,
            [name] : ''
        }));
    }

    const validateEmail = (email) => {
        const re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return re.test(email);
    };

    const handleSubmit = async(e) => {
        
        e.preventDefault();
        let isValid = true;

        if(!validateEmail(formData.email)) {
            errorData.email = "Invalid email format";
            isValid = false;
        }

        setFormErrors(errorData);

        if(isValid) {

            let role = "admin"

            try {
                const {data} = await uninterceptedApiInstance.post(`https://studio.time-shift.shop/${role}/login`,formData)
                localStorage.setItem('user',JSON.stringify(data?.admin));
                dispatch(setAuth());
                navigate(`/admin/dashboard`);
            } catch (error) {
                const {response} = error;
                setError(response?.data?.message);
            }
        }
    }

    return (
        <Grid
            container
            sx = {{
                height: "78vh",
                justifyContent: "center",
                alignContent: "center",
                marginTop: "1rem",
                marginLeft: "-50px"
            }}
            spacing = {1}>
            <Grid
                item
                sx={{
                    display: { lg: "flex", md: "flex", sm: "none", xs: "none" },
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    width: { lg: "30rem", md: "50%" },
                }}>
                <Box sx={{
                    textAlign: 'center',
                    marginLeft: '-10rem'
                }}>
                    <img src='https://res.cloudinary.com/djd2rpgil/image/upload/v1699891406/theme/o7h0yeecny118945ytmx.png' style={{width: "25rem", height: "25rem"}} alt=''/>
                </Box>
            </Grid>
            <Grid
                item
                sx={{
                    width: { lg: "30rem", md: "50%" }
                }}>
                <Box
                    component='form'
                    autoComplete='off'
                    onSubmit={(e) => {
                        handleSubmit(e)
                    }}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "75px",
                        borderRadius: "5px",
                        padding: "1.5rem",
                        width: { lg: "100%", md: "100%", sm: "20rem" },
                        marginLeft: '2.5rem'
                    }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginBottom: "-3rem",
                        }}>
                        <Typography
                            sx={{
                                color:'#000',
                                fontSize: { lg: "1.6rem", md: "1rem", sm: ".9rem" },
                            }}>
                                {`Admin Login`}
                        </Typography>
                    </Box>
                    <TextField
                        label="Email" 
                        variant="outlined"
                        sx={{
                            width: "100%",
                            height: ".1rem",
                        }}
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        error={Boolean(formErrors.email)}
                        helperText={formErrors.email}>
                    </TextField>
                    <TextField
                        label="Password" 
                        variant="outlined"
                        sx={{
                            width: "100%",
                            height: ".1rem",
                        }}
                        name='password'
                        type= "password"
                        value={formData.password}
                        onChange={handleInputChange}
                        error={Boolean(formErrors.password)}
                        helperText={formErrors.password}>
                    </TextField>

                    <Box
                        sx={{
                        display: "flex",
                        justifyContent: "end",
                        }}>

                    <Button
                        variant="contained"
                        type='submit'
                        sx={{ 
                            width: '25%', 
                            backgroundColor: '#6EC72D', 
                            color: '#161616',
                            marginTop: "3rem",
                            borderRadius: "5px", 
                            marginLeft: "11rem",
                            '&:hover': { backgroundColor: '#6EC72D' , color: '#fff'} 
                        }}>
                        Login
                    </Button>
                </Box>
            </Box>
                {error && (
                    <Typography
                        sx={{
                            marginLeft: "2rem",
                            color: "red",
                            textAlign: "center",
                        }}>
                        {error}
                    </Typography>
                )}
            </Grid>
        </Grid>
    );
}

export default AdminForm