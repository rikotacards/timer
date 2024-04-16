import React from 'react';
import { EntryNarrow } from './EntryNarrow';
import { onSnapshot, collection, orderBy, query } from 'firebase/firestore';
import { db, UID } from '../firebase/firebaseConfig';
import { IS_OFFLINE } from '../App';

import { useIsNarrow } from '../utils/isMobile';
import { Box, Paper, Typography } from '@mui/material';
import { mockEntries } from '../mocks/mockEntries';
import { groupByDate } from '../utils/groupByDate';
import { useAppDataContext, useTopAppBarContext } from '../Providers/contextHooks';
import { TopAppBar } from './TopAppBar';
import { getEntriesByDateRange } from '../firebase/db';
import { totalTimeInSeconds } from '../utils/totalTime';
import { Entry as EntryType } from '../firebase/types';
import { Entry } from './Entry';
import { formatTime } from '../utils/formatTime';
const dateFormatter = new Intl.DateTimeFormat('en-US', {
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

            {
                dateStrings.map((date) => {
                    const dateValue = dateGroups[date].date
                    const count = dateGroups[date].entries.length
                    const totalTime = totalTimeInSeconds(dateGroups[date].entries)
                    const formatted = formatTime(totalTime);
                    const displayed = dateFormatter.format(dateValue)
                    return <Box key={date}>
                        <Box sx={{
                            zIndex: '10',
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            justifyContent: 'flex-start',
                            flexDirection: 'row',
                            position: 'sticky', top: 54 /* Ensure it's above other content */
                        }}>
                            
                            <Paper sx={{ width: '100%', p: 1, zIndex: 1000, alignItems: 'center' }} elevation={0}>
                                <Typography color='GrayText' fontWeight={'bold'} variant='caption' sx={{ mb: 0 }}>{displayed}</Typography>
                                <Typography sx={{ ml: 1 }} variant='caption'>{count} entries</Typography>
                                <Typography sx={{m:1}} variant='caption'>Total time logged:</Typography>

                                <Typography sx={{m:0}} variant='caption'>{formatted}</Typography>
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