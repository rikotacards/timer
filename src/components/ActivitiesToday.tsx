import { Box, Card, IconButton, Typography } from '@mui/material';
import React from 'react';
import { Entry as EntryType } from '../firebase/types';

import { getEntriesByDateRange } from '../firebase/db';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useNavigate } from 'react-router';
import { EntryNarrow } from './EntryNarrow';
const today = new Date();
const endOfDay = new Date(today)
endOfDay.setHours(0, 0, 0, 0)

export const ActivitiesToday: React.FC = () => {
    const [entries, setEntries] = React.useState<EntryType[]>([])
    const nav = useNavigate();

    const goToHistory = () => {
        nav('/history')
    }
    React.useEffect(() => {
        console.log('GETTING');

        getEntriesByDateRange({ start: today, end: endOfDay }).then((e) => {
            type NewType = EntryType;

            setEntries(e as NewType[])
            console.log(e)
        }).catch((e) => alert( e))
    }, [])
    return (
        <>
        <Typography
                sx={{ mb: 1 }}
                variant='h6'
                fontWeight={'bold'}
            >Activities today
            </Typography>

            <Card elevation={0} sx={{ mb: 1 }}>
                {entries.length === 0 && <Typography sx={{ p: 1 }} variant='body2'>No entries yet.</Typography>}
                {entries.map((e) => <EntryNarrow key={e.entryId} hideTimestamp={false} {...e} />)}
            </Card>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>

                <Typography variant='h6' fontWeight={'bold'}>History</Typography>
                <IconButton onClick={goToHistory} size='small' ><ChevronRightIcon />
                </IconButton>
            </Box></>
    )
}


