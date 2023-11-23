import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import './UserProfileEdit.css'
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid, Input } from '@mui/material';
import { Avatar, Button, Card, CardActions, CardContent, Divider, CardHeader, TextField, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import { useNavigate } from 'react-router-dom';
import { instance } from '../../api/axiosInstance';



function UserProfileEdit() {
        

    const navigate = useNavigate();

    const [userId, setUserId] = useState(null);

    const [formData, setFormData] = useState({
        
        fullName:'',
        dateOfBirth:'',
        gender:'',
        mobileNumber:'',
        address: {
            street: '',
            city: '',
            state: '',
            zip: '',
        },
        age:'',
        weight:'',
        height:'',
    });

    const [initialFormData, setInitialFormData] = useState(formData);

    const [editedUser, setEditedUser] = useState(null);

    const [fileData, setFileData] = useState({
        profilePicture:'',
        bio: '',
    })

    const [editedProfileImage, setEditedProfileImage] = useState(null)



    const [formErrors, setFormErrors] = useState({

        mobileNumber: '',
        age: '',
        weight: '',
        height: ''
    })

    // const [error, setError] = useState(null);

    let errorData = { mobileNumber: "", age: "", weight: "", height: "" };


    const validateMobile = (mobileNumber) => {
        const re = /^[0-9]{10}$/;
        return re.test(mobileNumber);
    };

    const validateAge = (age) => {
        // Check if age is a positive integer
        return /^\d+$/.test(age) && age > 0;
    };

    const validateHeight = (height) => {
        // Check if height is a positive number
        return /^[0-9]+(\.[0-9]+)?$/.test(height) && height > 0;
    };

    const validateWeight = (weight) => {
        // Check if weight is a positive number
        return /^[0-9]+(\.[0-9]+)?$/.test(weight) && weight > 0;
    };


    const fetchData = async () => {

        try {
            const {data} = await instance.get(`user/dashboard`);
            console.log("mine", data);
            console.log("ID:", data.user._id);
            setUserId(data.user._id);
            setFormData({...data.user,_id:undefined});
            //
            setInitialFormData({...data.user,_id:undefined});

        } catch (error) {
            console.log(error)

        }
    };

    useEffect(() => {    
        fetchData();
    }, []);

    
    const handleChange = (e) => {
        const { name, value } = e.target;
        // If the input field is inside the address object, handle it separately
        if (name.startsWith('address.')) {
            const addressField = name.split('.')[1];
            setFormData({
                ...formData,
                address: {
                ...formData.address,
                [addressField]: value,
                },
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    //

    const handleSubmit = async (e) => {
        e.preventDefault();
        let isValid = true;

        console.log(formData)

        if(!validateMobile(formData.mobileNumber)) {
            errorData.mobileNumber = "Invalid mobile number";
            isValid = false;
        }

        if(!validateAge(formData.age)) {
            errorData.age = "Invalid Age";
            isValid = false;
        }

        if(!validateHeight(formData.height)) {
            errorData.height = "Invalid Height";
            isValid = false;
        }

        if(!validateWeight(formData.weight)) {
            errorData.weight = "Invalid Weight";
            isValid = false;
        }

        setFormErrors(errorData);

        if(isValid) {
            if (JSON.stringify(formData) !== JSON.stringify(initialFormData)) {
                try {
                    const {data} = await instance.put(`user/editprofile/${userId}`,formData);
                    console.log(data)
                    setFormData({...data?.user,_id:undefined})
                    toast.success('Profile updated successfully!', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    navigate('/user/dashboard');
                } catch (error) {
                    console.log(error); 
                    toast.error('Error in updating profile', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            } else {
                // Display an info toast message when no changes have been made
                toast.info('No changes were made.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                navigate('/user/dashboard');
            }
        }
    };

    const handleProfileImageChange = (e) => {
        const imageFile = e.target.files[0];
        setEditedProfileImage(imageFile);

    };



    const uploadImage = async(e) => {

        try {
            const imageFormData = new FormData();
            imageFormData.append('profilePicture', editedProfileImage);
            imageFormData.append('bio', editedUser.bio);
        
            const response = await instance.put(`user/editimage/${userId}`, imageFormData);
            setFileData(response.data);
            console.log("filedata",fileData)
            setEditedUser(response.data);
            console.log("editeddata",editedUser)
            toast.success('Profile Picture uploaded successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        } catch (error) {
            console.log(error);
            toast.success('Profile updated successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }); 
        }
    }


    return (
        <Stack sx={{marginTop:'4.5rem'}}>
        <Box
            component="main"
            sx={{
            flexGrow: 1,
            py: 8
            }}
        >
            <Container maxWidth="lg">
            <Stack spacing={3}>
                <div>
                {/* <Typography variant="h4" 
                // sx={{color:'#6EC72D'}}
                >
                    Account Settings
                </Typography> */}
                </div>
                <div>
                <Grid
                    container
                    spacing={3}
                >
                    <Grid
                    xs={12}
                    md={6}
                    lg={4}
                    >
                    {/* <AccountProfile /> */}
                    <Card 
                    // sx={{backgroundColor:'#000',borderRadius:5}}
                    >
                        <CardContent>
                        <Box
                            sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexDirection: 'column'
                            }}
                        >
                            <label htmlFor="profileImageInput">
                                <Avatar
                                src={editedProfileImage?URL.createObjectURL(editedProfileImage):formData.profilePicture}
                                sx={{
                                    height: 120,
                                    mb: 2,
                                    width: 120,
                                    cursor: 'pointer'
                                }}
                                />
                            </label>
                            <Input
                                type="file"
                                accept="image/*"
                                id="profileImageInput"
                                onChange={handleProfileImageChange}
                                sx={{ display: 'none' }}
                            />

                            <Typography
                            gutterBottom
                            variant="h5"
                            sx={{
                                fontWeight: 'bold',
                                color: '#6EC72D',
                                textTransform: 'uppercase',
                                letterSpacing: '0.1em',
                                textAlign: 'center',
                            }}
                            >
                            {formData.fullName}
                            </Typography>
                            <Typography
                            color="text.secondary"
                            variant="body2"
                            paddingTop={'20px'}
                            >
                            About
                            </Typography>
                            <TextField
                                fullWidth
                                // sx={{color:'white', borderColor:'white'}}
                                name="bio"
                                onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                                required
                                multiline
                                value={editedUser?.bio ? editedUser?.bio : formData?.bio}

                            />
                        </Box>
                        </CardContent>
                        <Divider />
                        <CardActions>
                        <Button
                            fullWidth
                            variant="text"
                            onClick={uploadImage}
                            // type='submit'
                            sx={{
                                    backgroundColor: '#6EC72D', 
                                    color: '#161616',
                                    borderRadius: "5px", 
                                    '&:hover': { backgroundColor: '#6EC72D' , color: '#fff'} 
                                }}>
                            Upload
                        </Button>
                        </CardActions>
                    </Card>
                    </Grid>
                    <Grid
                    xs={12}
                    md={6}
                    lg={8}
                    >
                    {/* <AccountProfileDetails /> */}
                    <form
                        autoComplete="off"
                        noValidate
                        onSubmit={handleSubmit}
                    >
                        <Card>
                        <CardHeader
                            subheader="The information can be edited"
                            title="Profile"
                        />
                        <CardContent sx={{ pt: 0, paddingLeft:5, paddingRight:5 }}>
                            <Box sx={{ m: -1.5 }}>
                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid
                                xs={12}
                                md={6}
                                >
                                <TextField
                                    fullWidth
                                    helperText="Name can't be edited"
                                    label="Full name"
                                    name="fullName"
                                    onChange={handleChange}
                                    value={formData?.fullName}
                                    disabled
                                />
                                </Grid>
                                <Grid
                                xs={12}
                                md={6}
                                >
                                <TextField
                                    fullWidth
                                    label="Birthday"
                                    name="dateOfBirth"
                                    onChange={handleChange}
                                    required
                                    value={new Date(formData?.dateOfBirth).toLocaleDateString()}
                                />
                                </Grid>
                                <Grid
                                xs={12}
                                md={6}
                                >
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    name="mobileNumber"
                                    onChange={handleChange}
                                    // type="number"
                                    value={formData?.mobileNumber}
                                    error={Boolean(formErrors.mobileNumber)}
                                    helperText={formErrors.mobileNumber}
                                />
                                </Grid>
                                <Grid
                                xs={12}
                                md={6}
                                >
                                <TextField
                                    fullWidth
                                    label="Street"
                                    name="address.street"
                                    onChange={handleChange}
                                    required
                                    value={formData?.address?.street}
                                >
                                </TextField>
                                </Grid>
                                <Grid
                                xs={12}
                                md={6}
                                >
                                <TextField
                                    fullWidth
                                    label="City"
                                    name="address.city"
                                    onChange={handleChange}
                                    required
                                    value={formData?.address?.city}
                                />
                                </Grid>
                                <Grid
                                xs={12}
                                md={6}
                                >
                                <TextField
                                    fullWidth
                                    label="State"
                                    name="address.state"
                                    onChange={handleChange}
                                    required
                                    value={formData?.address?.state}
                                >
                                </TextField>
                                
                                </Grid>
                                <Grid
                                xs={12}
                                md={6}
                                >
                                <TextField
                                    fullWidth
                                    label="Zip Code"
                                    name="address.zip"
                                    onChange={handleChange}
                                    required
                                    value={formData?.address?.zip}
                                >
                                </TextField>
                                </Grid>
                                <Grid
                                xs={12}
                                md={6}
                                >
                                <TextField
                                    fullWidth
                                    label="Age"
                                    name="age"
                                    onChange={handleChange}
                                    required
                                    value={formData?.age}
                                    error={Boolean(formErrors.age)}
                                    helperText={formErrors.age}
                                />
                                </Grid>
                                <Grid
                                xs={12}
                                md={6}
                                >
                                <TextField
                                    fullWidth
                                    id="outlined-start-adornment"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                                    }}
                                    label="Weight"
                                    name="weight"
                                    onChange={handleChange}
                                    required
                                    value={formData?.weight}
                                    error={Boolean(formErrors.weight)}
                                    helperText={formErrors.weight}
                                />
                                </Grid>
                                <Grid
                                xs={12}
                                md={6}
                                >
                                <TextField
                                    fullWidth
                                    id="outlined-start-adornment"
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">cm</InputAdornment>,
                                    }}
                                    label="Height"
                                    name="height"
                                    onChange={handleChange}
                                    required
                                    value={formData?.height}
                                    error={Boolean(formErrors.height)}
                                    helperText={formErrors.height}
                                />
                                </Grid>
                                <Grid
                                xs={12}
                                md={6}
                                >
                                <Typography>Gender</Typography>
                                <RadioGroup
                                    row  
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel
                                    value="male"
                                    control={<Radio                 
                                    sx={{
                                        color: '#6EC72D',
                                        '&.Mui-checked': {
                                            color: '#6EC72D', 
                                        } 
                                    }}/>}
                                    label="Male"
                                    />
                                    <FormControlLabel
                                    value="female"
                                    control={<Radio                 
                                    sx={{
                                        color: '#6EC72D', 
                                        '&.Mui-checked': {
                                            color: '#6EC72D', 
                                        }
                                    }} />}
                                    label="Female"
                                    />
                                    <FormControlLabel
                                    value="other"
                                    control={<Radio                 
                                    sx={{
                                        color: '#6EC72D', 
                                        '&.Mui-checked': {
                                            color: '#6EC72D', 
                                        }
                                    }} />}
                                    label="Other"
                                    />
                                </RadioGroup>
                                </Grid>
                            </Grid>
                            </Box>
                        </CardContent>
                        <Divider />
                        <CardActions sx={{ justifyContent: 'flex-end',paddingLeft:5, paddingRight:5 }}>
                            <Button variant="contained" type='submit'
                                sx={{
                                    backgroundColor: '#6EC72D', 
                                    color: '#161616',
                                    borderRadius: "5px", 
                                    '&:hover': { backgroundColor: '#6EC72D' , color: '#fff'} 
                                }}>
                            Save details
                            </Button>
                            <Button variant="contained" 
                                    onClick={() => navigate('/user/dashboard')}
                                    sx={{
                                        backgroundColor: '#161616', 
                                        color: '#6EC72D',
                                        borderRadius: "5px", 
                                        '&:hover': { backgroundColor: '#161616' , color: '#fff'} 
                                    }}>
                            Cancel
                            </Button>
                        </CardActions>
                        </Card>
                    </form>
                    </Grid>
                </Grid>
                </div>
            </Stack>
            </Container>    
        </Box>
        </Stack>
    )
}

export default UserProfileEdit  