import { Alert, Box, TextField, Typography } from '@mui/material';
import React from 'react';
import { useIsNarrow } from '../utils/isMobile';
import { timeStringToEpochMs } from '../utils/timeStringToEpochMs';
import { updateEntryEndTime, updateEntryStartTime } from '../firebase/db';
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
    const onChangeEndTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDraftEndDate(e.target.value)
        
    }

    const timeTextVariant = isNarrow ? 'caption' : 'body2'
    const startDate = new Date(startTime * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
    const [newStartDate, setNewStartDate] = React.useState(startDate)
    const endDate = endTime && new Date(endTime * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })

    const [newEndDate, setNewEndDate] = React.useState(endDate)
    const onUpdateEntryTime = async (isStart ?: boolean) => {
        const draftDate = isStart ? draftStartDate : draftEndDate
        const time = isStart ? startTime : endTime
        try {
            const epoch = timeStringToEpochMs(draftDate || '', (time || 1) * 1000);
            if (isNaN(epoch)) {
                throw new Error('Invalid time')
            }
            if (epoch / 1000 !== (isStart ? startTime : endTime)) {

                await isStart ? updateEntryStartTime({ startTime: epoch / 1000, entryId }) : updateEntryEndTime({endTime: epoch/1000, entryId})
                s.onSetComponent(<Alert variant='filled' severity='success'>Updated {isStart ? 'start': 'end'} time</Alert>)
            }

            const readableTime = new Date(epoch).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
            isStart ? setNewStartDate(readableTime) : setNewEndDate(readableTime)
            isStart ? setIsEditStartTime(false) : setIsEditEndTime(false)
            s.toggleOpen();
        } catch (e) {
            s.onSetComponent(<Alert severity='error' variant='filled'>Invalid time</Alert>)
            s.toggleOpen();

            isStart ? setIsEditStartTime(false) : setIsEditEndTime(false)
            isStart ? setDraftStartDate(newStartDate) : setDraftEndDate(newEndDate)
        }

    }
    const [draftEndDate, setDraftEndDate] = React.useState(endDate)
    const [isEditEndTime, setIsEditEndTime] = React.useState(false)

    const [draftStartDate, setDraftStartDate] = React.useState(startDate)
    const [isEditStartTime, setIsEditStartTime] = React.useState(false)
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
                            onUpdateEntryTime(true)
                        }
                    }}

                    value={draftStartDate}
                    onChange={onChangeStartTime}
                    onBlur={() => onUpdateEntryTime(true)} /> : <Typography onClick={() => setIsEditStartTime(!isEditStartTime)} color='GrayText' variant={timeTextVariant}>{newStartDate}</Typography>}
            <Typography color='GrayText' variant={timeTextVariant} sx={{ ml: 1, mr: 1 }}>-</Typography>
          {isEditEndTime ? <TextField
                    autoFocus
                    inputProps={{
                        style: {
                            padding: 0,
                        }
                    }}
                    onKeyDown={e => {
                        if(e.key === 'Enter'){
                            onUpdateEntryTime(false)
                        }
                    }}

                    value={draftEndDate}
                    onChange={onChangeEndTime}
                    onBlur={() => onUpdateEntryTime(false)} /> : <Typography onClick={() => setIsEditEndTime(!isEditEndTime)} 
                    color='GrayText' variant={timeTextVariant}>{newEndDate}</Typography>}

        </Box>
    )
})