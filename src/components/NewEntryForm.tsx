import { AddCircleOutline, MoreVertOutlined } from '@mui/icons-material';
import { Alert, Box, Button, Card, Chip, CircularProgress, IconButton, Popover, TextField, Typography } from '@mui/material';
import React from 'react';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { CategoryEdit } from './CategoryEdit';
import { useAppDataContext, useSnackbarContext, useStopwatchContext } from '../Providers/contextHooks';
import { AddOpenEntry, addEntry, deleteOpenEntry, updateOpenEntry } from '../firebase/db';
import { Category, OpenEntry } from '../firebase/types';
import { NewEntryFormSkeleton } from './NewEntryFormSkeleton';
import { formatTime } from '../utils/formatTime';
import StopCircleIcon from '@mui/icons-material/StopCircle';
export const BLANK_ENTRY = { desc: '', categories: [], created: { seconds: 0, nanoseconds: 0 }, startTime: { seconds: 0, nanoseconds: 0 }, endTime: null } as OpenEntry
export const NewEntryForm: React.FC = () => {
    const { start, pause, totalSeconds } = useStopwatchContext();
    const {isLoadingActiveEntry, setOpenEntry,openEntry} = useAppDataContext()
   
    const [desc, setDesc] = React.useState("")
    const s = useSnackbarContext();
    const [isRunning, setIsRunning] = React.useState(false)
   React.useEffect(() => {
    if(openEntry.entryId){
        console.log('id', openEntry)
        setIsRunning(true)
    }
   },[openEntry])
    const addCategory = (category: Category) => {
        console.log('category added to UI', category.categoryName)

        setOpenEntry((p) => (p && { ...p, categories: [category] }))
        console.log('after setting', openEntry)
        if (openEntry && openEntry.entryId) {
            console.log(openEntry)
            updateOpenEntry({ ...openEntry, categories: [category] })
        }
    }
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDesc(e.target.value);
    }
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const formatted = formatTime(totalSeconds)
    const onStart = async () => {
        start();
        setIsRunning(true)
        s.onSetComponent(<Alert severity='success'>Logging started</Alert>)
        s.toggleOpen();
        if(!openEntry){
            return;
        }
        try {

            const ref = await AddOpenEntry({...openEntry, desc})
            if (ref) {
                console.log('adding open entry', ref)
                setOpenEntry(ref as unknown as OpenEntry)
            }
        } catch (e) {
            alert(e)
        }
    }
    
    
    const onStop = async () => {
        pause()
        setIsRunning(false)
        if(!openEntry){
            return;
        }
        try {
            console.log('stopping', openEntry)
            if (!openEntry.entryId) {
                alert('no entryId')
                return;
            }
            await addEntry({ ...openEntry, entryId: openEntry.entryId })
            setOpenEntry({ categories: [], desc: '', entryId: '', endTime: { nanoseconds: 0, seconds: 0 }, startTime: { nanoseconds: 0, seconds: 0 }, created: { nanoseconds: 0, seconds: 0 } })
            s.onSetComponent(<Alert severity='success'>New item logged!</Alert>)
            s.toggleOpen();
        }
        catch (e) {
            alert(e)
        }
        
    }
    const onCancel = () => {
        if(!openEntry){
            return;
        }
        if(!openEntry.entryId){
            return;
        }
        deleteOpenEntry({entryId: openEntry.entryId})
    }

    const handleClose = () => {
        setAnchorEl(null);
    };
    const component = {
        'simple-popover':             <CategoryEdit addCategory={addCategory} onHandleClose={handleClose} />
        ,
        'more': <Button color='error' size='small' onClick={onCancel} >Cancel</Button>
    }
    const open = Boolean(anchorEl);
    const id = open ? anchorEl?.id === 'more' ? 'more' : 'simple-popover' : undefined;
    if (isLoadingActiveEntry) {
        return <NewEntryFormSkeleton />
    }
   
    return <Card elevation={4} variant='elevation' sx={{ p: 1 }}>
        <Box alignItems={'center'} display={'flex'}>
            <TextField value={openEntry.desc ||desc} onChange={onChange} size='small' placeholder='What are you doing?' sx={{ mr: 1 }} />
            <IconButton onClick={handleClick} sx={{ ml: 1 }}>
                <AddCircleOutline />
            </IconButton>
            {openEntry.categories?.map((c) => <Chip key={c.categoryId} label={c.categoryName} sx={{ background: c.color }} />)}
            <Box display={'flex'} alignItems={'center'} sx={{ ml: 'auto' }}>
                {isRunning && <CircularProgress variant='indeterminate' color='success' sx={{ m: 1, height: 20, width: 20 }} size='small' />}

                <Typography sx={{ fontWeight: 'bold' }}>{formatted}</Typography>

                <IconButton onClick={isRunning ? onStop : () => onStart()} size='small' color={isRunning ? 'warning' : 'success'} sx={{ ml: 1 }}>
                   {!isRunning? <PlayCircleFilledWhiteIcon/> : <StopCircleIcon/>}
                </IconButton>
                <IconButton>
                    <MoreVertOutlined />
                </IconButton>
            </Box>
        </Box>
        <Popover id={id}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            {id && component[id]}
        </Popover>
    </Card>
}