import React from 'react';
import { OpenEntry } from '../firebase/types';
import { getEntryDurations } from '../utils/getEntryDurations';
import { Box, LinearProgress, Typography } from '@mui/material';
import { formatTime } from '../utils/formatTime';
interface CustomLinesProps {
    entries: OpenEntry[]
}
export const CustomLines:React.FC<CustomLinesProps> = ({entries}) => {
    const entriesWithDuration = getEntryDurations(entries)
    const maxDuration = Math.max(...entriesWithDuration.map((e) => e.duration))
    return (
        <>
        {entriesWithDuration.map((e) => {
            if(!e?.endTime){
                return
            }
            const formatted = formatTime(e?.endTime?.seconds -e.startTime.seconds)
            return <Box key={e.entryId || 0} sx={{mb:2}}>
                <Box sx={{display: 'flex', flexDirection: 'row'}}>

                <Typography variant='body2'>{e.desc}</Typography>
                <Box sx={{ml:'auto'}}>

                <Typography variant='body2'>{formatted}</Typography>
                </Box>

                </Box>
                <LinearProgress sx={{height:'15px', backgroundColor: 'transparent'}} color='info' variant='determinate' value={((e.duration)/maxDuration)*100}/>
                
            </Box>
        })}
        </>
    )
}