import React, { useState } from 'react'
import { TextField, Button } from '@mui/material';
import { Typography } from '@mui/material';
import Toaster from '../Shared/Toaster';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { useNavigate, useParams } from 'react-router-dom';
import { instance } from '../../api/axiosInstance';


function ResetPassword() {

    const [showToaster, setShowToaster] = useState(false);

    const showSuccessToaster = (message) => {
      toast.success(message);
      setShowToaster(true);
    };
  
    const showErrorToaster = (message) => {
      toast.error(message);
      setShowToaster(true);
    };

    const { role, token } = useParams();


    const [formData,setFormData] = useState({
        newPassword: '',
        confirmPassword: ''
    });

    const [formErrors, setFormErrors] = useState({
        newPassword: '',
        confirmPassword: ''
    })

    const [error, setError] = useState(null);

    let errorData = {newPassword: "", confirmPassword: "" };

    const navigate = useNavigate();


    const handleInputChange = (e) => {

        const {name,value} = e.target;

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

    const validatePassword = (password) => {
        const re = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return re.test(password);
    };

    const passwordsMatch = (newPassword, confirmPassword) => {
        return newPassword === confirmPassword;
    };

    const handleSubmit = async(e) => {

        e.preventDefault();
        let isValid = true;

        if(!validatePassword(formData.newPassword)) {
            errorData.newPassword = "Password must include least one uppercase letter, lowercase letter, number and special character";
            isValid = false;
        }

        if(!passwordsMatch) {
            errorData.confirmPassword = `Password doesn't match`;
            isValid = false;
        }

        setFormErrors(errorData);

        if(isValid) {

            try {
                const {data} = await instance.put(`http://localhost:4000/${role}/new-password`,formData,token);
                console.log(data)
                showSuccessToaster('Password reset successfully'); // Show success notification
                navigate('/login')
            } catch (error) {
                const {response} = error;
                console.log(response.data.message);
                setError(response.data.message);
                showErrorToaster('Password reset failed'); // Show error notification
            }

        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',paddingTop:'12rem' }}>
            <h1>Reset Password</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '300px', gap: '15px',  }}>
                <TextField
                    label="New Password"
                    type="password"
                    variant="outlined"
                    name='newPassword'
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    error={Boolean(formErrors.newPassword)}
                    helperText={formErrors.newPassword}
                />
                <TextField
                    label="Confirm New Password"
                    type="password"
                    variant="outlined"
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    error={Boolean(formErrors.confirmPassword)}
                    helperText={formErrors.confirmPassword}
                />
                <Button 
                        variant="contained"
                        type='submit'
                        sx={{ 
                            width: '60%', 
                            backgroundColor: '#6EC72D', 
                            color: '#161616',
                            marginTop: "1rem",
                            borderRadius: "5px", 
                            marginLeft: "4rem",
                            '&:hover': { backgroundColor: '#6EC72D' , color: '#fff'} 
                        }}>
                    Reset Password
                </Button>
            </form>

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
            {showToaster && <Toaster />}
        </div>
        
    );  
}

export default ResetPassword