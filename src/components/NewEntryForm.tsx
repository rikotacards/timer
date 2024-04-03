import { AddCircleOutline } from '@mui/icons-material';
import { Box, Button, Card, TextField, Typography } from '@mui/material';
import React from 'react';

export const NewEntryForm: React.FC = () => {
    return <Card sx={{ p: 1, alignItems: 'center', display: 'flex' }}>
        <Box alignItems={'center'} display={'flex'}>

            <TextField placeholder='What are you doing?' />
            <Button sx={{ml:1}}>
                <AddCircleOutline />
                <Typography ml={1} variant='caption'>Add category</Typography>
            </Button>
            <Button variant='contained' sx={{ml:1}}>
                Start
            </Button>
        </Box>
    </Card>
}