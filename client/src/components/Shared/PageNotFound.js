import React from 'react'
import { Box, Button, Container, SvgIcon, Typography } from '@mui/material';
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";

function PageNotFound() {
    return (
        <>
        <Box
            component="main"
            sx={{
                alignItems: 'center',
                display: 'flex',
                flexGrow: 1,
                minHeight: '100%'
            }}
        >
        <Container maxWidth="md">
        <Box
            sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
            }}
        >
            <Box
            sx={{
                mb: 3,
                textAlign: 'center'
            }}
            >
            <img
                alt="Under development"
                src="https://res.cloudinary.com/djd2rpgil/image/upload/v1700753829/theme/gf6fj0ocqomcuwc9clv4.gif"
                style={{
                display: 'inline-block',
                maxWidth: '100%',
                width: 550
                }}
            />
            </Box>
            <Typography
            align="center"
            sx={{ mb: 3 , fontFamily:'cursive'}}
            variant="h3"
            >
            404: The page you are looking for isn't here
            </Typography>
            <Typography
            align="center"
            color="text.secondary"
            variant="body1"
            >
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation
            </Typography>
            <Button
            href="/"
            startIcon={(
                <SvgIcon fontSize="small">
                <KeyboardArrowLeft />
                </SvgIcon>
            )}
            sx={{ mt: 3,backgroundColor: '#6EC72D', 
                color: '#000',
                borderRadius: "5px", 
                '&:hover': { backgroundColor: '#6EC72D' , color: '#fff'}  }}
            variant="contained"
            >
            Back to Home
            </Button>
        </Box>
        </Container>
        </Box>
        </>
    )
}

export default PageNotFound