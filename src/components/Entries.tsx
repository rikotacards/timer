import React from 'react';
import { EntryNarrow } from './EntryNarrow';
import { onSnapshot, collection, orderBy, query } from 'firebase/firestore';
import { db, UID } from '../firebase/firebaseConfig';
import { IS_OFFLINE } from '../App';

import { useIsNarrow } from '../utils/isMobile';
import { Box,  Chip,  Paper, Typography } from '@mui/material';
import { mockEntries } from '../mocks/mockEntries';
import { groupByDate } from '../utils/groupByDate';
import { useAppDataContext, useTopAppBarContext } from '../Providers/contextHooks';
import { TopAppBar } from './TopAppBar';
import { getEntriesByDateRange } from '../firebase/db';
import { totalTimeInSeconds } from '../utils/totalTime';
import { Entry as EntryType } from '../firebase/types';
import { Entry } from './Entry';
import { formatTime } from '../utils/formatTime';
import { TodaySummary } from './TodaySummary';
export const dateFormatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short', // '2-digit' ensures two-digit representation of month
    day: '2-digit' // '2-digit' ensures two-digit representation of day
});


export const Entries: React.FC = () => {

    const [entries, setEntries] = React.useState<EntryType[]>([] as EntryType[])
    const { onSetComponent } = useTopAppBarContext();
    const { disableBackButton } = useAppDataContext();
    const isNarrow = useIsNarrow();
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 1)
    React.useEffect(() => {
        getEntriesByDateRange({ start: today, end: sevenDaysAgo })
        onSetComponent(<TopAppBar />)
        console.log('setting top')
        if (!navigator.onLine) {
            console.log("not online")
            setEntries(mockEntries)
            return
        }
        const collRef = collection(db, "users", UID, "entries")
        const q = query(collRef, orderBy("created", "desc"));
        const unsub = onSnapshot(q, (doc) => {
            const res: EntryType[] = []
            doc.forEach((d) => {
                res.push(d.data() as EntryType)

            }
            )
            setEntries(IS_OFFLINE ? mockEntries : res)
        }
        )
        return () => unsub();
    }, [disableBackButton, onSetComponent])
    const dateGroups = groupByDate(entries);
    const dateStrings = Object.keys(dateGroups);

    return (

        <div>
            <TodaySummary/>
            {
                dateStrings.map((date) => {
                    const dateValue = dateGroups[date].date
                    const count = dateGroups[date].entries.length
                    const totalTime = totalTimeInSeconds(dateGroups[date].entries)
                    const categories: {[key: string]: EntryType[]} = {}
                    dateGroups[date].entries.forEach((e) => {
                        if(e.categories?.[0]){
                            const categoryName = e.categories[0].categoryName
                            if(categories[categoryName]){
                                categories[categoryName].push(e)
                            } else {
                                categories[categoryName] = [e];
                            }
                        }
                    })
                    const categoryList = Object.keys(categories)
                    const secondsInADay = 60 * 60 * 24;
                    const percentage = (totalTime/secondsInADay) * 100
                    const rounded = Math.round(percentage*10)/10
                    const formatted = formatTime(totalTime);
                    const displayed = dateFormatter.format(dateValue)
                    return <Box key={date}>
                        <Box sx={{
                            zIndex:'10',
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            justifyContent: 'flex-start',
                            flexDirection: 'row',
                            position: 'sticky', 
                            top: 54 /* Ensure it's above other content */
                        }}>
                            
                            <Paper sx={{ width: '100%', p: 1, zIndex: 1000, alignItems: 'center', flexDirection: 'column' }} elevation={0}>
                                <Box sx={{display: 'flex', alignItems: 'center'}}>

                                <Typography  fontWeight={'bold'} variant='h6' sx={{ mb: 0 }}>{displayed}</Typography>
                                <Typography sx={{ ml: 1 }} variant='caption'>{count} entries</Typography>
                                <Typography sx={{m:1}} variant='caption'>Total:</Typography>
                                <Typography sx={{m:0}} variant='caption'>{formatted}</Typography>
                                <Typography sx={{m:1}} variant='caption'>{rounded}%</Typography>
                                </Box>
                                <Box sx={{display: 'flex',                            overflowX: 'scroll',
}}>
                                    {categoryList.map((key) => {
                                        const totalTime = totalTimeInSeconds(categories[key])
                                        const format = formatTime(totalTime);
                                        return (
                                            <Box sx={{display: 'flex', alignItems: 'center'}}>
                                                <Chip size='small' label={key}/>
                                                <Typography variant='caption' sx={{m:1}}>{format}</Typography>
                                            </Box>
                                        )
                                    })}
                                </Box>
                            </Paper>

                        </Box>
                        <>
                            {
                                dateGroups[date].entries.map((e, i) => {
                                    if (isNarrow) {
                                        return <EntryNarrow key={e.entryId || 0 + i} hideTimestamp={false} {...e} />
                                    } else {
                                        return <Entry key={e.entryId || 0 + i}  {...e} />
                                    }
                                })
                            }
                        </>
                    </Box>
                })
            }
        </div>
    )
}