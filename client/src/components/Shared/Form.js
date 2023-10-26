import React, { useState,useEffect } from 'react'
import {instance,uninterceptedApiInstance} from '../../api/axiosInstance'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Grid";
import { Typography, Button } from '@mui/material';
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { API_ENDPOINTS } from '../../constants/endpoints';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../app/features/Auth/authSlice';
import LockResetIcon from '@mui/icons-material/LockReset';
import GoogleIcon from '@mui/icons-material/Google';
import Tooltip from '@mui/material/Tooltip';




function Form({formType}) {


    const [isUser,setIsUser] = useState(true);

    const data = formType === 'signup' ?
                    {
                        fullName: '',
                        email: '',
                        mobileNumber: '',
                        password: '',
                        confirmPassword: ''
                    } : 
                    {
                        email: '',
                        password: ''
                    }

    const [formData,setFormData] = useState(data);

    const [formErrors, setFormErrors] = useState({
        fullName: '',
        email: '',
        mobileNumber: '',
        password: '',
        confirmPassword: ''
    })

    const [error, setError] = useState(null);

    let errorData = { email: "", password: "", name: "", mobileNumber: "", confirmPassword: "" };

    const navigate = useNavigate(); 
    const dispatch = useDispatch();

    const [searchParams] = useSearchParams()


    useEffect(() => {
        const status = searchParams.get("authentication")
        if (status === "failed") {
            setError("Google authentication failed")
        }
    }, [])   



    const handleGoogleAuth = async () => {
        try {
            const test = window.open("http://localhost:4000/user/auth/google", "_self")
            console.log("oi",test)
        } catch (error) {
            console.log(error)
        }
    }
    



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

    const validateMobile = (mobileNumber) => {
        const re = /^[0-9]{10}$/;
        return re.test(mobileNumber);
    };

    const validatePassword = (password) => {
        const re = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(password);
    };

    const passwordsMatch = (password, confirmPassword) => {
        return password === confirmPassword;
    };

    const handleSubmit = async(e) => {
        
        e.preventDefault();
        let isValid = true;

        if(formType === 'signup') {

            // if(formData.name.length < 5) {
            //     errorData.name  = "Name must be at least 5 characters";
            //     isValid = false;
            // }
    
            if(/\d/.test(formData.name)) {
                errorData.name = "Name must not include digits";
                isValid = false;
            }
    
            if(!validateMobile(formData.mobileNumber)) {
                errorData.mobileNumber = "Invalid mobile number";
                isValid = false;
            }
            if(!validatePassword(formData.password)) {
                errorData.password = "Password must include least one uppercase letter, lowercase letter, number and special character";
                isValid = false;
            }
    
            if(!passwordsMatch) {
                errorData.confirmPassword = `Password doesn't match`;
                isValid = false;
            }
        }

        if(!validateEmail(formData.email)) {
            errorData.email = "Invalid email format";
            isValid = false;
        }

        setFormErrors(errorData);

        if(isValid) {
            const role = isUser ? "user" : "trainer";

            if(formType === 'signup') {

                try {
                    const {data} = await uninterceptedApiInstance.post(API_ENDPOINTS.SIGNUP(role), formData);
                    // const data = await instance.post(`http://localhost:4000/${role}/signup`,formData)
                    console.log(data);
                    navigate('/login');
                } catch (error) {
                    const {response} = error;
                    console.log(response)
                    setError(response?.data?.message);
                }
            } else {
                try {
                    const {data} = await uninterceptedApiInstance.post(API_ENDPOINTS.LOGIN(role), formData);
                    // const data = await instance.post(`http://localhost:4000/${role}/login`,formData)
                    console.log(data);
                    localStorage.setItem('user',JSON.stringify(data?.user));
                    dispatch(setAuth());
                    navigate(`/${role}/dashboard`);
                } catch (error) {
                    const {response} = error;
                    console.log(response);
                    setError(response?.data?.message);
                }
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
                    <img src='https://www.pngall.com/wp-content/uploads/2018/04/Gym-Download-PNG.png' style={{width: "25rem", height: "25rem"}} alt=''/>
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
                                {isUser ? `User ${formType.charAt(0).toUpperCase() + formType.slice(1)}` : `Trainer ${formType.charAt(0).toUpperCase() + formType.slice(1)}`}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: { lg: "1rem", md: "1rem", sm: ".7rem" },
                                color: "#6EC72D",
                                paddingTop: { lg: ".6rem", md: ".5rem", sm: ".2rem" },
                                cursor: "pointer",   
                                '&:hover': {
                                    color: '#848b94',
                                },
                                textDecoration: 'none',                                 
                            }}
                            onClick = {() => setIsUser(!isUser)}>
                            {isUser ? 'Are you a trainer ?' : 'Are you a user ?'}
                        </Typography>
                    </Box>
                    {formType === 'signup' && (
                        <>
                            <TextField
                                label="Full Name" 
                                variant="outlined"
                                sx={{
                                    width: "100%",
                                    height: ".1rem",
                                }}
                                name='fullName'
                                value={formData.fullName}
                                onChange={handleInputChange}
                                error={Boolean(formErrors.fullName)}
                                helperText={formErrors.fullName}>
                            </TextField>
                        </>
                    )}
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
                    {formType === 'signup' && (
                        <TextField
                            label="Mobile" 
                            variant="outlined"
                            sx={{
                                width: "100%",
                                height: ".1rem",
                            }}
                            name='mobileNumber'
                            value={formData.mobileNumber}
                            onChange={handleInputChange}
                            error={Boolean(formErrors.mobileNumber)}
                            helperText={formErrors.mobileNumber}>
                        </TextField>
                    )}
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
                    {formType === 'signup' && (
                        <TextField
                            label="Confirm Password" 
                            variant="outlined"
                            sx={{
                                width: "100%",
                                height: ".1rem",
                            }}
                            name='confirmPassword'
                            type= "password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            error={Boolean(formErrors.confirmPassword)}
                            helperText={formErrors.confirmPassword}>
                        </TextField>
                    )}
                    {formType === 'login' && (
                        <div style={{ display: 'flex', alignItems: 'center', marginInlineStart:'0px' }}>
                            <LockResetIcon />
                                <Typography
                                        sx={{
                                            fontSize: { lg: '1rem', md: '.8rem', sm: '.8rem' },
                                            color: '#6EC72D',
                                            cursor: "pointer",
                                            '&:hover': {
                                                color: '#848b94',
                                            },
                                            textDecoration: 'none',
                                            marginLeft: '5px'
                                        }}
                                        component={Link}
                                        to={'/forgot-password'}>
                                    Forgot password ?
                                </Typography>
                                
                        </div>  
                        
                    )}
                    <Tooltip title="Signup with Google">
                    <Button
                        type="button"
                        variant="outlined"
                        sx={{ width:10, height:55, color:'black', borderRadius:20, borderColor:'#88C13E','&:hover': {
                                backgroundColor: 'black', 
                                color: 'white',
                                borderColor:'black'
                            } }}
                        size="small"
                        onClick={handleGoogleAuth}
                    >
                    {<GoogleIcon />}
                    </Button>
                    </Tooltip>

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
                            marginTop: "-2.5rem",
                            borderRadius: "5px", 
                            marginLeft: "11rem",
                            '&:hover': { backgroundColor: '#6EC72D' , color: '#fff'} 
                        }}>
                        {formType.toUpperCase()}
                    </Button>

                    <Typography
                        sx={{
                            fontSize: { lg: "1rem", md: ".8rem", sm: ".8rem" },
                            cursor: "pointer",
                            textDecoration: "none",
                            color: "#6EC72D",
                            marginTop: "-6.4rem",
                            marginBottom: "-3.4rem",
                            "&:hover": {
                                color: "#848b94",
                            },
                        }}
                        component={Link}
                        to={`/${formType === 'signup' ? 'login' : 'signup'}`}
                        >
                        {formType === 'signup' ? 'Already have account ?' : `Don't have an account ?`}
                    </Typography>
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

export default Form;