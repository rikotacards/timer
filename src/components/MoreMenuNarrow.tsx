import { Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useDrawerContext } from '../Providers/contextHooks';

interface MoreMenuNarrowProps {
    onDelete: () => void;
    handleClose: () => void;
}
export const MoreMenuNarrow: React.FC<MoreMenuNarrowProps> = ({onDelete}) => {
    const d = useDrawerContext();
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: 0 }}>
            <Toolbar>
                <Typography fontWeight='bold'>More</Typography>
                <Box sx={{ ml: 'auto' }}>

                    <IconButton onClick={d.toggleOpen}>
                        <KeyboardArrowDownIcon />
                    </IconButton>
                </Box>
            </Toolbar>
            <Box display={'flex'} flexDirection={'column'} padding={1}>
            <Button size='large' variant='contained' color='error' sx={{mb:1}} onClick={() =>{onDelete();d.toggleOpen()}}>
                    Delete
                </Button>
                <Button size='large'  sx={{mb:1}} variant='contained'>
                    Edit
                </Button>
                
                <Button size='large' sx={{mb:1}} variant='contained'>
                    Start
                </Button>
            </Box>

        </Box>
    )
}