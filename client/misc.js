<Box
component="form"
sx={{
    '& > :not(style)': { m: 1, width: '25ch' },
}}
noValidate
autoComplete="off"
className='form-style'
>
<TextField id="outlined-basic" label="Outlined" variant="outlined" />
</Box>



{formType === "signup" && (
    <TextField label="Name" variant="outlined" sx={{width: "100%",height: ".6rem",}}
        name="name"
        onChange={(e) => handleChange(e)}
        error={Boolean(formErrors.name)}
        helperText={formErrors.name}
    />
)}



if (!/[a-zA-Z]/.test(user.password) || !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(user.password)) 
    {
        newErrors.password = "Password must include a character and a special character";
        isValid = false;
    }



    {formType === 'login' && (
        <Typography
            sx={{
                fontSize: { lg: '1rem', md: '.8rem', sm: '.8rem' } ,
                color: '#2CE1FE' ,
                '&:hover': {
                   color: '#0AE4B3',
                },
                textDecoration: 'none'
            }}
            component={Link}
            to={'/forgot/password'}
        >
                Forgot password ?
        </Typography>
    )}


            {/* <div>
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
        </div> */}


<Route path="/:userType/reset/password/:token" element={<ResetPassword />} />



// import React from 'react';
// import { DataGrid } from '@mui/x-data-grid';


// const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'firstName', headerName: 'First name', width: 130 },
//     { field: 'lastName', headerName: 'Last name', width: 130 },
//     {
//         field: 'age',
//         headerName: 'Age',
//         type: 'number',
//         width: 90,
//     },
//     {
//         field: 'fullName',
//         headerName: 'Full name',
//         description: 'This column has a value getter and is not sortable.',
//         sortable: false,
//         width: 160,
//         valueGetter: (params) =>
//             `${params.row.firstName || ''} ${params.row.lastName || ''}`,
//     },
// ];

// const rows = [
//     { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//     { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//     { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//     { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//     { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
//     { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
//     { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//     { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//     { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];



// function AdminDataTable({type}) {
//     return (
//         <div style={{ height: 400, width: '80%', marginTop:100, marginLeft:175 }}>
//         <DataGrid
//         rows={rows}
//         columns={columns}
//         initialState={{
//             pagination: {
//             paginationModel: { page: 0, pageSize: 5 },
//             },
//         }}
//         pageSizeOptions={[5, 10]}
//         style={{
//                     border: '1px solid #000',
//                     borderRadius: '4px',
//                     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
//                 }}
//         // checkboxSelection
//         />
//     </div>
//     )
// }

// export default AdminDataTable


// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';
// import TablePagination from '@mui/material/TablePagination';

// const StyledTableCell = styled(TableCell)(({ theme }) => ({

//     [`&.${tableCellClasses.head}`]: {
//         backgroundColor: theme.palette.common.black,
//         color: theme.palette.common.white,
//     },
//     [`&.${tableCellClasses.body}`]: {
//         fontSize: 14,
//     },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({

//     '&:nth-of-type(odd)': {
//         backgroundColor: theme.palette.action.hover,
//     },
//   // hide last border
//     '&:last-child td, &:last-child th': {
//         border: 0,
//     },
// }));

// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
// }

// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// export default function AdminDataTable() {
//     const [page, setPage] = React.useState(0);
//     const [rowsPerPage, setRowsPerPage] = React.useState(5);

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//   const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

//     return (
//         <TableContainer component={Paper} style={{ maxWidth: 800 }}>
//         <Table sx={{ minWidth: 700 }} aria-label="customized table">
//             <TableHead>
//             <TableRow>
//                 <StyledTableCell>Dessert (100g serving)</StyledTableCell>
//                 <StyledTableCell align="right">Calories</StyledTableCell>
//                 <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
//                 <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
//                 <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
//             </TableRow>
//             </TableHead>
//             <TableBody>
//             {(rowsPerPage > 0
//                 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 : rows
//             ).map((row) => (
//                 <StyledTableRow key={row.name}>
//                 <StyledTableCell component="th" scope="row">
//                     {row.name}
//                 </StyledTableCell>
//                 <StyledTableCell align="right">{row.calories}</StyledTableCell>
//                 <StyledTableCell align="right">{row.fat}</StyledTableCell>
//                 <StyledTableCell align="right">{row.carbs}</StyledTableCell>
//                 <StyledTableCell align="right">{row.protein}</StyledTableCell>
//                 </StyledTableRow>
//             ))}

//             {emptyRows > 0 && (
//                 <TableRow style={{ height: 53 * emptyRows }}>
//                 <StyledTableCell colSpan={6} />
//                 </TableRow>
//             )}
//             </TableBody>
//         </Table>
//         <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={rows.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//         </TableContainer>
//     );
// }

// export default AdminDataTable;




// const DataTable = ({rows,tableTitle,tableHead}) => {


//     const [page, setPage] = useState(0);
//     const [rowsPerPage, setRowsPerPage] = useState(5);

//     const handleChangePage = (event, newPage) => {
//         setPage(newPage);
//     };

//     const handleChangeRowsPerPage = (event) => {
//         setRowsPerPage(parseInt(event.target.value, 10));
//         setPage(0);
//     };

//   const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows?.length - page * rowsPerPage);

