import { Box, Card, Chip, Typography } from '@mui/material';
import React from 'react';
import { Entry as EntryType } from '../firebase/types';

import { getEntriesRealTime } from '../firebase/db';

import { EntryNarrow } from './EntryNarrow';
import { totalTimeByCategory } from '../utils/totalTimeByCategoty';
import { groupEntriesByCategoryId } from '../utils/groupEntriesByCategoryId';
import { useAppDataContext } from '../Providers/contextHooks';
import { totalTimeInSeconds } from '../utils/totalTime';
import { formatTime } from '../utils/formatTime';
import { CategoryChip } from './CategoryChip';
const today = new Date();
const endOfDay = new Date(today)
endOfDay.setHours(0, 0, 0, 0)

export const ActivitiesToday: React.FC = () => {
    const [entries, setEntries] = React.useState<EntryType[]>([])
    const setEntryData = (entries: EntryType[]) => {
        setEntries(entries)
    }
    const {categories} = useAppDataContext();
    
    React.useEffect(() => {
        const unsub = getEntriesRealTime(setEntryData, endOfDay)

        return () => unsub()
    }, [])
    const entriesByCategory = groupEntriesByCategoryId(entries);
   const entiresByCategoryAndDuration = [];
   for(const key in entriesByCategory){
    entiresByCategoryAndDuration.push([key, totalTimeInSeconds(entriesByCategory[key])])
   }

   const displayed = entiresByCategoryAndDuration.map((item) => {
    const category = categories.find((i) => i.categoryId === item[0])
    
    return (
        <>
        {category ?<CategoryChip  category={category}/>: <Chip/>}<div><Typography sx={{ml:1, mr:2}} variant='body2'>{formatTime(item[1])}</Typography></div>
        </>
    )
   })
    return (
        <>
        <Box sx={{display: 'flex', 
            alignItems: 'center',
            mb:1

            }}>

            <Typography
                variant='h6'
                fontWeight={'bold'}
                sx={{mr:2}}
                >Activities today
            </Typography>
            {displayed}
                </Box>
            <Card elevation={0} sx={{ mb: 1 }}>
                {entries.length === 0 && <Typography sx={{ p: 1 }} variant='body2'>No entries yet.</Typography>}
                {entries.map((e) => <EntryNarrow key={e.entryId} hideTimestamp={false} {...e} />)}
            </Card>
   
            </>
    )
}


