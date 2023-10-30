import React from 'react';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import HomeIcon from '@mui/icons-material/Home';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from 'react-router-dom';

function UserSideBar() {

    const navigate = useNavigate();


    return (
        <Stack direction="row" spacing={4} sx={{width: '10vh', height: '330px',paddingLeft:'0',paddingTop:'16.55vh' }}>
            <Paper sx={{
                background: 'black',
                color: '#fff',
                borderRadius:'0'
            }}>
                <MenuList sx={{width:'45vh', paddingTop:'4.5vh'}}>
                    <MenuItem sx={{
                        fontSize:'25px',
                        fontWeight:'bolder',
                        fontFamily: 'inherit',
                        color:'#88C13E',
                        borderBottom: '1px solid #555',
                        '&:hover': {
                            backgroundColor: '#333',
                        }
                    }}><HomeIcon fontSize="large" sx={{paddingRight:'20px',color:'#fff'}}/>My Dashboard</MenuItem>
                    <MenuItem onClick={() => navigate('/user/subscription-details')} sx={{
                        fontSize:'25px',
                        fontWeight:'bolder',
                        fontFamily: 'inherit',
                        color:'#88C13E',
                        borderBottom: '1px solid #555',
                        '&:hover': {
                            backgroundColor: '#333',
                        }
                    }}><SubscriptionsIcon fontSize="large" sx={{paddingRight:'20px',color:'#fff'}}/> My Subscriptions</MenuItem>
                    <MenuItem onClick={() => navigate('/user/viewtrainers')} sx={{
                        fontSize:'25px',
                        fontWeight:'bolder',
                        fontFamily:'inherit',
                        color:'#88C13E',
                        borderBottom: '1px solid #555',
                        '&:hover': {
                            backgroundColor: '#333',
                        }
                    }}><PersonAddIcon fontSize="large" sx={{paddingRight:'20px',color:'#fff'}}/> Book My Trainer</MenuItem>
                    <MenuItem sx={{
                        fontSize:'25px',
                        fontWeight:'bolder',
                        fontFamily:'inherit',
                        color:'#88C13E',
                        borderBottom: '1px solid #555',
                        '&:hover': {
                            backgroundColor: '#333',
                        }
                    }}><OndemandVideoIcon fontSize="large" sx={{paddingRight:'20px',color:'#fff'}}/> My Classes</MenuItem>
                    <MenuItem sx={{
                        fontSize:'25px',
                        fontWeight:'bolder',
                        fontFamily:'inherit',
                        color:'#88C13E',
                        '&:hover': {
                            backgroundColor: '#333',
                        }
                    }}><ChatIcon fontSize="large" sx={{paddingRight:'20px',color:'#fff'}}/> Chat Support</MenuItem>
                </MenuList>
            </Paper>
        </Stack>
    )
}

export default UserSideBar