//     return (
//         <div
//         style={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             flexDirection: 'column',
//             height: '65vh',
//         }}
//         >
//         <Typography variant="h4" gutterBottom>
//             {tableTitle}
//             {/* table content */}
//         </Typography>
//         <TableContainer component={Paper} style={{ maxWidth: 800 }}>
//             <Table sx={{ minWidth: 700 }} aria-label="customized table">
//             {/* table headings */}
//                 <TableHead>
//                     <TableRow>
//                         {tableHead.map((column) => (
//                             <StyledTableCell key={column.id}>{column.label}</StyledTableCell>
//                         ))}
//                     </TableRow>
//                 </TableHead>
                
//             <TableBody>
//                 {(rowsPerPage > 0
//                 ? rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 : rows
//                 )?.map((row) => (
//                 <StyledTableRow key={row.name}>
//                     <StyledTableCell component="th" scope="row">
//                     {row?.fullName}
//                     </StyledTableCell>
//                     {/* <StyledTableCell align="right">{row?.fullName}</StyledTableCell> */}
//                     <StyledTableCell align="left">{row?.email}</StyledTableCell>
//                     {/* <StyledTableCell align="right">{row?.subscriptionDetails.subscribedPlan}</StyledTableCell> */}
//                     <StyledTableCell align="left">{row?.isActive?"ACTIVE":"INACTIVE"}</StyledTableCell>
//                     <StyledTableCell align="left"><Button>Hey</Button></StyledTableCell>

//                 </StyledTableRow>
//                 ))}

//                 {emptyRows > 0 && (
//                 <TableRow style={{ height: 53 * emptyRows }}>
//                     <StyledTableCell colSpan={6} />
//                 </TableRow>
//                 )}
//             </TableBody>
//             </Table>
//             <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={rows?.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//             />
//         </TableContainer>
//         </div>
//     );
// };


<div>
{/* Display selected user details */}
{selectedUser && (
    <Box sx={style}>
<Typography id="modal-modal-title" variant="h6" component="h2">
    {selectedUser.fullName}
</Typography>
<Typography id="modal-modal-description" sx={{ mt: 2 }}>
    {selectedUser.email}
</Typography>
</Box>
)}
</div>





useEffect(() => {
    const status = searchParams.get("authentication")
    if (status === "failed") {
      setError("Google authentication failed")
    }
  }, [])          

<Button
            type="button"
            fullWidth
            variant="outlined"
            sx={{ mb: 2 }}
            size="large"
            startIcon={<GoogleIcon />}
            onClick={handleGoogleAuth}
          >
            Sign Up With Google
          </Button>

  const handleGoogleAuth = async () => {
    try {
      window.open("https://www1.kromium.shop/api/auth/google", "_self")
    } catch (error) {
      console.log(error)
    }
  }


  
