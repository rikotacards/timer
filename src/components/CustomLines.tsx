import React from 'react';
import { OpenEntry } from '../firebase/types';
import { getEntryDurations } from '../utils/getEntryDurations';
import { Box, LinearProgress, Typography } from '@mui/material';
interface CustomLinesProps {
    entries: OpenEntry[]
}
export const CustomLines:React.FC<CustomLinesProps> = ({entries}) => {
    const entriesWithDuration = getEntryDurations(entries)
    return (
        <>
        {entriesWithDuration.map((e) => {
            return <Box>
                <Typography>{e.desc}</Typography>
                <LinearProgress color='info' variant='determinate' value={(e.duration)/24*100}/>
                
            </Box>
        })}
        </>
    )
}