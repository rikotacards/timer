import React from 'react';
import { OpenEntry } from '../firebase/types';
import { Entry } from './Entry';
import { onSnapshot, collection } from 'firebase/firestore';
import { db, UID } from '../firebase/firebaseConfig';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
export const Entries: React.FC = () => {
    const [entries, setEntries] = React.useState([] as OpenEntry[])
    React.useEffect(() => {
        const unsub = onSnapshot(collection(db, "users", UID, "entries"), (doc) => {
            const res: OpenEntry[] = []
            doc.forEach((d) => {
                console.log('d', d.data()); res.push(d.data() as OpenEntry)

            }
            )
            setEntries(res)
        }
        )
        return () => unsub();
    }, [])

    return (
        <>
            {entries.map((e) => <Entry {...e} key={e.entryId} />)}
        </>
    )
}