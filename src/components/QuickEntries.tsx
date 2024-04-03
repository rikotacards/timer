import {  Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import { QuickEntry } from './QuickEntry';
import { MoreHorizRounded } from '@mui/icons-material';

export const QuickEntries: React.FC = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', mt:1, mb:1 }}>
          <Box sx={{display: 'flex', alignItems: 'center'}}>

            <Typography>
                Quick Entries
            </Typography>
            <IconButton>
                <MoreHorizRounded/>
            </IconButton>
          </Box>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                <QuickEntry/>
                <QuickEntry/>

            </Box>
        </Box>
    )
}