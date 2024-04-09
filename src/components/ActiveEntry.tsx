import { Alert, Box, Button, Card, Chip, Typography } from '@mui/material';
import React from 'react';
import { useAppDataContext, useSnackbarContext } from '../Providers/contextHooks';
import { formatTime } from '../utils/formatTime';
import { addEntry } from '../firebase/db';
import { BLANK_ENTRY } from './NewEntryForm';
import { useStopwatch } from 'react-timer-hook';

export const ActiveEntry: React.FC = () => {
    const s = useSnackbarContext();
    const { setOpenEntry, openEntry, isLoadingActiveEntry } = useAppDataContext()
    const now = new Date().getTime() 
    const [hide, setHide] = React.useState(false);
    const curr = new Date()
    const dif = now- openEntry.startTime.seconds * 1000
    curr.setSeconds(curr.getSeconds() + dif/1000);
    const { totalSeconds, pause, reset } = useStopwatch({ autoStart: true, offsetTimestamp: curr });
    const formatted = formatTime(totalSeconds)
    if (isLoadingActiveEntry) {
        null
    }
    if (!openEntry) {
        return null
    }
    if(hide){
        return null
    }
    const onStop = async () => {
        pause()
        reset();
        setHide(true)
        if (!openEntry) {
            return;
        }
        try {
            console.log('stopping', openEntry)
            if (!openEntry.entryId) {
                alert('no entryId')
                return;
            }
            setOpenEntry(BLANK_ENTRY)
            s.onSetComponent(<Alert variant='filled' severity='success'>New item logged!</Alert>)
            s.toggleOpen();
            await addEntry({ ...openEntry, entryId: openEntry.entryId })
        }
        catch (e) {
            alert(e)
        }

    }
    
    // {autoStart: true, offsetTimeStamp: new Date().setSeconds(openEntry.startTime.seconds+dif)}
return (
        <Card elevation={10} sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>

                <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center' }}>

                    <Typography>{openEntry.desc}</Typography>
                        <Typography variant='h5' fontWeight={'bold'}>{formatted}</Typography>
                    <Box>
                        {openEntry?.categories?.map((c) => <Chip size='small' key={c.categoryId} sx={{mb:1, background: c.color }} label={c.categoryName} />)}
                    </Box>
                    <Button size='large' onClick={onStop} color='warning' fullWidth variant='contained'>Stop</Button>
                </Box>

            </Box>

        </Card>
    )
}