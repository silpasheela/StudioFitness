import {useEffect, useState} from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import AddCircleIcon from '@mui/icons-material/AddCircle'; // Material-UI Add Circle Icon
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import { Button, Grid  } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { adminBlockUnblockService, adminGetAllServices } from '../../app/features/Admin/adminSlice';
import { instance } from '../../api/axiosInstance';



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
    // hide last border
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



function AdminServiceData() {

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(adminGetAllServices());
    },[])

    const rows = useSelector(state => state.admin?.users?.services);

    console.log(rows)

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows?.length - page * rowsPerPage);

    const tableHead = [
        {
            id:'slno',
            label: 'No.'
        },
        {
            id:'service',
            label: 'SERVICE'
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

    const handleBlocking = (id) => {
        console.log("id hey",id);
        dispatch(adminBlockUnblockService(id)).then(() => {
            dispatch(adminGetAllServices());
        })
    }

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [serviceDetails, setServiceDetails] = useState({
        service: '',
        description: '',
    });

    const [formErrors, setFormErrors] = useState({
        service: '',
        description: '',
    })

    let errorData = { service: "", description: "",};

    const openModal = () => {
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const addService = async(e) => {
        
        e.preventDefault();
        let isValid = true;

        if(serviceDetails.service<2) {
            errorData.service = "Service must be at least 3 characters";
            isValid = false;
        }

        if(serviceDetails.description<5) {
            errorData.description = "Service must be at least 5 characters";
            isValid = false;
        }

        setFormErrors(errorData);

        if(isValid) {

            try {
                const response = await instance.post('admin/add-service', serviceDetails);
                console.log(response.service)

                if(response.status === 201) {
                    setServiceDetails({
                        service:'',
                        description: '',
                    });
                    dispatch(adminGetAllServices());
                    closeModal();
                }
            } catch (error) {
                console.log(error)
            }
        }

    };

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
            Services Management
            {/* table content */}
        </Typography>

        <Grid container justifyContent="flex-end" paddingBottom={'15px'}>
            <Button
            variant="contained"
            onClick={openModal}
            color="primary"
            startIcon={<AddCircleIcon />} 
            sx={{
                    backgroundColor: '#6EC72D', 
                    color: '#fff',
                    borderRadius: "5px", 
                    '&:hover': { backgroundColor: '#6EC72D' , color: '#161616'} 
                }}
            >
            Add Service
            </Button>
        </Grid>

        <TableContainer component={Paper} style={{ maxWidth: 800 ,  }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
            {/* table headings */}
                <TableHead>
                    <TableRow>
                        {tableHead?.map((column) => 
                            { return (<StyledTableCell key={column.id}>{column.label}</StyledTableCell>)}
                        )}
                    </TableRow>
                </TableHead>
                
            <TableBody>
                {(rowsPerPage > 0
                ? rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
                )?.map((row,index) => (
                <StyledTableRow key={index}>
                    <StyledTableCell component="th" scope="row">
                        {index+1}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                        {row?.service}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                    <span style={{ color: row?.isActive ? 'green' : 'red' }}>
                    {row?.isActive ? 'ACTIVE' : 'INACTIVE'}
                    </span>
                    </StyledTableCell>
                    <StyledTableCell align="left">
                        <Grid container alignItems="center">
                            <Grid item>
                                {/* <Button variant="outlined" size="small" onClick={() => handleOpen(row)}>{<VisibilityOutlinedIcon />}</Button> */}
                            </Grid>
                            <Grid item sx={{ml:2}}>
                                <FormGroup>
                                    <FormControlLabel
                                        control={<IOSSwitch sx={{ m: 1 }} 
                                        checked={row?.isActive}
                                        onChange={() => {handleBlocking(row._id)}} 
                                        />}
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
            </Table>
            <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>




            <Dialog open={isModalOpen} onClose={closeModal}>
                <DialogTitle sx={{ backgroundColor: '#88C13E', color: '#fff', textAlign: 'center' }}>Add New Service</DialogTitle>
                <DialogContent sx={{ backgroundColor: '#f5f5f5' }}>
                    <TextField
                    label="Service Name"
                    fullWidth
                    variant="outlined"
                    value={serviceDetails.service}
                    onChange={(e) => setServiceDetails({ ...serviceDetails, service: e.target.value })}
                    sx={{ marginBottom: 2, marginTop: 2 }}
                    />
                    <TextField
                    label="Service Description"
                    padding={10}
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    value={serviceDetails.description}
                    onChange={(e) => setServiceDetails({ ...serviceDetails, description: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                <Button onClick={closeModal} 
                        sx={{
                            backgroundColor: '#161616', 
                            color: '#fff',
                            borderRadius: "5px", 
                            '&:hover': { backgroundColor: '#161616' , color: '#6EC72D'} 
                        }}>
                        Cancel
                </Button>
                <Button onClick={(e) => {addService(e)}} 
                        sx={{
                            backgroundColor: '#6EC72D', 
                            color: '#161616',
                            borderRadius: "5px", 
                            '&:hover': { backgroundColor: '#6EC72D' , color: '#fff'} 
                        }}>
                        Add
                </Button>
                </DialogActions>
            </Dialog>


        </div>
        
    );
}

export default AdminServiceData