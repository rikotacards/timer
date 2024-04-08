import { Alert, Box, Button, Card, Chip, IconButton, Popover, TextField, Tooltip, Typography } from '@mui/material';
import React from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import { MoreVertOutlined } from '@mui/icons-material';
import { CategoryEdit } from './CategoryEdit';
import { OpenEntry } from '../firebase/types';
import { deleteEntry } from '../firebase/db';

import { formatTime } from '../utils/formatTime';
import { useDrawerContext, useSnackbarContext } from '../Providers/contextHooks';
import { MoreMenuNarrow } from './MoreMenuNarrow';
export const EntryMobile: React.FC<OpenEntry> = ({ desc, entryId, startTime, endTime, categories }) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const snackbar = useSnackbarContext();
    const [isEdit, setIsEdit] = React.useState(false);
    const drawerContext = useDrawerContext()
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
        'simple-popover': <CategoryEdit addCategory={() => { }} onHandleClose={handleClose} />,
        'more': <Button color='error' size='small' onClick={onDelete} >Delete</Button>
    }


    const onMoreClick = () => {
        drawerContext.onSetAnchor('bottom');
        drawerContext.onSetComponent(<MoreMenuNarrow />)
        drawerContext.toggleOpen()
    }

    const formattedDuration = endTime?.seconds ? formatTime(endTime?.seconds - startTime.seconds) : 0
    const open = Boolean(anchorEl);

    const id = open ? anchorEl?.id === 'more' ? 'more' : 'simple-popover' : undefined;


    return <div >
        {/* <Box mr={1}>
            <Typography variant='caption'>2:34pm</Typography>
        </Box> */}
        {/* <Box flexDirection={'column'} display={'flex'} mr={1}>

                    <Typography variant='caption'>2:34pm</Typography>
                    <Typography variant='caption'>2:56pm</Typography>
        </Box> */}

        <Card  elevation={0} sx={{ width: '100%', display: 'flex', mt: 1, mb: 1, flexDirection: 'row' }}>
           
            <Box sx={{ width: '100%', p: 1, display: 'flex', flexDirection: 'column', justifyContent: 'left' }}>
                <Typography variant='caption'>2:34pm - 2:36pm</Typography>
                <div onClick={() => setIsEdit(true)} style={{ display: 'flex', flexDirection: 'row', alignItems: 'left' }}>

                    {isEdit ? <TextField size='small' variant='outlined' value={desc} /> : <Typography fontWeight={600} >{desc}</Typography>}

                </div>


                <Box flexDirection={'row'} display='flex'>

                    <Typography sx={{  mr: 1 }}>{formattedDuration}</Typography>

                </Box>


                    <Box sx={{ mt: 1, ml: 0, alignContent: 'center' }}>
                        {categories?.map(c => <Chip key={c.categoryId} size='small' onDelete={() => { }} label={<Typography variant='caption'>{c.categoryName}</Typography>} sx={{ background: c.color, mr: 0.5 }} />)}
                        <Tooltip title='Add category'>
                            <IconButton onClick={handleClick} id={id} size='small'>
                                <AddCircleOutlineIcon fontSize='small' />
                            </IconButton>
                        </Tooltip>



                </Box>
            </Box>
            {/* <IconButton color='inherit'>
                        <PlayCircleFilledWhiteOutlinedIcon />
                    </IconButton> */}
            <Tooltip title='Options'>
                <IconButton onClick={onMoreClick} id={'more'}>
                    <MoreVertOutlined />
                </IconButton>
            </Tooltip>
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