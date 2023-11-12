import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { trainerGetAppointment } from '../../app/features/Appointment/appointmentSlice';
import Box from '@mui/material/Box';
import MobileStepper from '@mui/material/MobileStepper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Card, CardContent, TextField } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonIcon from '@mui/icons-material/Person';
import CancelIcon from '@mui/icons-material/Cancel';
import { instance } from '../../api/axiosInstance';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function TrainerAppointmentsView() {

    const dispatch = useDispatch();
    const [page, setPage] = useState(0);
    const rowsPerPage = 2;
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
    
    const handleApproval = async(appointmentId) => {
        try {
            const response = await instance.put(`trainer/approve-appointment/${appointmentId}`)
            console.log(response.data);
            dispatch(trainerGetAppointment());
            toast.success("Appointment approved successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        } catch (error) {
            console.log(error);
            toast.error("An error occurred while approving the appointment.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            
        }
    }
    
    const handleRejection = async(appointmentId,reason) => {
        try {
            const response = await instance.put(`trainer/reject-appointment/${appointmentId}`, { reason })
            console.log(response.data);
            dispatch(trainerGetAppointment());
            toast.success("Appointment rejected successfully!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        } catch (error) {
            console.log(error);
            toast.error("An error occurred while rejecting the appointment.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    const filteredData = data?.filter(appointment => {
        if (filter === 'all') return true;
        return filter === appointment?.isTrainerApproved;
    });
    
    return (
        <div style={{marginTop:'-40vh'}}>
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
                            <b style={{ color: '#808080' }}>Client:</b>  {appointment.userId.fullName}
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
                            <b style={{ color: '#706e6e' }}>Status:</b> {appointment?.isTrainerApproved.charAt(0).toUpperCase() + appointment?.isTrainerApproved.slice(1)}
                        </Typography>
                        {appointment?.isTrainerApproved === 'rejected' && (
                            <Typography variant="body1" style={{ color: 'white' ,marginBottom: '8px',}}>
                            <b style={{ color: '#808080' }}>Rejection Reason:</b> {appointment.rejectionReason}
                            </Typography>
                        )}
                        {appointment?.isTrainerApproved === 'pending' && (
                            <Box sx={{ marginTop: 2 , }}>
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
                                            onClick: () => {}
                                        }
                                    ]
                                    })}
                                variant="contained" sx={{backgroundColor:'green',color:'#fff','&:hover': { backgroundColor:'#fff',color:'green'}}}>
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
                                            <Button variant="contained" sx={{backgroundColor:'#000','&:hover': { backgroundColor:'#000',color:'green'}}} onClick={onClose} style={{ margin: '10px' }}>
                                                Cancel
                                            </Button>
                                            <Button variant="contained" sx={{backgroundColor:'green','&:hover': { backgroundColor:'green',color:'#000'}}} onClick={() => {
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
                                variant="contained" sx={{backgroundColor:'red',color:'#fff','&:hover': { backgroundColor:'#fff',color:'red'}}} style={{ marginLeft: '10px' }}>
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
                    <Button size="small" onClick={() => handleChangePage(null, page + 1)} disabled={page >= Math.ceil(filteredData.length / rowsPerPage) - 1}
                    style={{ color: 'green' }}>
                        Next
                        <KeyboardArrowRight />
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={() => handleChangePage(null, page - 1)} disabled={page === 0}
                    style={{ color: 'green' }}>
                        <KeyboardArrowLeft />
                        Back
                    </Button>
                }
            />
        </div>
    );
}

export default TrainerAppointmentsView