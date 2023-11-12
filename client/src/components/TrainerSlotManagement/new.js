// import React, { useEffect, useState } from 'react';
// import {
//     Paper,
//     Typography,
//     Button,
//     List,
//     ListItem,
//     ListItemText,
//     ListItemSecondaryAction,
//     IconButton,
//     Grid,
// } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
// import { instance } from '../../api/axiosInstance';

// function formatDate(date) {
//     const d = new Date(date);
//     const year = d.getFullYear();
//     const month = String(d.getMonth() + 1).padStart(2, '0');
//     const day = String(d.getDate()).padStart(2, '0');
//     return `${day}-${month}-${year}`;
// }

// function TrainerViewSlot() {
//     const [slots, setSlots] = useState([]);
//     const [expandedDate, setExpandedDate] = useState(null);

//     useEffect(() => {
//         getSlots();
//     }, []);

//     const handleDeleteDate = (date) => {

//     };

//     const handleDeleteSlot = (date, slotId) => {

//     };

//     const getSlots = async () => {
//         try {
//             const response = await instance.get('trainer/view-slots');
//             setSlots(response.data.slots);
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     const toggleDateExpansion = (date) => {
//         if (expandedDate === date) {
//             setExpandedDate(null);
//         } else {
//             setExpandedDate(date);
//         }
//     };

// return (
// <Paper elevation={3} style={{ padding: '16px', maxWidth:'100vh' }}>
// <Typography variant="h6">Your Available Slots</Typography>
// {slots.map((dateSlot) => (
// <div key={dateSlot.date}>
// <Grid container alignItems="center" spacing={2}>
// <Grid item xs={10}>
// <Button
// variant="outlined"
// size="small"
// onClick={() => toggleDateExpansion(dateSlot.date)}
// >
// {formatDate(dateSlot.date)}{' '}
// {expandedDate === dateSlot.date ? (
// <ArrowDropUpIcon />
// ) : (
// <ArrowDropDownIcon />
// )}
// </Button>
// </Grid>
// <Grid item xs={2}>
// <IconButton
// edge="end"
// aria-label="delete"
// color="error"
// onClick={() => handleDeleteDate(dateSlot.date)}
// >
// <DeleteIcon />
// </IconButton>
// </Grid>
// </Grid>
// {expandedDate === dateSlot.date && (
// <Grid container spacing={2}>
// {dateSlot.slots.map((slot) => (
// <Grid item xs={12} key={slot._id}>
// <Button variant="outlined" fullWidth>
// <Grid container justify="space-between">
// <Grid item>
// <ListItemText primary={`${slot.startTime} - ${slot.endTime}`} />
// </Grid>
// <Grid item>
// <ListItemSecondaryAction>
// <IconButton edge="end" aria-label="edit">
// <EditIcon />
// </IconButton>
// <IconButton
// edge="end"
// aria-label="delete"
// color="error"
// onClick={() => handleDeleteSlot(dateSlot.date, slot._id)}
// >
// <DeleteIcon />
// </IconButton>
// </ListItemSecondaryAction>
// </Grid>
// </Grid>
// </Button>
// </Grid>
// ))}
// </Grid>
// )}
// <hr />
// </div>
// ))}
// </Paper>
// );
// }

// export default TrainerViewSlot;


// lets do one thing.. lets remove the ArrowDropUpIcon and ArrowDropDownIcon.. while clicking dateSlot let a modal be open and display the time slots and other stuff inside that modal..