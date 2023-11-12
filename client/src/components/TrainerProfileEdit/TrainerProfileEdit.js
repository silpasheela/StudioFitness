import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid, Input, InputLabel, Select, MenuItem } from '@mui/material';
import { Avatar, Button, Card, CardActions, CardContent, Divider, CardHeader, TextField, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from 'react-router-dom';
import { instance } from '../../api/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { viewAllServices } from '../../app/features/Data/dataSlice';


function TrainerProfileEdit() {

    const navigate = useNavigate();

    const [userId, setUserId] = useState(null);

    const [formData, setFormData] = useState({
        
        fullName:'',
        gender:'',
        mobileNumber:'',
            street: '',
            city: '',
            state: '',
            zip: '',
        qualification:'',
        certificate:'',
        service:'',
    });

    const [initialFormData, setInitialFormData] = useState(formData);


    const [editedUser, setEditedUser] = useState(null);

    const [fileData, setFileData] = useState({
        profilePicture:'',
        // bio: '',
    })

    const [editedProfileImage, setEditedProfileImage] = useState(null)

    const [editedCertificate, setEditedCertificate] = useState(null)


    const dispatch = useDispatch();


    // eslint-disable-next-line no-unused-vars
    const [formErrors, setFormErrors] = useState({

        mobileNumber: '',

    })

    let errorData = { mobileNumber: "",  };

    const [certificatePreview, setCertificatePreview] = useState(null);


    const validateMobile = (mobileNumber) => {
        const re = /^[0-9]{10}$/;
        return re.test(mobileNumber);
    };

    const fetchData = async () => {

        try {
            const {data} = await instance.get(`trainer/dashboard`);
            console.log("mine", data);
            console.log("ID:", data.trainer._id);
            setUserId(data.trainer._id);
            setFormData({...data.trainer,_id:undefined})

            setInitialFormData({...data.trainer,_id:undefined});

        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {    
        fetchData();
        //
        dispatch(viewAllServices());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const servicedata = useSelector((state) => state.data?.data?.services)
    console.log(servicedata)
    
    const handleChange = (e) => {
        const { name, value } = e.target;
            setFormData({
                ...formData,
                [name]: value,
            });
        console.log("inside handlechange",formData);
    };

    const handleCertificateChange = (e) => {
        const file = e.target.files[0];
        console.log('Selected certificate file:', file);
        setEditedCertificate(file)

        const filePreview = URL.createObjectURL(file);
        setCertificatePreview(filePreview);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)

        let isValid = true;

        if(!validateMobile(formData.mobileNumber)) {
            errorData.mobileNumber = "Invalid mobile number";
            isValid = false;
        }

        setFormErrors(errorData);

        if(isValid) {

            const {
                mobileNumber,
                street,
                city,
                state,
                zip,
                qualification,
                service,
                gender,
            } = formData;
        
            //
            if (JSON.stringify(formData) !== JSON.stringify(initialFormData)) {

                try {
                    const trainerData = new FormData();

                    trainerData.set('mobileNumber', mobileNumber);
                    trainerData.set('street', street);
                    trainerData.set('city', city);
                    trainerData.set('state', state);
                    trainerData.set('zip', zip);
                    trainerData.set('qualification', qualification);
                    trainerData.set('certificate', editedCertificate);
                    trainerData.set('service', service);
                    trainerData.set('gender', gender);

                    const dataObject = Object.fromEntries(trainerData);

                    // console.log("my trainer data", {dataObject});
                    const {data} = await instance.put(`trainer/editprofile/${userId}`,dataObject,
                    {    headers: {
                        'Content-Type': 'multipart/form-data',
                    }}
                    );
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
                    navigate('/trainer/dashboard');
                } catch (error) {
                    console.log(error); 
                    toast.error('Profile updation failed!', {
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
            // imageFormData.append('bio', editedUser.bio);
        
            const response = await instance.put(`trainer/editimage/${userId}`, imageFormData);
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
            toast.error('Profile Picture uploading failed!', {
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
                {/* <Typography variant="h4" sx={{color:'#6EC72D'}}>
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
                    <Card sx={{backgroundColor:'#000',borderRadius:5}}>
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
                                color: '#fff',
                                textTransform: 'uppercase',
                                // letterSpacing: '0.1em',
                                textAlign: 'center',
                                fontFamily:'revert'
                            }}
                            >
                            {formData.fullName}
                            </Typography>
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
                                    color: '#000',
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
                        <Card sx={{border:'1px solid', borderColor:'#6EC72D',borderRadius:5}}>
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
                                    label="Phone Number"
                                    name="mobileNumber"
                                    onChange={handleChange}
                                    // type="number"
                                    value={formData?.mobileNumber}
                                />
                                </Grid>
                                <Grid
                                xs={12}
                                md={6}
                                >
                                <TextField
                                    fullWidth
                                    label="Street"
                                    name="street"
                                    onChange={handleChange}
                                    required
                                    value={formData?.street}
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
                                    name="city"
                                    onChange={handleChange}
                                    required
                                    value={formData?.city}
                                />
                                </Grid>
                                <Grid
                                xs={12}
                                md={6}
                                >
                                <TextField
                                    fullWidth
                                    label="State"
                                    name="state"
                                    onChange={handleChange}
                                    required
                                    value={formData?.state}
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
                                    name="zip"
                                    onChange={handleChange}
                                    required
                                    value={formData?.zip}
                                >
                                </TextField>
                                </Grid>
                                <Grid
                                xs={12}
                                md={6}
                                >
                                <TextField
                                    fullWidth
                                    label="Qualification"
                                    name="qualification"
                                    onChange={handleChange}
                                    required
                                    value={formData?.qualification}
                                />
                                </Grid>

                                {/* <Grid
                                xs={12}
                                md={6}
                                >
                                <TextField
                                    fullWidth
                                    label="Services"
                                    name="service"
                                    onChange={handleChange}
                                    required
                                    value={formData?.service}
                                />
                                </Grid> */}

                                <Grid xs={12} md={6} sx={{paddingTop:0}}>
                                    <InputLabel htmlFor="service" style={{fontSize:11}}>Services</InputLabel>
                                    <Select
                                        fullWidth
                                        label="Services"
                                        name="service"
                                        onChange={handleChange}
                                        value={formData?.service}
                                    >
                                        {servicedata?.map((service) => (
                                            <MenuItem key={service?._id} value={service?._id}>
                                                {service?.service}
                                            </MenuItem>
                                        ))}
                                    </Select>
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
                                <Grid xs={12} md={6}>
                                    <Input
                                        type="file"
                                        accept=".pdf"  // Define accepted file types here
                                        id="certificateInput"
                                        style={{ display: 'none' }}
                                        onChange={handleCertificateChange}
                                    />
                                    <label htmlFor="certificateInput">
                                        <Button
                                            sx={{
                                            backgroundColor: '#6EC72D', 
                                            color: '#fff',
                                            borderRadius: "5px", 
                                            '&:hover': { backgroundColor: '#6EC72D' , color: '#161616'} 
                                            }}
                                            variant="contained"
                                            component="span"
                                            startIcon={<CloudUploadIcon />}
                                        >
                                            Upload Certificate
                                        </Button>
                                    </label>
                                    {certificatePreview && (
                                        <div>
                                            <h3>Uploaded Certificate Preview</h3>
                                            <iframe
                                                title="Certificate Preview"
                                                src={certificatePreview}
                                                width="350px"
                                                height="250px"
                                            />
                                        </div>
                                    )}
                                </Grid>
                            </Grid>
                            </Box>
                        </CardContent>
                        <Divider />
                        <CardActions sx={{ justifyContent: 'flex-end',paddingLeft:5, paddingRight:5}}>
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
                                    onClick={() => navigate('/trainer/dashboard')}
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

export default TrainerProfileEdit