import { InfoOutlined } from '@mui/icons-material';
import { Box, Button, Card, Typography } from '@mui/material';
import React from 'react';
import { ColorPicker } from './ColorPicker';


export const CategoryNewForm: React.FC = () => {
    return <Card sx={{ mt: 1, mb: 1, p: 1 }}>
        <Box flexDirection={'row'} display={'flex'} alignContent={'center'}>
            <InfoOutlined sx={{ mr: 1 }} />
            <Typography>
                Create new category
            </Typography>
        </Box>
        <ColorPicker/>
        <Button size='small' sx={{m:1}}>Add</Button>
    </Card>
}