import React, { useEffect, useState } from 'react';
import {IconButton, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Slider from 'react-slick'; 
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { instance } from '../../api/axiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import moment from 'moment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';




function formatDate(date) {

    const formattedDate = moment(date).format('DD-MM-YYYY');
    return formattedDate;

}

function TrainerViewSlot() {

    const [slots, setSlots] = useState([]);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedSlotId, setSelectedSlotId] = useState('');
    const [editedStartTime, setEditedStartTime] = useState('');
    const [editedEndTime, setEditedEndTime] = useState('');
    const [expandedDate, setExpandedDate] = useState(null);


    useEffect(() => {
        getSlots();
    }, []);

    const handleDeleteSlot = (date, slotId) => {
        confirmAlert({
            title: 'Confirm Deletion',
            message: 'Are you sure you want to delete this slot?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        try {
                            await instance.delete(`trainer/delete-slot/${slotId}`);
                            setSlots((prevSlots) => {
                                const updatedSlots = prevSlots.map((dateSlot) => {
                                    if (dateSlot.date === date) {
                                        // Filter out the deleted slot based on its _id
                                        dateSlot.slots = dateSlot.slots.filter((slot) => slot._id !== slotId);
                                    }
                                    return dateSlot;
                                });
                                return updatedSlots;
                            });
    
                            toast.success('Slot deleted successfully', {
                                position: 'top-right',
                                autoClose: 3000, 
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                            });
                        } catch (error) {
                            console.error(error);    
                            toast.error('Failed to delete slot', {
                                position: 'top-right',
                                autoClose: 3000, 
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                            });
                        }
                    },
                },
                {
                    label: 'No',
                },
            ],
        });
    };

    const getSlots = async () => {
        try {
            const response = await instance.get('trainer/view-slots');
            setSlots(response.data.slots);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEdit = (date, slotId, startTime, endTime) => {
        setSelectedDate(date);
        setSelectedSlotId(slotId);
        setEditedStartTime(moment(startTime, 'HH:mm').format('HH:mm'));
        setEditedEndTime(moment(endTime, 'HH:mm').format('HH:mm'));
        setEditDialogOpen(true);
    };

    const handleEditSlotSubmit = async () => {
        try {
            // Convert edited times to HH:mm format
            const formattedStartTime = moment(editedStartTime, 'HH:mm').format('HH:mm');
            const formattedEndTime = moment(editedEndTime, 'HH:mm').format('HH:mm');

            // Make an API call to update the slot
            // eslint-disable-next-line no-unused-vars
            const response = await instance.put(`trainer/slot-update/${selectedSlotId}`, {
                date: selectedDate,
                startTime: formattedStartTime,
                endTime: formattedEndTime,
            });

            toast.success('Slot updated successfully', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            setEditDialogOpen(false); // Close the edit dialog
            getSlots(); // Refresh the slots data
        } catch (error) {
            console.error(error);
            toast.error(`${error.response.data.error}`, {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    // const settings = {
    //     dots: true, 
    //     infinite: false,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    // };


    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const toggleDateExpansion = (date) => {
        if (expandedDate === date) {
            setExpandedDate(null);
        } else {
            setExpandedDate(date);
        }
    };



    return (
        <>
        <div style={{ marginTop: '35px', marginLeft:'49vh' }}>
            <Slider {...settings} style={{ width: '50%', margin: 'auto' }}>
                {slots.map((dateSlot) => (
                <div key={dateSlot.date}>
                    <Button
                    variant="contained"
                    sx={{
                        marginBottom: 2,
                        backgroundColor: expandedDate === dateSlot?.date ? '#ebe8e8' : '#000',
                        color: expandedDate === dateSlot?.date ? '#000' : '#fff',
                        '&:hover': { backgroundColor: '#ebe8e8', color: '#000' },
                    }}
                    onClick={() => toggleDateExpansion(dateSlot.date)}
                    >
                    {formatDate(dateSlot.date)}
                    </Button>
    
                    {expandedDate === dateSlot.date && (
                    <>
                        {dateSlot.slots.map((slot) => (
                        <div key={slot._id}>
                            <Button
                            variant="outlined"
                            sx={{
                                width: '30%',
                                marginBottom: 2,
                                backgroundColor: '#000',
                                color: '#6EC72D',
                                border: 'none',
                                '&:hover': { backgroundColor: '#6EC72D', color: '#000', border: '1px solid black' },
                            }}
                            >{`${slot.startTime} - ${slot.endTime}`}
                            {slot.status ? (
                                <>
                                <IconButton sx={{ color: '#fff',marginLeft: 4 }} edge="end" aria-label="approved">
                                    <CheckCircleIcon />
                                </IconButton>
                                </>
                            ) : (
                                <>
                                <IconButton
                                    sx={{ color: '#fff', }}
                                    edge="end"
                                    aria-label="edit"
                                    onClick={() => handleEdit(dateSlot.date, slot._id)}
                                >
                                    <EditIcon />
                                </IconButton>
                                <IconButton
                                    edge="end"
                                    aria-label="delete"
                                    sx={{ color: '#fff' }}
                                    onClick={() => handleDeleteSlot(dateSlot.date, slot._id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                                </>
                            )}
                            </Button>
                        </div>
                        ))}
                    </>
                    )}
                </div>
                ))}
            </Slider>
        </div>
        <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
            <DialogTitle sx={{color:'green', fontSize:28, fontFamily:'inherit', fontWeight:'bold'}}>Edit Slot</DialogTitle>
                <DialogContent>
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: '10px', height:75}}>
                        <TextField
                            label="Start Time"
                            type="time"
                            value={editedStartTime}
                            onChange={(e) => setEditedStartTime(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                            sx={{ marginRight: 2, }}
                        />
                        <TextField
                            label="End Time"
                            type="time"
                            value={editedEndTime}
                            onChange={(e) => setEditedEndTime(e.target.value)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                        />
                    </div>
                </DialogContent>
            <DialogActions>
                <Button onClick={() => setEditDialogOpen(false)}
                sx={{ 
                    backgroundColor: '#000', 
                    color: '#fff',
                    border: '1px solid #fff',
                    borderRadius: "5px", 
                    '&:hover': { backgroundColor: '#000' , color: '#6EC72D',} 
                }}>Cancel</Button>
                <Button onClick={handleEditSlotSubmit} variant="contained" 
                sx={{ 
                    backgroundColor: '#6EC72D', 
                    color: '#fff',
                    border: '1px solid #fff',
                    borderRadius: "5px", 
                    '&:hover': { backgroundColor: '#6EC72D' , color: '#000',} 
                }}>
                Save</Button>
            </DialogActions>
        </Dialog>
        </>
    );

}

export default TrainerViewSlot;
