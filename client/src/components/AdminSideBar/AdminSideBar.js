import {React,useState} from 'react';
import { useDispatch, } from 'react-redux';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SupervisedUserCircleSharpIcon from '@mui/icons-material/SupervisedUserCircleSharp';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import './AdminSideBar.css'
import {adminLogout} from '../../app/features/Admin/adminSlice'
import { removeAuth } from '../../app/features/Auth/authSlice';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
}),
backgroundColor: 'black',
...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
    }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = (setting) => {
        setAnchorElUser(null);
        if (setting === 'Logout') {
            handleAdminLogout();
        } else if (setting === 'Dashboard') {
            navigate('/admin/dashboard');
        }
    };

    const settings = ['Dashboard', 'Logout'];

    const navigate = useNavigate();
    
    const handleClick = (text) => {
        navigate(`/admin/${text}/details`);
    }

    //LOGOUT

    const dispatch = useDispatch();

    const handleAdminLogout = () => {
        dispatch(adminLogout());
        dispatch(removeAuth());
        navigate('/admin/login')
    }

    


    return (
        <Box sx={{ display: 'flex'}}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
                
            >
                <MenuIcon  />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ color: '#88C13E' }}>
                Admin Dashboard
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Tooltip title="Logout">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Admin Avatar" src="https://res.cloudinary.com/djd2rpgil/image/upload/v1698057230/trainers/tq8io2zpprnhlosanxiv.jpg" />
                </IconButton>
            </Tooltip>
            </Toolbar>
        </AppBar>
        <Drawer
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                backgroundColor: 'black',
                color: 'white'
            },
            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <DrawerHeader>
            <IconButton onClick={handleDrawerClose} color="inherit">
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
            {['Users', 'Trainers', 'Services', 'Dummy2'].map((text, index) => (
                <ListItem key={text} button onClick={() => handleClick(text.toLowerCase().slice(0, -1))}>
                {/* <Link to={`/${text.toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}> */}
                    <ListItemButton>
                    <ListItemIcon sx={{color:'#88C13E'}} >
                        {index % 2 === 0 ? <PeopleAltIcon /> : <SupervisedUserCircleSharpIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    </ListItemButton>
                {/* </Link> */}
                </ListItem>
            ))}
            </List>
            <Divider />
        </Drawer>
        <Main open={open}>
            <DrawerHeader />
            {/* <Typography paragraph>Welcome to the Admin Dashboard</Typography> */}
        </Main>
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
            onClose={() => handleCloseUserMenu('')}
        >
            {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                        <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
            
            ))}
        </Menu>
        </Box>
    );
}
