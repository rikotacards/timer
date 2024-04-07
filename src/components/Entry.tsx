import { Alert, Box, Button, Card, Chip, IconButton, Popover, TextField, Tooltip, Typography } from '@mui/material';
import React from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import { MoreVertOutlined } from '@mui/icons-material';
import { CategoryEdit } from './CategoryEdit';
import { OpenEntry } from '../firebase/types';
import { deleteEntry } from '../firebase/db';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';

import { formatTime } from '../utils/formatTime';
import { useSnackbarContext } from '../Providers/contextHooks';
export const Entry: React.FC<OpenEntry> = ({ desc, entryId, startTime, endTime, categories }) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const snackbar = useSnackbarContext();
    const [isEdit, setIsEdit] = React.useState(false);
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

    const onDelete = async () => {
        handleClose()
        entryId && await deleteEntry({ entryId })
        snackbar.onSetComponent(<Alert severity='success'>Deleted entry</Alert>)

    }
    const component = {
        'simple-popover': <CategoryEdit onHandleClose={handleClose} />,
        'more': <Button color='error' size='small' onClick={onDelete} >Delete</Button>
    }




    const formattedDuration = endTime?.seconds ? formatTime(endTime?.seconds - startTime.seconds) : 0
    const open = Boolean(anchorEl);

    const id = open ? anchorEl?.id === 'more' ? 'more' : 'simple-popover' : undefined;


    return <div>
        <Card elevation={1} sx={{ mt: 1, mb: 1 }}>
            <Box sx={{ p: 1, display: 'flex', flexDirection: 'row', justifyContent: 'left', }}>

                <div onClick={() => setIsEdit(true)} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft:4 }}>

                    {isEdit ? <TextField size='small' variant='outlined' value={desc} /> : <Typography >{desc}</Typography>}


                </div>
                <Box sx={{ marginTop: 0, ml: 1, alignContent: 'center' }}>
                    <Tooltip title='Add category'>

                        <IconButton onClick={handleClick} id={id} size='small'>
                            <AddCircleOutlineIcon fontSize='small' />
                        </IconButton>
                    </Tooltip>
                    {categories?.map(c => <Chip key={c.categoryId} size='small' onDelete={() => { }} label={c.categoryName} sx={{ background: c.color }} />)}

                </Box>
                <Box flexDirection={'row'} display='flex' alignItems={'center'} marginLeft={'auto'}>

                    <Typography sx={{ ml: 1, mr: 1 }}>{formattedDuration}</Typography>
                    <IconButton color='inherit'>
                        <PlayCircleFilledWhiteOutlinedIcon/>
                    </IconButton>
                </Box>
                <Tooltip title='Options'>

                    <IconButton onClick={handleClick} id={'more'}>
                        <MoreVertOutlined/>
                    </IconButton>
                </Tooltip>
            </Box>
        </Card>
        <Popover id={id}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            {id && component[id]}
        </Popover>
    </div>
}