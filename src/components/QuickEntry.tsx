import { Card, CardActionArea, Chip, Typography } from '@mui/material';
import React from 'react';
import { useSnackbarContext } from '../Providers/contextHooks';

export const QuickEntry: React.FC = () => {
    const {toggleOpen} = useSnackbarContext();
    return (
    <Card sx={{m:1}}>
        <CardActionArea onClick={toggleOpen} sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography variant='caption'>Leetcode</Typography>
            <Chip size='small' label='Leetcode' />
        </CardActionArea>
    </Card>
    )
}