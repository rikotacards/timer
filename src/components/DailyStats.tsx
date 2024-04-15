import { Box, Typography } from '@mui/material'
import React from 'react'
import { Entry } from '../firebase/types';
import { PercentageTrackedByDay } from './PercentageTrackedByDay';
interface DailyStatsProps {
    entries: Entry[]
}
export const DailyStats: React.FC<DailyStatsProps> = ({entries}) => {
    const entriesCount = entries.length;
    return <Box sx={{pl:1}}>
        <Typography variant='caption'>{entriesCount} entries</Typography>
        <PercentageTrackedByDay entries={entries}/>

    </Box>
}