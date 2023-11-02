import {useEffect, useState} from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Card,CardContent,TextField, Avatar,Divider} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { adminBlockUnblockTrainer, adminGetAllTrainers, adminVerifyTrainer, adminGetTrainer } from '../../app/features/Admin/adminSlice'
import Modal from '@mui/material/Modal';
import DataTable from '../DataTable/DataTable'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    // bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    bgcolor: '#e4f5ce'
};

function AdminTrainerData() {

    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(adminGetAllTrainers());
    },[dispatch])

    const rows = useSelector(state => state.admin?.trainers?.trainers);

    console.log("hellllllllllooooooo",rows)

    //modal
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleOpen = (user) => {
        setSelectedUser(user);
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    

    const handleToggleActive = (id) => {
        dispatch(adminVerifyTrainer(id)).then(() => {
            dispatch(adminGetTrainer(id));
            console.log("dispatch",id)
        })
    }



    const tableHead = [
        {
            id:'fullName',
            label: 'NAME'
        },
        {
            id:'email',
            label: 'EMAIL'
        },
        {
            id:'gender',
            label: 'GENDER'
        },
        {
            id:'isActive',
            label: 'STATUS'
        },
        {
            id:'action',
            label: 'ACTIONS'
        },
    ]


    const tableContent = rows;

    // const handleBlocking = (id) => {

    //     dispatch(adminBlockUnblockTrainer(id)).then(() => {
    //         dispatch(adminGetAllTrainers());
    //     })
    // }

    const handleBlocking = (id) => {
        confirmAlert({
            title: 'Confirmation',
            message: 'Are you sure you want to proceed with this action?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        dispatch(adminBlockUnblockTrainer(id)).then(() => {
                            dispatch(adminGetAllTrainers());
                        })
                    }
                },
                {
                    label: 'No',
                }
            ]
        });
    };
    

    const trainerTableProps = {
        tableHead,
        tableTitle:"TRAINER DETAILS",
        tableContent,
        handleBlocking,
        handleOpen
    }

    return (
        <>
        <div>
            {rows?.length>0 && <DataTable {...trainerTableProps} />}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style, width: 400, padding: 1.5, bgcolor: '#000',borderRadius:10,}}>
                    {selectedUser && (
                    <Card sx={{bgcolor: '#e4f5ce',}}>
                        <CardContent>
                        <Box display="flex" justifyContent="flex-end">
                            <IconButton onClick={handleClose}>
                            <CloseIcon />
                            </IconButton>
                        </Box>
                        <Box display="flex" alignItems="center" justifyContent="center" marginBottom={2}>
                            <Avatar sx={{ width: 80, height: 80 }}>
                            {/* Replace with user's profile picture if available */}
                            {selectedUser.fullName.charAt(0)}
                            </Avatar>
                        </Box>
                        <Typography id="modal-modal-title" variant="h6" component="h2" textAlign="center">
                            {selectedUser.fullName}
                        </Typography>
                        <Divider sx={{ marginY: 2 }} />
                        <TextField
                            id="email"
                            label="Email"
                            value={selectedUser.email}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            disabled // disable the field
                        />
                        <TextField
                            id="mobileNumber"
                            label="Mobile Number"
                            value={selectedUser.mobileNumber}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            disabled // disable the field
                        />
                        <TextField
                            id="gender"
                            label="Gender"
                            value={selectedUser.gender}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            disabled // disable the field
                        />
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={() => window.open(selectedUser.certificate, "_blank")}
                        >
                            View Certificate
                        </Button>
                        <FormControlLabel
                            control={
                            <Switch
                                checked={selectedUser.isAdminVerified}
                                onChange={() => handleToggleActive(selectedUser._id)}
                                name="isAdminVerified"
                            />
                            }
                            label={selectedUser.isAdminVerified ? "Verified" : "Suspended"}
                        />
                        </CardContent>
                    </Card>
                    )}
                </Box>
            </Modal>
        </div>
        </>
    )
}

export default AdminTrainerData
