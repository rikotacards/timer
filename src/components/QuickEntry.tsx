import { Alert, Card, CardActionArea, Chip, Typography } from '@mui/material';
import React from 'react';
import { useSnackbarContext } from '../Providers/contextHooks';

export const QuickEntry: React.FC = () => {
    const {toggleOpen, onSetComponent} = useSnackbarContext();
    const onClick = () => {
        onSetComponent(<Alert variant='filled' sx={{width: '100%'}} severity='success'>Starting timer</Alert>)
        toggleOpen()
    }
    return (
    <Card sx={{m:1}}>
        <CardActionArea onClick={onClick} sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography variant='caption'>Leetcode</Typography>
            <Chip size='small' label='Leetcode' />
        </CardActionArea>
    </Card>
    )
}