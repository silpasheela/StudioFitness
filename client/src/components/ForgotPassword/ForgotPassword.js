import React , { useState } from 'react'
import './ForgotPassword.css'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { uninterceptedApiInstance } from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';



function ForgotPassword() {

    const [isUser,setIsUser] = useState(true);
    const [formData,setFormData] = useState({email: ''});
    const [formErrors, setFormErrors] = useState({email: ''})

    const [error, setError] = useState(null);
    // const [emailSent, setEmailSent] = useState(false);

    const navigate = useNavigate(); 


    let errorData = { email: ""}

    const handleInputChange = (e) => {

        console.log(e.target)

        const {name,value} = e.target;

        console.log(name);
        console.log(value)

        setFormData((prevData) => ({
            ...prevData,
            [name] : value
            
        }));

        console.log(formData);

        setFormErrors((prevData) => ({
            ...prevData,
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

        if(!validateEmail(formData?.email)) {
            errorData.email = "Invalid email format";
            isValid = false;
        }

        setFormErrors(errorData);


        if(isValid) {
            
            const role = isUser ? "user" : "trainer";
            console.log(formData?.email)
            console.log(role)
            try {
                const {data} = await uninterceptedApiInstance.put(`${role}/reset-password`,formData);
                console.log(data)
                // setEmailSent(true);
                // let {token} = data;
                // console.log(token)
                navigate('/reset-password-email', { state: { role: role} });
            } catch (error) {
                const {response} = error;
                console.log(response?.data?.message);
                setError(response?.data?.message);
            }
        }
    }

    return(
    
        <div className='' style={{height:'100vh'}}>
        <>
        <div style={{paddingTop:'25vh'}}>
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
                    borderRadius: "10px",
                    padding: "2.5rem",
                    width: { lg: "35%", md: "35%", sm: "10rem" },
                    marginLeft: '30rem',
                    backgroundColor: 'rgba(210, 210, 210, 0.8)', 
                    backdropFilter: 'blur(8px)',
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
                            fontFamily:'inherit'
                        }}>
                            {isUser ? `User Password Reset` : `Trainer Password Reset`}
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: { lg: "1rem", md: "1rem", sm: ".7rem" },
                            color: "green",
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
                <TextField
                            label="Email" 
                            variant="outlined"
                            sx={{
                                width: "100%",
                                height: ".1rem",
                            }}
                            name='email'
                            value={formData?.email}
                            onChange={handleInputChange}
                            error={Boolean(formErrors?.email)}
                            helperText={formErrors?.email}
                            >
                </TextField>
                <Button
                            variant="contained"
                            type='submit'
                            sx={{ 
                                width: '25%', 
                                backgroundColor: '#6EC72D', 
                                color: '#161616',
                                marginTop: "3rem",
                                borderRadius: "5px", 
                                marginLeft: "12.5rem",
                                '&:hover': { backgroundColor: '#6EC72D' , color: '#fff'} 
                            }}>
                        Reset 
                </Button>
            </Box>
        </div>
        <div>
            {error && (
                <Typography
                    sx={{
                        marginLeft: "-2.5rem",
                        color: "red",
                        textAlign: "center",
                    }}>
                    {error}
                </Typography>
            )}
        </div>
        </>
        </div>
    )
}

export default ForgotPassword