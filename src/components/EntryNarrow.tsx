import { Alert, Box, Button, Card, CardActionArea, Divider, IconButton, Popover, TextField, Tooltip, Typography } from '@mui/material';
import React from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { MoreVertOutlined } from '@mui/icons-material';
import { CategoryEdit } from './CategoryEdit';
import { OpenEntry } from '../firebase/types';
import { deleteEntry } from '../firebase/db';
import { formatTime } from '../utils/formatTime';
import { useDrawerContext, useSnackbarContext, useTopAppBarContext } from '../Providers/contextHooks';
import { MoreMenuNarrow } from './MoreMenuNarrow';
import { useNavigate } from 'react-router';
import { CategoryTopAppBar } from './CategoryTopAppBar';
import { CategoryChips } from './CategoryChips';
export const EntryNarrow: React.FC<OpenEntry & { hideTimestamp: boolean }> = ({
    hideTimestamp,
    desc,
    entryId,
    startTime,
    endTime,
    categories
}) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const snackbar = useSnackbarContext();
    const [isEdit, setIsEdit] = React.useState(false);
    const drawerContext = useDrawerContext()
    const { onSetComponent } = useTopAppBarContext();
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
    const onChipClick = React.useCallback((categoryName: string, categoryId: string) => {
        onSetComponent(<CategoryTopAppBar />)
        nav(`/stats/${categoryName}`, { state: { categoryId: categoryId } })
    }, [nav, onSetComponent])


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




            <Card sx={{mb:1, width: '100%', p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'left' }}>

                
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>

                    <Box sx={{  display: 'flex', flexDirection: 'column' }}>
                        

                            <TextField 
                            fullWidth
                            onClick={() => setIsEdit(true)}
                            inputProps={{
                                style: {
                                    padding: 0,
                                    fontWeight:600
                                }
                            }}
                              sx={{ display:'flex',p:0, m:0,border: isEdit?undefined :'none', "& fieldset": {m:0, p:0, border: isEdit?undefined : 'none' },}}
                                
                            
                            value={desc} 
                            onBlur={() => setIsEdit(false)} 
                            size='small' variant='outlined' /> 
                               
                        {!hideTimestamp && <Box sx={{ display: 'flex', alignItems: 'center' }}>

                            <Typography color='GrayText' variant='caption'>{startDate} -</Typography>
                            <Typography color='GrayText' variant='caption'>{endDate}</Typography>

                        </Box>}
                    </Box>
                    <Box flexDirection={'row'} display='flex' sx={{ ml: 'auto' }}>
                        <Typography fontWeight={'bold'} variant='body1' sx={{ mr: 1 }}>{formattedDuration}</Typography>
                        <IconButton>

                            <MoreVertOutlined onClick={onMoreClick} />
                        </IconButton>
                    </Box>


                </Box>
                <Box sx={{ mt: 1, ml: 0, alignContent: 'center' }}>
                    <CategoryChips onChipClick={onChipClick} entryCategories={categories} />
                    {false && <Tooltip title='Add category'>
                        <IconButton onClick={handleClick} id={id} size='small'>
                            <AddCircleOutlineIcon color='action' fontSize='small' />
                        </IconButton>
                    </Tooltip>}
                </Box>

            </Card>


   
        {/* <Divider sx={{ width: '100%' }} /> */}
        <Popover id={id}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            {id && component[id]}
        </Popover>
    </div>
}