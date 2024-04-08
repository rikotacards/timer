import {  CancelRounded } from '@mui/icons-material';
import {  Box, Button, IconButton, Toolbar } from '@mui/material';
import React from 'react';

export const MoreMenuNarrow: React.FC = () => {
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', padding:0}}>
            <Toolbar>
                More
                <Box sx={{ml: 'auto'}}>

                <IconButton>
                    <CancelRounded/>
                </IconButton>
                </Box>
            </Toolbar>
<Box display={'flex'} flexDirection={'column'} padding={1}>

            <Button variant='outlined'>
                Edit
            </Button>
            <Button variant='outlined'>
                Start
            </Button>
</Box>

        </Box>
    )
}