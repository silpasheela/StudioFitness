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