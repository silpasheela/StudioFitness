import {useState} from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import { Button,Grid, TextField  } from '@mui/material';
import { GlobalStyles } from '@mui/material';


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

const DataTable = ({ tableHead, tableTitle, tableContent, handleBlocking, handleOpen }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
        setPage(0);
    };

    const filteredRows = tableContent?.filter(
        (row) => row?.fullName.toLowerCase().includes(searchTerm)
    );

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredRows?.length - page * rowsPerPage);

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
            <GlobalStyles
            styles={{
                '*::-webkit-scrollbar': {
                width: '0px',
                background: 'transparent',
                },
            }}
            />
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            {tableTitle}
            </Typography>

            <TextField
            label="Search by Name"
            variant="outlined"
            margin="normal"
            value={searchTerm}
            onChange={handleSearch}
            />
            <TableContainer component={Paper} style={{ maxWidth: 800 }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                <TableRow>
                    {tableHead.map((column) => (
                    <StyledTableCell key={column.id} sx={{ fontWeight: 'bold', fontSize: '20px' }}>
                        {column.label}
                    </StyledTableCell>
                    ))}
                </TableRow>
                </TableHead>
    
                <TableBody>
                {(rowsPerPage > 0
                    ? filteredRows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : filteredRows
                )?.map((row, index) => (
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
                            <Button variant="outlined" size="small" onClick={() => handleOpen(row)}>
                            {<VisibilityOutlinedIcon />}
                            </Button>
                        </Grid>
                        <Grid item sx={{ ml: 2 }}>
                            <FormGroup>
                            <FormControlLabel
                                control={
                                <IOSSwitch
                                    sx={{ m: 1 }}
                                    checked={row?.isActive}
                                    onChange={() => {
                                    handleBlocking(row._id);
                                    }}
                                />
                                }
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
                count={filteredRows?.length}
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