function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchParams] = useSearchParams()
  const googleToken = searchParams.get("googleToken")
  useEffect(() => {
    document.title = "Vibee | Login"
    const token = document.cookie
      ?.split("; ")
      ?.find((row) => row.startsWith("googleToken"))
      ?.split("=")[1]
    console.log(token)
    console.log(document.cookie)
    if (token) {
      console.log("recieved token")
      localStorage.setItem(TOKEN_KEY, `Bearer ${token}`)
      document.cookie =
        "googleToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
      dispatch(setAuth())
      navigate("/")
    }
  }, [])
  useEffect(() => {
    if (googleToken) {
      localStorage.setItem(TOKEN_KEY, `Bearer ${googleToken}`)
      dispatch(setAuth())
      navigate("/")
    }
  }, [googleToken])













  import { useEffect, useState } from 'react';
  import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
  import { Avatar, Button, Card, CardActions, CardContent, Divider, CardHeader, TextField } from '@mui/material';
  import { useDispatch, useSelector } from 'react-redux';
  import { getUserDashboard, updateUserProfile } from '../../app/features/User/userSlice';
  import { uninterceptedApiInstance } from '../../api/axiosInstance';
  
  
  
  function UserProfileEdit() {
      const dispatch = useDispatch();
      const user = useSelector((state) => state.user.user);
      console.log(user)
      const [formData, setFormData] = useState(user);
  
      const handleSubmit = (e) => {e.preventDefault(); dispatch(updateUserProfile(formData));};
      return (
 <Stack>
 <Box component="main" sx={{ flexGrow: 1, py: 8}}>
<Container maxWidth="lg">
 <Stack spacing={3}>
<div>
<Grid container spacing={3}>
<Grid xs={12}md={6}lg={4}>
<Card >
<CardContent>
<Box sx={{alignItems: 'center',display: 'flex',flexDirection: 'column'}}>
<Avatar src={formData.avatar} sx={{ height: 80, mb: 2,width: 80 }}/>
<Typography gutterBottom variant="h5" >{formData.name}</Typography>
<Typography color="text.primary"variant="body2">{formData.bio}
</Typography>
<Typography color="text.secondary" variant="body2" paddingTop={'30px'} >  About </Typography>
<Typography color="text.secondary"variant="body2"  paddingTop={'10px'} >
 I'm Yuki. Full Stack Designe</Typography>
</Box>
 </CardContent><Divider />
 <CardActions>
 <Button fullWidth variant="text">
 Upload picture</Button></CardActions>
</Card>
  </Grid>
  <Grid xs={12} md={6} lg={8} >
<form autoComplete="off" noValidate onSubmit={handleSubmit} >
<Card>
 <CardHeader subheader="The information can be edited"title="Profile"
  />
<CardContent sx={{ pt: 0 }}>
<Box sx={{ m: -1.5 }}>
 <Grid container spacing={3}   >
<Grid xs={12} md={6} >
 <TextField fullWidth helperText="Please specify the first name"label="Full name"name="fullName"
onChange={(e) => setFormData({...formData,fullName:e.target.value})}required value={formData.fullName}/>
 </Grid>
 <Grid xs={12} md={6} >
 <TextField fullWidth label="Birthday" name="dateOfBirth" onChange={(e) => setFormData({...formData,dateOfBirth:e.target.value})}
required
 value={formData.dateOfBirth} /> </Grid>
<Grid
xs={12}
md={6}
>
<TextField
  fullWidth
  label="Email Address"
  name="email"
  required
  value={formData.email}
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
  type="number"
  value={formData.mobileNumber}
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
  onChange={(e) => setFormData({...formData,street:e.target.value})}
  required
  value={formData.street}
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
  onChange={(e) => setFormData({...formData,city:e.target.value})}
  required
  value={formData.city}
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
  onChange={(e) => setFormData({...formData,state:e.target.value})}
  required
  value={formData.state}
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
  onChange={(e) => setFormData({...formData,zip:e.target.value})}
  required
  value={formData.zip}
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
  onChange={(e) => setFormData({...formData,age:e.target.value})}
  required
  value={formData.age}
/>
</Grid>
<Grid
xs={12}
md={6}
>
<TextField
  fullWidth
  label="Weight"
  name="weight"
  onChange={(e) => setFormData({...formData,weight:e.target.value})}
  required
  value={formData.weight}
/>
</Grid>
<Grid
xs={12}
md={6}
>
<TextField
  fullWidth
  label="Gender"
  name="gender"
  onChange={(e) => setFormData({...formData,gender:e.target.value})}
  required
  value={formData.gender}
/>
</Grid>
<Grid
xs={12}
md={6}
>
<TextField
  fullWidth
  label="Height"
  name="height"
  onChange={(e) => setFormData({...formData,height:e.target.value})}
  required
  value={formData.height}
/>
</Grid>
</Grid>
</Box>
</CardContent>
<Divider />
<CardActions sx={{ justifyContent: 'flex-end' }}>
<Button variant="contained">
Save details
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







    // return (
    //     <form onSubmit={handleSubmit}>
    //       {/* Render form fields based on formData */}
          
    //       {Object.keys(formData).map((key) => (
    //         <div key={key}>
    //           <label>{key}</label>
    //           <input name={key} value={formData[key]} onChange={handleChange} />
    //         </div>
    //       ))}
    //       <button type="submit">Update Profile</button>
    //     </form>
    //   );






    <CardContent>
    <Box
        sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column'
        }}
    >
        <Avatar
        src={formData.avatar}
        sx={{
            height: 80,
            mb: 2,
            width: 80
        }}
        />
        
        <Input
type="file"
accept="image/*"
onChange={handleProfileImageChange}
/>
        <Typography
        variant="body2"
        paddingTop={'30px'}
        >
        About
        </Typography>
        <TextField
                fullWidth
                label="Bio"
                name="bio"
                onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                required
                value={editedUser.bio}
            />
    </Box>
    </CardContent>
    <Divider />
    <CardActions>
    <Button
        variant="text"
        onClick={uploadImage}
        >
        Upload picture
    </Button>
    </CardActions>
</Card>
</Grid>





                            {/* <Input
                                type="file"
                                accept="image/*"
                                onChange={handleProfileImageChange}
                                sx={{ marginBottom: 2, width: '75%' }}
                            /> */}
















                            <TableBody>
                            {(rowsPerPage > 0
                            ? tableContent?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : tableContent
                            )?.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                {row?.fullName}
                                </StyledTableCell>
                                <StyledTableCell align="left">{row?.email}</StyledTableCell>
                                <StyledTableCell align="left">{row?.gender}</StyledTableCell>
                                <StyledTableCell align="left">
                                <span style={{ color: row?.isActive ? 'green' : 'red' }}>
                                {row?.isActive ? 'ACTIVE' : 'INACTIVE'}
                                </span>
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    <Grid container alignItems="center">
                                        <Grid item>
                                            <Button variant="outlined" size="small" onClick={() => handleOpen(row)}>{<VisibilityOutlinedIcon />}</Button>
                                        </Grid>
                                        <Grid item sx={{ml:2}}>
                                            <FormGroup>
                                                <FormControlLabel
                                                    control={<IOSSwitch sx={{ m: 1 }} 
                                                    checked={row?.isActive}
                                                    onChange={() => {handleBlocking(row._id)}} />}
                                                    label=""
                                                />
                                                {/* {console.log("hooooooo",row._id)} */}
                                            </FormGroup>
                                        </Grid>
                                    </Grid>
                                </StyledTableCell>
            
                            </StyledTableRow>
                            ))}
            
                            {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <StyledTableCell colSpan={6} />
                            </TableRow>
                            )}
                        </TableBody>


const rows = useSelector(state => state.admin?.users?.services);




//trainer data page

// import React, { useEffect, useState } from 'react'
// import TrainerView from '../components/TrainerView/TrainerView'
// import { useDispatch, useSelector } from 'react-redux'
// import { viewAllTrainers } from '../app/features/Data/dataSlice';

// function ViewTrainersPage() {

//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(viewAllTrainers());
//     },[dispatch])

//     const trainers = useSelector(state => state.data?.data?.trainers);

