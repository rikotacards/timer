import React from 'react';
import { OpenEntry } from '../firebase/types';
import { Entry } from './Entry';
import { EntryMobile } from './EntryMobile';
import BarChartIcon from '@mui/icons-material/BarChart';
import { onSnapshot, collection, orderBy, query } from 'firebase/firestore';
import { db, UID } from '../firebase/firebaseConfig';
import { IS_OFFLINE } from '../App';
import { BarChart } from '@mui/x-charts/BarChart';

import { useIsNarrow } from '../utils/isMobile';
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator, timelineItemClasses } from '@mui/lab';
import { Box, IconButton, Paper, Switch, Typography } from '@mui/material';
import { mockEntries } from '../mocks/mockEntries';
import { groupByDate } from '../utils/groupByDate';
import { totalTimeByCategory } from '../utils/totalTimeByCategoty';
const dateFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short', // '2-digit' ensures two-digit representation of month
    day: '2-digit' // '2-digit' ensures two-digit representation of day
});


export const Entries: React.FC = () => {
    const [entries, setEntries] = React.useState([] as OpenEntry[])
    const isNarrow = useIsNarrow();
    const [isTimeline, setTimeline] = React.useState(false);
    React.useEffect(() => {
        if(!navigator.onLine){
            console.log("not online")
            setEntries(mockEntries)
            return
        }
        const collRef = collection(db, "users", UID, "entries")
        const q = query(collRef, orderBy("created", "desc"));
        const unsub = onSnapshot(q, (doc) => {
            const res: OpenEntry[] = []
            doc.forEach((d) => {
                res.push(d.data() as OpenEntry)

            }
            )
            setEntries(IS_OFFLINE ? mockEntries : res)
        }
        )
        return () => unsub();
    }, [])
    const series = totalTimeByCategory(entries, 'timer') || []
    console.log(entries)
    console.log('ss', series)
    const dateGroups = groupByDate(entries);
    const dateStrings = Object.keys(dateGroups);
    const withTimeline =<Timeline sx={{
        p: 0,

        [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
        },
    }} >
            {
                dateStrings.map((date) => {
                    const dateValue = dateGroups[date].date


                    const displayed = dateFormatter.format(dateValue)
                    return <>
                                <Box sx={{
                                    zIndex: '10',
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: '100%', 
                                    position: 'sticky', top: 54 /* Ensure it's above other content */
                                }}>
                                    <Paper sx={{width: '100%', pb: 1,pt:1, zIndex:1000 }} elevation={0}>

                                        <Typography sx={{ mb: 0 }}>{displayed}</Typography>
                                    </Paper>

                                </Box>
                        <>
                            {
                                dateGroups[date].entries.map((e, i) => {
                                    let startDate;
                                    let endDate

                                    if (e.startTime && e?.endTime) {
                                        startDate = new Date(e.startTime.seconds * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: false })
                                        endDate = new Date(e.endTime.seconds * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: false })
                                    }
                                    if (isNarrow) {

                                        return <TimelineItem key={e?.entryId || 0 + i}>
                                            <TimelineOppositeContent sx={{ pl: 0, flex: 0, display: 'flex', flexDirection: 'column' }}>
                                                <Typography sx={{ textTransform: 'lowercase' }} variant='caption'>{startDate}</Typography>
                                                <Typography sx={{ textTransform: 'lowercase' }} color='GrayText' variant='caption'>{endDate}</Typography>

                                            </TimelineOppositeContent>
                                            <TimelineSeparator>
                                                <TimelineDot>
                                                </TimelineDot>
                                                <TimelineConnector>
                                                </TimelineConnector>
                                            </TimelineSeparator>

                                            <TimelineContent sx={{ p: 0 }}><EntryMobile hideTimestamp={isTimeline} {...e} key={e?.entryId || 0 + i} /></TimelineContent></TimelineItem>;
                                    }
                                    return <Entry {...e} key={e.entryId} />;
                                })
                            }
                        </>
                        </>
                })
            }
    </Timeline>
    
    return (
        <>
        <Box sx={{display: 'flex'}}>

            <Switch checked={isTimeline} onChange={() => setTimeline(!isTimeline)} />
            <div>
            <IconButton><BarChartIcon/></IconButton>
            </div>
            
        </Box>
            {series.length && <BarChart height={300}  series={[{dataKey: 'totalTime'}]} dataset={series} xAxis={[{dataKey: 'date', scaleType: 'band'}]}/>}
            {isTimeline && withTimeline}
            {!isTimeline && entries.map((e, i) => {
                if (isNarrow) {
                    return <EntryMobile hideTimestamp={isTimeline} {...e} key={e?.entryId || 0 + i} />
                }
                return <Entry {...e} key={e.entryId} />;

            })}
        </>
    )
}