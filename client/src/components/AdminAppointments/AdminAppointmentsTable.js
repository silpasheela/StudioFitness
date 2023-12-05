import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { Box, TableSortLabel, TextField, Typography } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { instance } from '../../api/axiosInstance';

const tableCellStyle = {
    fontSize: 14,
};

const headCellStyle = {
    backgroundColor: '#000',
    color: '#fff',
    fontSize:'21px',
    fontWeight:'bold'
};

    function getStatusColor(status) {

        switch (status) {
        case 'pending':
            return 'yellow';
        case 'approved':
            return 'green';
        case 'rejected':
            return 'red';
        default:
            return 'inherit';
        }
    }

    function getStatusIcon(status) {
        switch (status) {
        case 'pending':
            return <ScheduleIcon sx={{ marginTop: '3px' }}/>;
        case 'approved':
            return <CheckCircleIcon style={{ paddingTop: '3px' }}/>;
        case 'rejected':
            return <HighlightOffIcon style={{ paddingTop: '3px' }}/>;
        default:
            return null;
        }
    }

function AdminAppointmentsTable() {

    const [appointments, setAppointments] = useState([]);
    const [orderBy, setOrderBy] = useState('slotDate');
    const [order, setOrder] = useState('asc');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await instance.get('/admin/all-appointments');
                let sortedAppointments = response.data.appointments.sort((a, b) => {
                    if (order === 'asc') {
                        return new Date(a[orderBy]) - new Date(b[orderBy]);
                    } else {
                        return new Date(b[orderBy]) - new Date(a[orderBy]);
                    }
                });
    
                // Filter appointments based on search term
                if (searchTerm) {
                    sortedAppointments = sortedAppointments.filter(
                        (appointment) =>
                            appointment?.userId?.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            appointment?.trainerId?.fullName.toLowerCase().includes(searchTerm.toLowerCase())
                    );
    
                }
                setAppointments(sortedAppointments);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, [order, orderBy, searchTerm]);
    

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        }}>

        <Box display="flex" justifyContent="space-between" alignItems="center" sx={{marginLeft:'-32vh',}}>
            <TextField
                label="Search"
                variant="outlined"
                onChange={(event) => setSearchTerm(event.target.value)}
                sx={{ marginRight: '2rem', borderRadius: '50px',}} 
            />
            <Typography variant="h4" gutterBottom sx={{marginTop:'4vh',fontWeight:'bold'}}>
                APPOINTMENT DETAILS
            </Typography>
        </Box>

            <TableContainer component={Paper} style={{ maxWidth:'98%', marginTop:'2rem'  }}>
                <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                    <TableCell style={headCellStyle}>USER</TableCell>
                    <TableCell align="right" style={headCellStyle}>TRAINER</TableCell>
                    <TableCell align="right" style={headCellStyle}>
                        <TableSortLabel
                        style={headCellStyle}
                        active={orderBy === 'slotDate'}
                        direction={orderBy === 'slotDate' ? order : 'asc'}
                        onClick={() => handleRequestSort('slotDate')}
                        IconComponent={order === 'desc' ? ArrowDropDownIcon : ArrowDropUpIcon}
                        >
                        SLOT DATE 
                        </TableSortLabel>
                    </TableCell>
                    <TableCell align="right" style={headCellStyle}>TIME</TableCell>
                    <TableCell align="right" style={headCellStyle}>APPROVAL STATUS</TableCell>
                    <TableCell align="right" style={headCellStyle}>CANCELLED</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {appointments
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((appointment) => (
                        <TableRow key={appointment?._id}>
                        <TableCell style={tableCellStyle}>{appointment?.userId?.fullName}</TableCell>
                        <TableCell align="right" style={tableCellStyle}>{appointment?.trainerId?.fullName}</TableCell>
                        <TableCell align="right" style={tableCellStyle}>
                            {new Date(appointment?.slotDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell align="right" style={tableCellStyle}>{appointment?.slotStartTime}</TableCell>
                        <TableCell align="right" style={{ ...tableCellStyle, color: getStatusColor(appointment?.isTrainerApproved) }}>
                            {getStatusIcon(appointment?.isTrainerApproved) } {appointment?.isTrainerApproved.toUpperCase()}
                        </TableCell>
                        <TableCell align="right" style={tableCellStyle}>{appointment?.isCancelled ? 'Yes' : 'No'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={appointments.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
}

export default AdminAppointmentsTable;
