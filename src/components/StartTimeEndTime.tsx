import { Box, TextField, Typography } from '@mui/material';
import React from 'react';
import { useIsNarrow } from '../utils/isMobile';
import { FirebaseTimeStamp } from '../firebase/types';
import { timeStringToEpochMs } from '../utils/timeStringToEpochMs';
interface StartTimeEndTimeProps {
    startTime: FirebaseTimeStamp; 
    endTime?: FirebaseTimeStamp;
    entryId: string
}
export const StartTimeEndTime: React.FC<StartTimeEndTimeProps> = ({startTime, endTime, entryId}) => {
    const isNarrow = useIsNarrow();
    const onUpdateStartTime = () => {
        const epoch = timeStringToEpochMs(newStartDate);
        const readableTime = new Date(epoch).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
        console.log('ONBLUR', readableTime)
        setNewStartDate(readableTime)
        setIsEditStartTime(false);
    }
    const onChangeStartTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    
        setNewStartDate(e.target.value)
        
    }
    const timeTextVariant = isNarrow ? 'caption' : 'body2'
    const startDate = new Date(startTime.seconds * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
    const [newStartDate, setNewStartDate] = React.useState(startDate)
    const [isEditStartTime, setIsEditStartTime] = React.useState(false)
    const endDate = endTime && new Date(endTime.seconds * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>

            {isEditStartTime ? 
            <TextField
            autoFocus
            inputProps={{
                style: {
                    padding: 0,
                }
            }}
            value={newStartDate}
            onChange={onChangeStartTime}
            onBlur={onUpdateStartTime}/> : <Typography onClick={() => setIsEditStartTime(!isEditStartTime)} color='GrayText' variant={timeTextVariant}>{newStartDate}</Typography>}
            <Typography color='GrayText' variant={timeTextVariant} sx={{ ml: 1, mr: 1 }}>-</Typography>
            <Typography color='GrayText' variant={timeTextVariant}>{endDate}</Typography>

        </Box>
    )
}