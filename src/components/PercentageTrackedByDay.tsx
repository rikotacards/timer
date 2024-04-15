import React from 'react';
import { Entry } from '../firebase/types';
import { totalTimeInSeconds } from '../utils/totalTime';
import { Box, CircularProgress, Typography } from '@mui/material';
interface PercentageTrackedByDayProps {
    entries: Entry[]
}
export const PercentageTrackedByDay: React.FC<PercentageTrackedByDayProps> = ({entries}) => {
    const secondsIn24Hours = 24 * 60 * 60;
    const totalTrackedSeconds = totalTimeInSeconds(entries)
    const percentage = (totalTrackedSeconds/secondsIn24Hours)*100;
    console.log(percentage)
    return (
        <Box>
            <CircularProgress variant='determinate' value={percentage}/>
            <Typography>{percentage}</Typography>
        </Box>
    )
}