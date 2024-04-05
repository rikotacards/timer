import { AddCircleOutline, MoreVertOutlined } from '@mui/icons-material';
import { Box, Button, Card, Chip, CircularProgress, IconButton, Popover, TextField, Typography } from '@mui/material';
import React from 'react';
import { CategoryEdit } from './CategoryEdit';
import { useStopwatchContext } from '../Providers/contextHooks';

export const NewEntryForm: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const {minutes,seconds, start,pause, isRunning} = useStopwatchContext();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover-newentry' : undefined;
    return <Card elevation={5} sx={{ p: 1 }}>
        <Box alignItems={'center'} display={'flex'}>
            <TextField size='small'  placeholder='What are you doing?' sx={{ mr: 1 }} />
            <Chip onDelete={() => { }} label={'Personal'} />
            <IconButton onClick={handleClick} sx={{ ml: 1 }}>
                <AddCircleOutline />
            </IconButton>
            <Box display={'flex'} alignItems={'center'} sx={{ml: 'auto'}}>
               {isRunning && <CircularProgress variant='indeterminate' color='success' sx={{ m: 1, height: 20, width: 20}} size='small' />}

                <Typography sx={{ fontWeight: 'bold' }}>{minutes}:{seconds}</Typography>
                <Button onClick={isRunning? pause : start} size='small' color={isRunning?'warning':'success'} variant='contained' sx={{ ml: 1 }}>
                  {isRunning?  'Pause' : 'Start'}
                </Button>
                <IconButton>
                    <MoreVertOutlined/>
                </IconButton>
            </Box>
        </Box>
        <Popover id={id}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <CategoryEdit onHandleClose={handleClose} />
        </Popover>
    </Card>
}