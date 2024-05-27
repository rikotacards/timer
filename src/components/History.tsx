import React from 'react';
import { Entry } from '../firebase/types';
import { getEntriesByDateRange } from '../firebase/db';
import { useTopAppBarContext } from '../Providers/contextHooks';
import { TopAppBar } from './TopAppBar';
import { EntryNarrow } from './EntryNarrow';
import { year } from './StatsByCategory';
import { LinearProgress } from '@mui/material';


export const History: React.FC = () => {
    const [entries, setEntries] = React.useState<Entry[]>([])
    const [isFetching, setFetching] = React.useState(false)
    const { onSetComponent } = useTopAppBarContext();
    const today = new Date();
    React.useEffect(() => {
        setFetching(true)
        onSetComponent(<TopAppBar enableBack />)

        getEntriesByDateRange({ start: today, end: year }).then((e) => {
            
            setEntries(e.reverse() as any[])
            setFetching(false);
        }).catch((e) => console.log('error', e))
    }, [])
    return (
        <>
        {isFetching && <LinearProgress/>}
       

    
        {entries.map((e) => <EntryNarrow key={e.entryId} hideTimestamp={false} {...e}/>)}
        </>
    )
}