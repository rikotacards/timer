import { Box, Card, Typography } from '@mui/material';
import React from 'react';

export const ActiveEntry: React.FC = ()=> {
    return (
        <Card  elevation={10} sx={{p:1}}>
            <Box sx={{display: 'flex',flexDirection: 'row', alignItems: 'center'}}>

            <Box sx={{display: 'flex', flexDirection: 'column'}}>
            <Typography variant='caption' fontWeight={'bold'}>3:34pm</Typography>
            <Typography fontWeight={'bold'}>Travel to airpot</Typography>
            </Box>
            <Box sx={{ml: 'auto'}}>

            <Typography variant='h4' fontWeight={'bold'}>00:34:54</Typography>
            </Box>

            </Box>
            
        </Card>
    )
}