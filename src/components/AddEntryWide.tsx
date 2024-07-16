import { AddCircleOutline } from '@mui/icons-material';
import { Alert, Box, Button, Card, Chip, CircularProgress, IconButton, Popover, TextField, Typography } from '@mui/material';
import React from 'react';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import { CategoryEdit } from './CategoryEdit';
import { useAppDataContext, useSnackbarContext } from '../Providers/contextHooks';
import { AddOpenEntry, addEntry, deleteOpenEntry, updateOpenEntry } from '../firebase/db';
import { Category, OpenEntry } from '../firebase/types';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import { TimeElapsed } from './TimeElapsed';
import { flattenCategories } from '../utils/flattenCategories';
export const AddEntryWide: React.FC = () => {
    const {  setOpenEntry, openEntry, categories } = useAppDataContext()
    const [desc, setDesc] = React.useState(openEntry.desc || "")
    const s = useSnackbarContext();
    const [isRunning, setIsRunning] = React.useState(false)
    const hasId = !!openEntry.entryId
    React.useEffect(() => {
        if (hasId) {
            setIsRunning(true);
            setDesc(openEntry.desc)

        } else {
            setIsRunning(false);
            setDesc('')
        }
    }, [hasId, openEntry.desc])
    const addCategory = (category: Category) => {
        console.log('category added to UI', category.categoryName)
        const flattened = flattenCategories([category], categories)
        const categoryIds = flattened.map((c) => c.categoryId)
        setOpenEntry((p) => (p && { ...p, categories: [category], categoryIds }))
        console.log('after setting', openEntry)
        if (openEntry && openEntry.entryId) {
            console.log(openEntry)
            updateOpenEntry({ ...openEntry, categories: [category] })
            s.onSetComponent(<Alert variant='filled' severity='success'>Category updated</Alert>)
            s.toggleOpen()
        }
    }
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setDesc(e.target.value);
    }
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const updateDesc = async (desc: string) => {
        if (!openEntry.entryId) {
            return
        }
        if (desc === openEntry.desc) {
            return;
        }
        try {
            await updateOpenEntry({ ...openEntry, desc })

            console.log('updated')
            s.onSetComponent(<Alert variant='filled' severity='success'>Description updated</Alert>)
            s.toggleOpen();

        } catch (e) {
            alert(e)
        }

    }

    const onStart = async () => {
        setIsRunning(true)
        s.onSetComponent(<Alert severity='success'>Logging started</Alert>)
        s.toggleOpen();
        if (!openEntry) {
            return;
        }
        try {

            const ref = await AddOpenEntry({ ...openEntry, desc })
            if (ref) {
                console.log('adding open entry', ref)
                setOpenEntry(ref as unknown as OpenEntry)
            }
        } catch (e) {
            alert(e)
        }
    }


    const onStop = async () => {

        setIsRunning(false)
        if (!openEntry) {
            return;
        }
        try {
            if (!openEntry.entryId) {
                alert('no entryId')
                return;
            }
            await addEntry({ ...openEntry, entryId: openEntry.entryId })
            setOpenEntry({ categories: [], desc: '', entryId: '', endTime: { nanoseconds: 0, seconds: 0 }, startTime: { nanoseconds: 0, seconds: 0 }, created: { nanoseconds: 0, seconds: 0 } })
            setDesc('')
            s.onSetComponent(<Alert severity='success'>New item logged!</Alert>)
            s.toggleOpen();
        }
        catch (e) {
            alert(e)
        }

    }
    const onCancel = () => {
        if (!openEntry) {
            return;
        }
        if (!openEntry.entryId) {
            return;
        }
        deleteOpenEntry({ entryId: openEntry.entryId })
    }

    const handleClose = () => {
        setAnchorEl(null);
    };
    const onStartStop = () => {
        isRunning ? onStop() : onStart()
    }
    const component = {
        'simple-popover': <CategoryEdit addCategory={addCategory} onHandleClose={handleClose} />
        ,
        'more': <Button color='error' size='small' onClick={onCancel} >Cancel</Button>
    }
    const open = Boolean(anchorEl);
    const id = open ? anchorEl?.id === 'more' ? 'more' : 'simple-popover' : undefined;
 

    return <Card elevation={4} variant='elevation' sx={{ p: 1, mb: 1 }}>
        <Box alignItems={'center'} display={'flex'}>
            <TextField
                onBlur={() => updateDesc(desc)}
                onKeyDown={(e) => {
                    if(e.key == 'Enter'){
                        updateDesc(desc)
        
                    }
                }}
                value={desc}
                onChange={onChange}
                size='small'
                placeholder='What are you working on?'
                sx={{ mr: 1, display: 'flex', flexGrow: '1' }} />
            {openEntry.categories?.length ? null : <Button
                color='primary'
                sx={{ mr: 1, p: 1 }}
                onClick={handleClick}
                startIcon={<AddCircleOutline />}>
                <Typography sx={{ textTransform: 'capitalize' }} variant='body2'>Add category</Typography>
            </Button>}
            {openEntry.categories?.map((c) => <Chip component={'button'} onClick={handleClick} key={c.categoryId} label={c.categoryName} sx={{
        border: '1px solid transparent',
        borderColor: c.color,
        color: c.color,
        fontWeight:600,
        background: c.color+"34",
        mr:1
    }} />)}
            <Box display={'flex'} alignItems={'center'} sx={{ ml: 'auto' }}>
                {isRunning && <CircularProgress variant='indeterminate' color='success' sx={{ m: 1, height: 20, width: 20 }} size='small' />}

                {isRunning ? <TimeElapsed startTimeSeconds={openEntry?.startTime?.seconds} /> : <Typography fontWeight={'bold'}>00:00:00</Typography>}

                <IconButton onClick={onStartStop} 
                disabled={desc.length == 0}
                size='small' 
                color={isRunning ? 'warning' : 'success'} 
                sx={{ ml: 1 }}>
                    {!isRunning ? <PlayCircleFilledWhiteIcon /> : <StopCircleIcon />}
                </IconButton>

            </Box>
        </Box>
        <Popover id={id}
            anchorEl={anchorEl}
            open={open}
            autoFocus
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
            {id && component[id]}
        </Popover>
    </Card>
}