//     const cardStyle = {
//         flex: '0 0 calc(33.333% - 20px)', // 3 cards per row with 20px gap
//         maxWidth: 'calc(33.333% - 20px)',
//         aspectRatio: '1/1',
//     };
    

//     return (
//         <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between',gap: '20px', maxWidth: '1070px', margin:'auto' }}>
//             {trainers ? (
//                 trainers.map((trainer) => (

//                     <div key={trainer._id} style={cardStyle}>

//                     <TrainerView key={trainer._id} trainer={trainer} />

//                     </div>

//                 ))
//             ) : (
//                 <p>No trainers available.</p>
//             )}
//         </div>
//     )
// }


    // const filteredTrainers = trainers.filter((trainer) => {
    //     if (genderFilter.length === 0 && searchTerm === '') {
    //     return true;
    //     }
    //     return genderFilter.includes(trainer.gender);
    //     // return genderFilter.includes(trainer.gender) && (trainer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || trainer.service.toLowerCase().includes(searchTerm.toLowerCase()));
    // });







//profile edit - user

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     let isValid = true;

    //     console.log(formData)

    //     if(!validateMobile(formData.mobileNumber)) {
    //         errorData.mobileNumber = "Invalid mobile number";
    //         isValid = false;
    //     }

    //     if(!validateAge(formData.age)) {
    //         errorData.age = "Invalid Age";
    //         isValid = false;
    //     }

    //     if(!validateHeight(formData.height)) {
    //         errorData.height = "Invalid Height";
    //         isValid = false;
    //     }

    //     if(!validateWeight(formData.weight)) {
    //         errorData.weight = "Invalid Weight";
    //         isValid = false;
    //     }

    //     setFormErrors(errorData);

    //     if(isValid) {
    //         try {
    //             const {data} = await instance.put(`user/editprofile/${userId}`,formData);
    //             console.log(data)
    //             setFormData({...data?.user,_id:undefined})
    //             toast.success('Profile updated successfully!', {
    //                 position: "top-right",
    //                 autoClose: 5000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //             });
    //             navigate('/user/dashboard');
    //         } catch (error) {
    //             console.log(error); 
    //             toast.success('Profile updated successfully!', {
    //                 position: "top-right",
    //                 autoClose: 5000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //             });
    //         }
    //     }

    // };



    
const pages = ['Home','Services','Trainers','Contact'];
const settings = ['Account','Logout'];

function NavBar() {
const [anchorElNav, setAnchorElNav] = useState(null)
const [anchorElUser, setAnchorElUser] = useState(null)

const navigate = useNavigate();

const authState = useSelector((state) => {
return state.auth.authState;
})

const handleOpenNavMenu = (event) => {
setAnchorElNav(event.currentTarget);
};
const handleOpenUserMenu = (event) => {
setAnchorElUser(event.currentTarget);
};

const handleCloseNavMenu = () => {
setAnchorElNav(null);
};

const handleCloseUserMenu = () => {
setAnchorElUser(null);
};

const handleLoginClick = () => {
navigate('/login'); 
};

const handleAccountSettings = () => {
navigate(`/${authState.role}/editprofile`); 
};

const dispatch = useDispatch();

const handleLogout = () => {
// dispatch(adminLogout());

localStorage.removeItem('user')
dispatch(removeAuth());
navigate('/login')
}

return (
<AppBar  sx={{ backgroundColor: '#000' }}>
<Container maxWidth="xl">
<Toolbar disableGutters>
<div>
<img className='logo' alt="logo" src="https://res.cloudinary.com/djd2rpgil/image/upload/f_auto,q_auto/ynhwgl1co8ww4vnlvitn"  />
</div>
    <Typography
        variant="h6" noWrap component="a"
    ></Typography>
<Box>
<IconButton
size="large"
aria-controls="menu-appbar"
aria-haspopup="true"
onClick={handleOpenNavMenu}
>
<MenuIcon />
</IconButton>
<Menu
id="menu-appbar"
anchorEl={anchorElNav}
anchorOrigin={{
vertical: 'bottom',
horizontal: 'left',
}}
keepMounted
transformOrigin={{
vertical: 'top',
horizontal: 'left',
}}
open={Boolean(anchorElNav)}
onClose={handleCloseNavMenu}
>
{pages.map((page) => (
<MenuItem key={page} onClick={handleCloseNavMenu}>
    <Typography textAlign="center">{page}</Typography>
</MenuItem>
))}
</Menu>
</Box>
<Typography
variant="h5"
noWrap
component="a"
> 
</Typography>
<Box>
{pages.map((page) => (
<Button
key={page}
onClick={handleCloseNavMenu}
, }}
>
{page}
</Button>
))}
</Box>
<Box sx={{ flexGrow: 0 }}>
{authState ? (
<>
<Tooltip title="Open settings">
<IconButton onClick={handleOpenUserMenu}>
    <Avatar alt="Remy Sharp" src={authState?.profilePicture} />
</IconButton>
</Tooltip>
<Menu
sx={{ mt: '45px' }}
id="menu-appbar"
anchorEl={anchorElUser}
anchorOrigin={{
vertical: 'top',
horizontal: 'right',
}}
keepMounted
transformOrigin={{
vertical: 'top',
horizontal: 'right',
}}
open={Boolean(anchorElUser)}
onClose={handleCloseUserMenu}
>
{settings.map((setting) => (
<MenuItem key={setting} onClick={setting === 'Logout' ? handleLogout : handleAccountSettings}>
    <Typography textAlign="center">{setting}</Typography>
</MenuItem>
))}
</Menu>
</>
) : (
<Button 
className='login-button-nav' 
endIcon={<LockIcon />}
onClick={handleLoginClick}
>
Login
</Button>
)}
</Box>
</Toolbar>
</Container>
</AppBar>
);
}


