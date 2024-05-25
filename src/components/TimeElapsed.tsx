import { Typography } from '@mui/material';
import React from 'react';
import { useGetTimeElapsed } from '../utils/useGetTimeElapsed';
import { formatTime } from '../utils/formatTime';
interface TimeElapsedProps {
    startTimeSeconds: number
}
export const TimeElapsed: React.FC<TimeElapsedProps> = ({ startTimeSeconds }) => {
    const { totalSeconds } = useGetTimeElapsed(startTimeSeconds)
    const formatted = formatTime(totalSeconds)

    return <Typography sx={{ fontWeight: 'bold' }}>{formatted}</Typography>

}