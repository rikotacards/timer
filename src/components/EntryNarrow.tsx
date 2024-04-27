import { Alert, Box, Button, Card, Divider, IconButton, Popover, TextField, Tooltip, Typography } from '@mui/material';
import React from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { MoreVertOutlined } from '@mui/icons-material';
import { CategoryEdit } from './CategoryEdit';
import { OpenEntry } from '../firebase/types';
import { deleteEntry } from '../firebase/db';
import { formatTime } from '../utils/formatTime';
import {  useDrawerContext, useSnackbarContext, useTopAppBarContext } from '../Providers/contextHooks';
import { MoreMenuNarrow } from './MoreMenuNarrow';
import { useNavigate } from 'react-router';
import { CategoryTopAppBar } from './CategoryTopAppBar';
import { CategoryChips } from './CategoryChips';
export const EntryNarrow: React.FC<OpenEntry & { hideTimestamp: boolean }> = ({ hideTimestamp, desc, entryId, startTime, endTime, categories }) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const snackbar = useSnackbarContext();
    const [isEdit, setIsEdit] = React.useState(false);
    const drawerContext = useDrawerContext()
    const {onSetComponent} = useTopAppBarContext();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const nav = useNavigate();
    const handleClose = () => {
        setAnchorEl(null);
    };

    const onDelete = async () => {
        entryId && await deleteEntry({ entryId })
        handleClose()
        console.log('closed')
        snackbar.onSetComponent(<Alert variant='filled' severity='success'>Deleted entry</Alert>)
        snackbar.toggleOpen();

    }
    const component = {
        'simple-popover': <CategoryEdit addCategory={() => { }} onHandleClose={handleClose} />,
        'more': <Button color='error' size='small' onClick={onDelete} >Delete</Button>
    }
    const onChipClick = (categoryName: string) => {
        onSetComponent(<CategoryTopAppBar />)
        nav(`/stats/${categoryName}`)
    }


    const onMoreClick = () => {
        drawerContext.onSetAnchor('bottom');
        drawerContext.onSetComponent(<MoreMenuNarrow handleClose={drawerContext.toggleOpen} onDelete={onDelete} />)
        drawerContext.toggleOpen()
    }
    if (!endTime?.seconds || !startTime?.seconds) {
        return null
    }

    const formattedDuration = endTime?.seconds ? formatTime(endTime?.seconds - startTime?.seconds) : 0
    const open = Boolean(anchorEl);
    const id = open ? anchorEl?.id === 'more' ? 'more' : 'simple-popover' : undefined;

    const startDate = new Date(startTime.seconds * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
    const endDate = endTime && new Date(endTime.seconds * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })

    return <div >
        {/* <Box mr={1}>
            <Typography variant='caption'>2:34pm</Typography>
        </Box> */}


        <Card elevation={0} sx={{background: 'transparent', width: '100%', display: 'flex', mt: 0, mb: 1,p:1, flexDirection: 'row' }}>

            <Box sx={{ width: '100%', p: 1, display: 'flex', flexDirection: 'column', justifyContent: 'left' }}>

                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                        <div onClick={() => setIsEdit(true)} style={{ display: 'flex', flexDirection: 'row', alignItems: 'left' }}>

                            {isEdit ? <TextField size='small' variant='outlined' value={desc} /> :
                                <Typography variant='body1' sx={{ textTransform: 'capitalize', fontWeight: '600' }} >{desc}</Typography>}

                        </div>
                        {!hideTimestamp && <Box sx={{ display: 'flex', alignItems: 'center' }}>

                            <Typography color='GrayText' variant='caption'>{startDate} -</Typography>
                            <Typography color='GrayText' variant='caption'>{endDate}</Typography>

                        </Box>}
                    </Box> 
                    <Box flexDirection={'row'} display='flex' sx={{ ml: 'auto' }}>
                        <Typography fontWeight={'bold'}  variant='body1' sx={{ mr: 1 }}>{formattedDuration}</Typography>
                                <MoreVertOutlined onClick={onMoreClick} />
                    </Box>


                </Box>
                <Box sx={{ mt: 1, ml: 0, alignContent: 'center' }}>
                   <CategoryChips onChipClick={onChipClick} entryCategories={categories}/>
                    {false && <Tooltip title='Add category'>
                        <IconButton onClick={handleClick} id={id} size='small'>
                            <AddCircleOutlineIcon color='action' fontSize='small' />
                        </IconButton>
                    </Tooltip>}
                </Box>
            </Box>


        </Card>
        <Divider sx={{width: '100%'}}/>
        <Popover id={id}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            {id && component[id]}
        </Popover>
    </div>
}