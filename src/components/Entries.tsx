import React from 'react';
import { OpenEntry } from '../firebase/types';
import { Entry } from './Entry';
import { onSnapshot, collection } from 'firebase/firestore';
import { db, UID } from '../firebase/firebaseConfig';

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