export default NavBar






const StyledTableCell = styled(TableCell)(({ theme }) => ({

[`&.${tableCellClasses.head}`]: {
backgroundColor: theme.palette.common.black,
color: theme.palette.common.white,
},
[`&.${tableCellClasses.body}`]: {
fontSize: 14,
},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({

'&:nth-of-type(odd)': {
backgroundColor: theme.palette.action.hover,
},
'&:last-child td, &:last-child th': {
border: 0,
},
}));


const IOSSwitch = styled((props) => (
<Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
width: 42,
height: 26,
padding: 0,
'& .MuiSwitch-switchBase': {
padding: 0,
margin: 2,
transitionDuration: '300ms',
'&.Mui-checked': {
transform: 'translateX(16px)',
color: '#fff',
'& + .MuiSwitch-track': {
backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
opacity: 1,
border: 0,
},
'&.Mui-disabled + .MuiSwitch-track': {
opacity: 0.5,
},
},
'&.Mui-focusVisible .MuiSwitch-thumb': {
color: '#33cf4d',
border: '6px solid #fff',
},
'&.Mui-disabled .MuiSwitch-thumb': {
color:
theme.palette.mode === 'light'
? theme.palette.grey[100]
: theme.palette.grey[600],
},
'&.Mui-disabled + .MuiSwitch-track': {
opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
},
},
'& .MuiSwitch-thumb': {
boxSizing: 'border-box',
width: 22,
height: 22,
},
'& .MuiSwitch-track': {
borderRadius: 26 / 2,
backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
opacity: 1,
transition: theme.transitions.create(['background-color'], {
duration: 500,
}),
},
}));

const DataTable = ({tableHead,tableTitle,tableContent,handleBlocking,handleOpen}) => {


const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(5);

const handleChangePage = (event, newPage) => {
setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
setRowsPerPage(parseInt(event.target.value, 10));
setPage(0);
};

const emptyRows = rowsPerPage - Math.min(rowsPerPage, tableContent?.length - page * rowsPerPage);

return (
<div
style={{
display: 'flex',
justifyContent: 'center',
alignItems: 'center',
flexDirection: 'column',
height: '75vh',
}}
>
<Typography variant="h4" gutterBottom>
{tableTitle}
</Typography>
<TableContainer component={Paper} style={{ maxWidth: 800 ,  }}>
<Table sx={{ minWidth: 700 }} aria-label="customized table">
{/* table headings */}
<TableHead>
<TableRow>
{tableHead.map((column) => (
    <StyledTableCell key={column.id}>{column.label}</StyledTableCell>
))}
</TableRow>
</TableHead>

<TableBody>
{(rowsPerPage > 0
? tableContent?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
: tableContent
)?.map((row,index) => (
<StyledTableRow key={index}>
<StyledTableCell component="th" scope="row">
{row?.fullName}
</StyledTableCell>
<StyledTableCell align="left">{row?.email}</StyledTableCell>
<StyledTableCell align="left">{row?.gender}</StyledTableCell>
<StyledTableCell align="left">
<span style={{ color: row?.isActive ? 'green' : 'red' }}>
{row?.isActive ? 'ACTIVE' : 'INACTIVE'}
</span>
</StyledTableCell>
<StyledTableCell align="left">
<Grid container alignItems="center">
<Grid item>
<Button variant="outlined" size="small" onClick={() => handleOpen(row)}>{<VisibilityOutlinedIcon />}</Button>
</Grid>
<Grid item sx={{ml:2}}>
<FormGroup>
<FormControlLabel
control={<IOSSwitch sx={{ m: 1 }} 
checked={row?.isActive}
onChange={() => {handleBlocking(row._id)}} />}
label=""
/>
</FormGroup>
</Grid>
</Grid>
</StyledTableCell>

</StyledTableRow>
))}

{emptyRows > 0 && (
<TableRow style={{ height: 53 * emptyRows }}>
<StyledTableCell colSpan={6} />
</TableRow>
)}
</TableBody>
</Table>
<TablePagination
rowsPerPageOptions={[5, 10, 25]}
component="div"
count={tableContent?.length}
rowsPerPage={rowsPerPage}
page={page}
onPageChange={handleChangePage}
onRowsPerPageChange={handleChangeRowsPerPage}
/>
</TableContainer>
</div>
);
};

export default DataTable;





function Checkout() {

const navigate = useNavigate();

const date = new Date();
const formattedDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;

const { id } = useParams();

const dispatch = useDispatch();

useEffect(() => {
dispatch(viewPlan(id));
},[dispatch])

const planData = useSelector((state) => {
return state.data.data.plan
})

const authState = useSelector((state) => {
return state.auth.authState;
})

console.log(authState)

console.log(planData)

const onToken = async (token) => {
try {
const response = await instance.post("user/create-subscription", {
planId: `${planData.planId}`, 
token: token.id,
userId: `${authState._id}`, 
});

if (response.status === 201) {
const data = response.data;
dispatch(updateAuth(data));
toast.success('Subscribed successfully!', {
position: "top-right",
autoClose: 5000,
});
navigate('/user/dashboard');
console.log(data);
} else {
toast.error('Subscription creation failed!', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
}
} catch (error) {
console.error("Error creating subscription:", error);
toast.error('User already have an active subscription!', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
});
}
};
return (
<div>
<Stack
direction= { 'row'}
spacing={5}
sx={{
  marginTop: '10rem',
  padding: '2rem'
}}>
<Box>
<Typography
    variant='h4'>
    Booking Info
</Typography>
<Stack direction= 'column' spacing={3} padding= '0 3.5rem'>
<TextField
    id="fullName"
    label="Full name"
    variant="outlined"
    value={authState?.fullName}
/>
<TextField
    id="email"
    label="Email"
    variant="outlined"
    value={authState?.email}
/>
<TextField
    id="phone"
    label="Phone"
    variant="outlined"
    value={authState?.mobileNumber}
/>
<TextField
    id="planName"
    // label="Plan Name"
    variant="outlined"
    value={planData?.planName}
/>
</Stack>
</Box>
<Box>
<Typography variant='h4' padding= '1rem' >Booking Summary</Typography>
<Divider />
<Stack padding='.8rem' direction='row' spacing={2}>
<Box padding= '.3rem 0rem'>
  <Typography
      variant='subtitle1' 
  >

  </Typography>
</Box>
</Stack>
<Box sx={{
  display: 'flex',
  justifyContent: 'space-between',
  padding: '.4rem 1.5rem'
}}>
<Typography
  sx={{
      fontSize: '1rem',
      letterSpacing: '.05rem'
  }}
>
  Date
</Typography>
<Typography  sx={{
      fontSize: '1rem',
      letterSpacing: '.05rem'
}}>
{formattedDate}
</Typography>
</Box>
<Box>
<Typography
>
  Plan
</Typography>
<Typography >
{planData?.planName}
</Typography>
</Box>
<Box>
<Typography
>
  Validity
</Typography>
<Typography >
1 Month
</Typography>
</Box>
<Box >
<Typography
>
  Amount
</Typography>
<Typography >
Rs. {planData?.planAmount} /-
</Typography>
</Box>

<Divider />
<Box >
<Typography
>
  Total
</Typography>
<Typography  >
Rs. {planData?.planAmount} /-
</Typography>
</Box>
<StripeCheckout
stripeKey={process.env.REACT_APP_STRIPE_KEY}
token={onToken}
name="StudioFitness"
description="Subscription Payment"
amount={`${planData?.planAmount*100}`}
currency="inr"
/>
</Box>
</Stack>
<Button onClick={()=> navigate('/viewplandetails')} 
>Go Back</Button>
</div>
);
}

export default Checkout



//sidebar visibility control

                    {/* <MenuItem onClick={() => navigate('/user/viewtrainers')} sx={{
                        fontSize:'25px',
                        fontWeight:'bolder',
                        fontFamily:'inherit',
                        color:'#88C13E',
                        borderBottom: '1px solid #555',
                        '&:hover': {
                            backgroundColor: '#333',
                        }
                    }}><PersonAddIcon fontSize="large" sx={{paddingRight:'20px',color:'#fff'}}/> Book My Trainer</MenuItem> */}




















function TrainerAppointmentsView() {
const dispatch = useDispatch();
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(5);
const [filter, setFilter] = useState('all');

useEffect(() => {
dispatch(trainerGetAppointment())
}, [])

const data = useSelector(state => state?.appointment?.appointment?.appointments) || []

const handleChangePage = (event, newPage) => {
setPage(newPage);
};

const handleFilterChange = (event) => {
setFilter(event.target.value);
};

const filteredData = data?.filter(appointment => {
if (filter === 'all') return true;
return filter === appointment?.isTrainerApproved;
});

return (
<div style={{marginTop:'-40vh'}}>
<select value={filter} onChange={handleFilterChange}>
<option value="all">All</option>
<option value="approved">Approved</option>
<option value="pending">Pending</option>
<option value="rejected">Rejected</option>
</select>
{filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((appointment, index) => (
<Card key={index} >
<CardContent>
<Typography variant="h4" component="div" >
APPOINTMENT {index + 1}
</Typography>
<Typography variant="body1" style={{ 
color: 'white',
marginBottom: '8px',                     
}}>
<PersonIcon  />
<b style={{ color: '#706e6e' }}>Client:</b>  {appointment.userId.fullName}
</Typography>
<Typography variant="body1" >
<EventIcon  />
<b style={{ color: '#706e6e' }}>Date:</b> {new Date(appointment?.slotDate).toLocaleDateString()}
</Typography>
<Typography variant="body1" >
<AccessTimeIcon />
<span>
<b style={{ color: '#706e6e' }}>Time:</b> {appointment?.slotStartTime} - {appointment?.slotEndTime}
</span>                        
</Typography>
<Typography variant="body1">
{appointment?.isTrainerApproved === 'approved' && <CheckCircleIcon style={{  color: '#4CAF50',verticalAlign: 'middle' }} />}
{appointment?.isTrainerApproved === 'rejected' && <CancelIcon style={{  color: '#FF0000',verticalAlign: 'middle' }} />}
{appointment?.isTrainerApproved === 'pending' && <CheckCircleIcon style={{ color: '#FFC107',verticalAlign: 'middle' }} />}
<b style={{ color: '#706e6e' }}>Status:</b> {appointment?.isTrainerApproved.charAt(0).toUpperCase() + appointment?.isTrainerApproved.slice(1)}
</Typography>
{appointment?.isTrainerApproved === 'rejected' && (
<Typography variant="body1" >
<b style={{ color: '#706e6e' }}>Rejection Reason:</b> {appointment.rejectionReason}
</Typography>
)}
{appointment?.isTrainerApproved === 'pending' && (
<Box >
<Button onClick={() => confirmAlert({
title: 'Confirm to approve',
message: 'Are you sure to approve this appointment?',
buttons: [
{
label: 'Yes',
onClick: () => handleApproval(appointment._id)
},
{
label: 'No',
}
]
})}
variant="contained" >
Approve
</Button>
<Button onClick={() => confirmAlert({
customUI: ({ onClose }) => {
let reason = '';
return (
<div className='custom-ui'>
<h1>Rejection Reason</h1>
<TextField
label="Reason"
variant="outlined"
onChange={(e) => reason = e.target.value}
/>
<Button variant="contained" color="primary" onClick={onClose} style={{ margin: '10px' }}>
Cancel
</Button>
<Button variant="contained" color="secondary" onClick={() => {
handleRejection(appointment._id, reason);
onClose();
}}
>
Confirm
</Button>
</div>
);
}
})}
variant="contained" >
Reject
</Button>
</Box>
)}
{appointment?.isTrainerApproved !== 'pending' && (
<Box sx={{ marginTop: 2 }}>
<Button variant="contained" color="primary" disabled>
Approve
</Button>
<Button variant="contained" color="secondary" disabled>
Reject
</Button>
</Box>
)}
</CardContent>
</Card>
))}
<MobileStepper
variant="dots"
steps={Math.ceil(filteredData.length / rowsPerPage)}
position="static"
activeStep={page}
nextButton={
<Button size="small" onClick={handleChangePage} disabled={page >= Math.ceil(filteredData.length / rowsPerPage) - 1}>
Next
<KeyboardArrowRight />
</Button>
}
backButton={
<Button size="small" onClick={handleChangePage} disabled={page <= 0}>
<KeyboardArrowLeft />
Back
</Button>
}
/>
</div>
);
}



return (
<div style={{marginTop:'-45vh',height:'110vh'}}>
<select value={filter} onChange={handleFilterChange} style={{ marginBottom: '10px', padding: '8px', borderRadius: '4px', fontSize: '16px',marginLeft:'100vh' }}>
<option value="all">All</option>
<option value="approved">Approved</option>
<option value="pending">Pending</option>
<option value="rejected">Rejected</option>
</select>


{filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((appointment, index) => (
<Card key={index} style={{ 
margin: '10px 0', 
boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
backgroundColor: 'rgba(255, 255, 255, 0.1)', // semi-transparent
backdropFilter: 'blur(12px)', // apply blur
width:'600px', 
marginLeft:'75vh',
borderRadius: '8px',
padding: '16px',
color: 'white', }}>
<CardContent>
<Typography variant="h4" component="div" style={{ color: 'green',marginBottom: '10px', fontFamily:'inherit', fontWeight:'bolder' }}>
APPOINTMENT {page * rowsPerPage + index + 1}
</Typography>
<Typography variant="body1" style={{ 
color: 'white',
marginBottom: '8px',                     
}}>
<PersonIcon style={{ marginBottom: '8px',verticalAlign: 'middle',marginRight:'8px' }} />
<b style={{ color: '#808080' }}>Trainer:</b>  {appointment?.trainerId?.fullName}
</Typography>
<Typography variant="body1" style={{ color: 'white', marginBottom: '8px',}}>
<EventIcon style={{ marginBottom: '8px',verticalAlign: 'middle' ,marginRight:'8px'}} />
<b style={{ color: '#808080' }}>Date:</b> {new Date(appointment?.slotDate).toLocaleDateString()}
</Typography>
<Typography variant="body1" style={{ color: 'white' ,marginBottom: '8px',}}>
<AccessTimeIcon style={{ marginBottom: '8px',verticalAlign: 'middle',marginRight:'8px' }} />
<span>
<b style={{ color: '#808080' }}>Time:</b> {appointment?.slotStartTime} - {appointment?.slotEndTime}
</span>                        
</Typography>
<Typography variant="body1" style={{ color: 'white' ,marginBottom: '8px',}}>
{appointment?.isTrainerApproved === 'approved' && <CheckCircleIcon style={{ marginBottom: '8px',marginRight:'8px', color: '#4CAF50',verticalAlign: 'middle' }} />}
{appointment?.isTrainerApproved === 'rejected' && <CancelIcon style={{ marginBottom: '8px',marginRight:'8px', color: '#FF0000',verticalAlign: 'middle' }} />}
{appointment?.isTrainerApproved === 'pending' && <CheckCircleIcon style={{ marginBottom: '8px',marginRight:'8px', color: '#FFC107',verticalAlign: 'middle' }} />}
<b style={{ color: '#808080' }}>Status:</b> {appointment?.isTrainerApproved.charAt(0).toUpperCase() + appointment?.isTrainerApproved.slice(1)}
</Typography>
{appointment?.isTrainerApproved === 'rejected' && (
<Typography variant="body1" style={{ color: 'white' ,marginBottom: '8px',}}>
<b style={{ color: '#808080' }}>Rejection Reason:</b> {appointment?.rejectionReason}
</Typography>
)}
{appointment?.isTrainerApproved === 'pending' && (
<Box sx={{ marginTop: 2 , }}>
<Button onClick={() => confirmAlert({
title: 'Confirm to Cancel',
message: 'Are you sure to cancel this appointment?',
buttons: [
{
  label: 'Yes',
  onClick: () => handleCancellation(appointment._id)
},
{
  label: 'No',
  onClick: () => {}
}
]
})}
variant="contained" sx={{backgroundColor:'#FF0000',color:'#fff','&:hover': { backgroundColor:'#fff',color:'#FF0000'}}}>
Cancel
</Button>
</Box>
)}
</CardContent>
</Card>
))}


<div style={{ textAlign: 'center', marginTop: '20px' }}>
<Button
size="small"
onClick={() => handlePaginationChange(page - 1)}
disabled={page === 0}
style={{ color: 'green' }}
>
<KeyboardArrowLeft/>
Back
</Button>
<span style={{ margin: '0 10px', color: 'green' }}>{page + 1}</span>
<Button
size="small"
onClick={() => handlePaginationChange(page + 1)}
disabled={page >= Math.ceil(filteredData.length / rowsPerPage) - 1}
style={{ color: 'green' }}
>
Next
<KeyboardArrowRight/>
</Button>
</div>

</div>
);




import React, { useEffect, useState } from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, CategoryScale, LinearScale, BarElement   } from 'chart.js';
import { instance } from '../../api/axiosInstance';
import { Typography } from '@mui/material';
Chart.register(ArcElement, CategoryScale, LinearScale, BarElement  );
function AdminCharts() {
const [appointmentsChartData, setAppointmentsChartData] = useState({
labels: [],
datasets: [
{
data: [],
backgroundColor: [],
hoverBackgroundColor: [],
},
],
});

const [revenueByPlanChartData, setRevenueByPlanChartData] = useState({
labels: [],
datasets: [
{
label: 'Revenue',
data: [],
backgroundColor: [],
hoverBackgroundColor: [],
},
],
});

const [trainersChartData, setTrainersChartData] = useState({
labels: [],
datasets: [
{
data: [],
backgroundColor: [],
hoverBackgroundColor: [],
},
],
});

useEffect(() => {
const fetchData = async () => {
try {
const appointmentsResponse = await instance.get('admin/appointment-status-chart');
const appointmentsData = appointmentsResponse?.data?.appointmentStatusCounts;

if (appointmentsData && Array.isArray(appointmentsData)) {
const cancelledCount = appointmentsData.find(item => item?.status === true)?.count || 0;
const nonCancelledCount = appointmentsData.find(item => item?.status === false)?.count || 0;
setAppointmentsChartData({
labels: [`Cancelled (${cancelledCount})`, `Not Cancelled (${nonCancelledCount})`],
datasets: [
{
data: [cancelledCount, nonCancelledCount],
backgroundColor: ['#FF6384', '#36A2EB'],
hoverBackgroundColor: ['#FF6384', '#36A2EB'],
},
],
});
} else {
console.error('Invalid data structure:', appointmentsData);
}
const revenueByPlanResponse = await instance.get('admin/revenue-by-plan');
const revenueByPlanData = revenueByPlanResponse?.data?.revenueByPlan;
if (revenueByPlanData && Array.isArray(revenueByPlanData)) {
const labels = revenueByPlanData.map(item => {
if (item.plan === 999) {
return 'Standard Plan';
} else if (item.plan === 1999) {
return 'Premium Plan';
} else {
return `Plan ${item.plan}`;
}
});
const revenues = revenueByPlanData.map(item => item.totalRevenue);
setRevenueByPlanChartData({
labels: labels,
datasets: [
{
label: 'Revenue',
data: revenues,
backgroundColor: ['#FFD700', '#00FF00'], 
hoverBackgroundColor: ['#FFD700', '#00FF00'],
},
],
});
} else {
console.error('Invalid data structure:', revenueByPlanData);
}
const trainersResponse = await instance.get('admin/trainers-by-service');
const trainersData = trainersResponse?.data?.groupedTrainers;
if (trainersData && Array.isArray(trainersData)) {
const labels = trainersData.map(item => item.service.name);
const totalTrainers = trainersData.map(item => item.totalTrainers);
const backgroundColors = generateRandomColors(trainersData.length);
setTrainersChartData({
labels: labels,
datasets: [
{
data: totalTrainers,
backgroundColor: backgroundColors,
hoverBackgroundColor: backgroundColors,
},
],
});
} else {
}
} catch (error) {
}
};
fetchData();
}, []);
const generateRandomColors = (count) => {
const colors = [];
for (let i = 0; i < count; i++) {
colors.push(getRandomColor());
}
return colors;
};
const getRandomColor = () => {
const letters = '0123456789ABCDEF';
let color = '#';
for (let i = 0; i < 6; i++) {
color += letters[Math.floor(Math.random() * 16)];
}
return color;
};
return (
<div>
<Typography>Appointment Status</Typography>
<div style={{ width: '30%', height: '30%' }}>
<Doughnut data={appointmentsChartData} />
</div>

<Typography>Revenue by Plan</Typography>
<div style={{ width: '30%', height: '30%' }}>
<Bar data={revenueByPlanChartData} />
</div>

<Typography>Trainers by Service</Typography>
<div style={{ width: '30%', height: '30%' }}>
<Doughnut data={trainersChartData} />
</div>
</div>
);
}
export default AdminCharts;


















