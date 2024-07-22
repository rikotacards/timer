import { Typography } from '@mui/material';
import React from 'react';
import { useGetTimeElapsed } from '../utils/useGetTimeElapsed';
import { formatTime } from '../utils/formatTime';
interface TimeElapsedProps {
    startTimeSeconds: number
}
export const TimeElapsed: React.FC<TimeElapsedProps> = ({ startTimeSeconds }) => {
    console.log('TIME', startTimeSeconds)
    const { totalSeconds } = useGetTimeElapsed(startTimeSeconds)
    console.log('TOTAL SECONDS"', totalSeconds)
    const formatted = formatTime(totalSeconds)
    console.log('formatted', formatted)
    return <Typography sx={{ fontWeight: 'bold' }}>{formatted}</Typography>

}