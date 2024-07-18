import { Alert, Box, TextField, Typography } from '@mui/material';
import React from 'react';
import { useIsNarrow } from '../utils/isMobile';
import { timeStringToEpochMs } from '../utils/timeStringToEpochMs';
import { updateEntryStartTime } from '../firebase/db';
import { useSnackbarContext } from '../Providers/contextHooks';
interface StartTimeEndTimeProps {
    startTime: number;
    endTime?: number;
    entryId: string
}
export const StartTimeEndTime: React.FC<StartTimeEndTimeProps> = React.memo(({ startTime, endTime, entryId }) => {
    const isNarrow = useIsNarrow();
    const s = useSnackbarContext();
    const onChangeStartTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDraftStartDate(e.target.value)
        
    }
    const timeTextVariant = isNarrow ? 'caption' : 'body2'
    const startDate = new Date(startTime * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
    const [newStartDate, setNewStartDate] = React.useState(startDate)
    const onUpdateStartTime = async () => {
        try {
            const epoch = timeStringToEpochMs(draftStartDate, startTime * 1000);
            if (isNaN(epoch)) {
                throw new Error('Invalid time')
            }
            if (epoch / 1000 !== startTime) {

                await updateEntryStartTime({ startTime: epoch / 1000, entryId })
                s.onSetComponent(<Alert variant='filled' severity='success'>Updated start time</Alert>)
            }

            const readableTime = new Date(epoch).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
            setNewStartDate(readableTime)
            setIsEditStartTime(false);
            s.toggleOpen();
        } catch (e) {
            s.onSetComponent(<Alert severity='error' variant='filled'>Invalid time</Alert>)
            s.toggleOpen();

            setIsEditStartTime(false);
            setDraftStartDate(newStartDate)
        }

    }
    const [draftStartDate, setDraftStartDate] = React.useState(startDate)
    const [isEditStartTime, setIsEditStartTime] = React.useState(false)
    const endDate = endTime && new Date(endTime * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
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
                    onKeyDown={e => {
                        if(e.key === 'Enter'){
                            onUpdateStartTime()
                        }
                    }}

                    value={draftStartDate}
                    onChange={onChangeStartTime}
                    onBlur={onUpdateStartTime} /> : <Typography onClick={() => setIsEditStartTime(!isEditStartTime)} color='GrayText' variant={timeTextVariant}>{newStartDate}</Typography>}
            <Typography color='GrayText' variant={timeTextVariant} sx={{ ml: 1, mr: 1 }}>-</Typography>
            <Typography color='GrayText' variant={timeTextVariant}>{endDate}</Typography>

        </Box>
    )
})