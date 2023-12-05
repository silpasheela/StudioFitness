import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';
import { instance } from '../../api/axiosInstance';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { trainerGetSlots } from '../../app/features/Trainer/trainerSlice';


function TrainerAddSlot() {


    const dispatch = useDispatch();


    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
    const [slots, setSlots] = useState([{ startTime: moment().format('HH:mm'), endTime: moment().format('HH:mm') }]);

    const [open, setOpen] = useState(false);

    const handleAddSlot = () => {
        setSlots([...slots, { startTime: moment().format('HH:mm'), endTime: moment().format('HH:mm') }]);

    };

    const handleDeleteSlot = (index) => {
        const newSlots = [...slots];
        newSlots.splice(index, 1);
        setSlots(newSlots);
    };

    const handleStartTimeChange = (index, value) => {
        const newSlots = [...slots];
        newSlots[index].startTime = value;
        setSlots(newSlots);
    };

    const handleEndTimeChange = (index, value) => {
        const newSlots = [...slots];
        newSlots[index].endTime = value;
        setSlots(newSlots);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
        for (const slot of slots) {
            const response = await instance.post('trainer/addslot', {
                date,
                startTime: slot.startTime,
                endTime: slot.endTime,
            });

            if (!response.data.success) {
                console.log("err",response.data)
                return;
            }
        }
            toast.success('Slots added successfully!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setOpen(false);
            dispatch(trainerGetSlots());
        } catch (error) {
            console.error(error);
            toast.error(`${error.response.data.error}`, {
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
        <>
        <div style={{marginTop:'0rem',}}>
            <TextField
                label="Date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{
                    min: moment().format('YYYY-MM-DD'), // Prevent past dates
                }}
                sx={{marginRight:'3vh'}}
            />
            <Button
                variant="outlined"
                color="primary"
                onClick={() => setOpen(true)}
                startIcon={<AddCircleIcon />}
                sx={{ 
                    height:'55px',
                    backgroundColor: '#6EC72D', 
                    border: '1px solid #fff',
                    color: '#fff',
                    borderRadius: "5px", 
                    '&:hover': { backgroundColor: '#6EC72D' , color: '#000',border: '1px solid #fff'} 
                }}
            >
                Add Slots
            </Button>
        </div>


        <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title" maxWidth="lg" > 
            <DialogTitle id="form-dialog-title" sx={{color:'green', fontSize:28, fontFamily:'inherit', fontWeight:'bold', paddingLeft:'28%'}}>ADD SLOTS</DialogTitle>
            <DialogContent>
            {slots.map((slot, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', height:75 }}>
                <TextField
                    label="Start Time"
                    type="time"
                    value={slot.startTime}
                    onChange={(e) => handleStartTimeChange(index, e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: 300, // 5 min
                    }}
                    sx={{marginRight:2,}}
                />
                <TextField
                    label="End Time"
                    type="time"
                    value={slot.endTime}
                    onChange={(e) => handleEndTimeChange(index, e.target.value)}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        step: 300, // 5 min
                    }}
                />
                {index > 0 && (
                    <IconButton onClick={() => handleDeleteSlot(index)} color="primary">
                    <DeleteIcon sx={{color:'#ff0000'}} />
                    </IconButton>
                )}
                </div>
            ))}
            <Button
                onClick={handleAddSlot}
                variant="outlined"
                startIcon={<AddCircleIcon />}
                sx={{ 
                    backgroundColor: '#fff', 
                    textTransform: 'none',
                    color: 'green',
                    border: '1px solid #fff',
                    borderRadius: "5px", 
                    '&:hover': { backgroundColor: '#6EC72D' , color: '#fff', border: '1px solid #fff',} 
                }}
            >
                Add new
            </Button>
            </DialogContent>
            <DialogActions>
            <Button onClick={() => setOpen(false)}
                sx={{ 
                    backgroundColor: '#000', 
                    color: '#fff',
                    border: '1px solid #fff',
                    borderRadius: "5px", 
                    '&:hover': { backgroundColor: '#000' , color: '#6EC72D', border: '1px solid #fff',} 
                }}
            >
                Cancel
            </Button>
            <Button onClick={handleSubmit} 
                sx={{ 
                    backgroundColor: '#6EC72D', 
                    color: '#fff',
                    border: '1px solid #fff',
                    borderRadius: "5px", 
                    '&:hover': { backgroundColor: '#6EC72D' , color: '#000', border: '1px solid #fff',} 
                }}>
                Add Slots
            </Button>
            </DialogActions>
        </Dialog>
        </>
    );
}

export default TrainerAddSlot;
