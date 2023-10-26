import { Box, Button, Stack, Typography, } from '@mui/material'
import React, { useState } from 'react'
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Avatar from '@mui/material/Avatar';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import IconButton from '@mui/material/IconButton';
import RateReviewIcon from '@mui/icons-material/RateReview';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import Rating from '@mui/material/Rating';




function Demos() {

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Stack direction={'column'} sx={{width: '75%', border:2, backgroundColor:'#000', paddingTop:5, borderColor:'#6EC72D', borderRadius:10}}>
      <Box sx={{display:'flex',flexDirection:'row', justifyContent:'space-around'}}>
        <Box>
        <Avatar sx={{height:250,width:250}} alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </Box>
        <Box sx={{marginTop:10,marginLeft:'-15%'}}>
          <Typography variant="h4"  sx={{ fontWeight: 'bolder', color:'#fff'}} align='left'>Ruby Perrin</Typography>
          <Typography align='left'sx={{color:'#6EC72D'}} >B.Tech</Typography>
          <Typography variant="h6" sx={{ fontWeight: 'bolder', color:'#757575', fontFamily:'initial'}} align='left'>Zumba Instructor</Typography>
          <Typography align='left' component="legend"></Typography>
          <Rating name="read-only" value={4} readOnly sx={{marginLeft:-10, }} />          
        </Box>

        <Box sx={{marginTop:5, }}>
        <Typography sx={{fontSize:13, color:'#fff'}} align='left'>
          <IconButton sx={{color:'#fff'}}>
            <ThumbUpOffAltIcon/>
          </IconButton>
          2 Votes
        </Typography>
        <Typography sx={{fontSize:13,color:'#fff'}}align='left'>
          <IconButton sx={{color:'#fff'}}>
            <CalendarMonthIcon/>
          </IconButton>
          Slots
        </Typography>
        <Typography sx={{fontSize:13,color:'#fff' }}align='left'>
          <IconButton sx={{color:'#fff'}}>
            <RateReviewIcon/>
          </IconButton>
          2 Feedbacks
        </Typography>
        <Typography sx={{fontSize:13,color:'#fff'}}align='left'>
          <IconButton sx={{color:'#fff'}}>
            <LocationOnIcon/>
          </IconButton>
          State
        </Typography>
        <Button fullWidth sx={{marginTop:3, borderColor:'#6EC72D', color:'#6EC72D', border:'1px solid', 
          '&:hover': { backgroundColor: '#6EC72D' , color: '#000'} }}>
          add feedback
        </Button>
        <Button fullWidth sx={{marginTop:1.5, backgroundColor:'#6EC72D', color:'#fff',
        '&:hover': { backgroundColor: '#6EC72D' , color: '#000'} }}>book slot</Button>
        </Box>
      </Box>

      <Box sx={{ width: '100%', typography: 'body1',marginTop:2, }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example"
              sx={{
                  "& .MuiTab-root": {
                    color: "#fff",
                    "&.Mui-selected": {
                      color: "#6EC72D",
                    },
                  },
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#6EC72D", 
                  },
                }}
              >
              <Tab label="Overview" value="1"   />
              <Tab label="Reviews" value="2" 
                
              />
            </TabList>
          </Box>
          <TabPanel sx={{color:'#757575'}} align='left' value="1">Strength training is another key part of a fitness training plan. Muscular fitness can help you increase bone strength and muscle fitness. And it can help you stay at a healthy weight or lose weight. It also can improve your skills in doing everyday activities. Aim to do strength training of all the major muscle groups at least twice a week.</TabPanel>
          <TabPanel sx={{color:'#fff'}} value="2">Item Two</TabPanel>
        </TabContext>
      </Box>
    </Stack>
  )
}

export default Demos