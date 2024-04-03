import { Box, Button, Card, Chip, IconButton, Popover, TextField, Tooltip, Typography } from '@mui/material';
import React from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { MoreVertOutlined } from '@mui/icons-material';
import { CategoryEdit } from './CategoryEdit';
export const Entry: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [isStart, setIsStart] = React.useState(true)
    const onToggleTimer = () => {
        setIsStart(!isStart)
    }
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    return <div><Card sx={{ mt: 1, mb: 1 }}>
        <Box sx={{ p: 1, display: 'flex', flexDirection: 'row', justifyContent: 'left', }}>

            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                <TextField size='small' variant='outlined' value='Building Timer' />


            </div>
            <Box sx={{ marginTop: 0, ml: 1, alignContent: 'center' }}>
                <Chip onDelete={() => { }} size='small' label='Study' />
                <Chip onDelete={() => { }} sx={{ ml: 0.5 }} size='small' label='Physics' />
                <Tooltip title='Add category'>

                    <IconButton onClick={handleClick} id={id} size='small'>
                        <AddCircleOutlineIcon fontSize='small' />
                    </IconButton>
                </Tooltip>

            </Box>
            <Box flexDirection={'row'} display='flex' alignItems={'center'} marginLeft={'auto'}>

                <Typography sx={{ ml: 1, mr: 1, fontWeight: 'bold' }}>5:50</Typography>
                <Button onClick={onToggleTimer} size='small' variant='contained'>Start</Button>
            </Box>
            <Tooltip title='Options'>

                <IconButton sx={{ ml: '' }}>
                    <MoreVertOutlined />
                </IconButton>
            </Tooltip>
        </Box>
    </Card>
        <Popover id={id}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            <CategoryEdit onHandleClose={handleClose} />
        </Popover>
    </div>
}