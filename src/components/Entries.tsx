import React from 'react';
import { OpenEntry } from '../firebase/types';
import { Entry } from './Entry';
import { EntryMobile } from './EntryMobile';

import { onSnapshot, collection } from 'firebase/firestore';
import { db, UID } from '../firebase/firebaseConfig';
import { IS_OFFLINE } from '../App';
import { isMobile } from '../utils/isMobile';
const today = new Date()
const later = new Date()
const mockEntries: OpenEntry[] = [
    {
        entryId: '',
        desc: 'Going to tokyo by HK Express',
        created: { nanoseconds: 0, seconds: today.getSeconds() },
        startTime: { nanoseconds: 0, seconds: today.getSeconds() },
        endTime: { nanoseconds: 0, seconds: later.getSeconds() + 100 },
        categories: [{ categoryName: 'Travel', color: 'blue', categoryId: '' }, { categoryName: 'Plane', color: '', categoryId: '' }]
    },
    {
        entryId: '',
        desc: 'Going to airport',
        created: { nanoseconds: 0, seconds: today.getSeconds() },
        startTime: { nanoseconds: 0, seconds: today.getSeconds() },
        endTime: { nanoseconds: 0, seconds: later.getSeconds() + 1000 },
        categories: [{ categoryName: 'Travel', color: '', categoryId: '' }, { categoryName: 'Subway', color: '', categoryId: '' }]
    },
    {
        entryId: '',
        desc: 'Work on mobile layout',
        created: { nanoseconds: 0, seconds: today.getSeconds() },
        startTime: { nanoseconds: 0, seconds: today.getSeconds() },
        endTime: { nanoseconds: 0, seconds: later.getSeconds() + 1000 },
        categories: [{ categoryName: 'Work', color: '', categoryId: '' }, { categoryName: 'Timer', color: '', categoryId: '' }]
    },
    {
        entryId: '',
        desc: 'Work on mobile layout',
        created: { nanoseconds: 0, seconds: today.getSeconds() },
        startTime: { nanoseconds: 0, seconds: today.getSeconds() },
        endTime: { nanoseconds: 0, seconds: later.getSeconds() + 1000 },
        categories: [{ categoryName: 'Work', color: '', categoryId: '' }, { categoryName: 'Timer', color: '', categoryId: '' }]
    },
    {
        entryId: '',
        desc: 'Work on mobile layout',
        created: { nanoseconds: 0, seconds: today.getSeconds() },
        startTime: { nanoseconds: 0, seconds: today.getSeconds() },
        endTime: { nanoseconds: 0, seconds: later.getSeconds() + 1000 },
        categories: [{ categoryName: 'Work', color: '', categoryId: '' }, { categoryName: 'Timer', color: '', categoryId: '' }]
    }, {
        entryId: '',
        desc: 'Work on mobile layout',
        created: { nanoseconds: 0, seconds: today.getSeconds() },
        startTime: { nanoseconds: 0, seconds: today.getSeconds() },
        endTime: { nanoseconds: 0, seconds: later.getSeconds() + 1000 },
        categories: [{ categoryName: 'Work', color: '', categoryId: '' }, { categoryName: 'Timer', color: '', categoryId: '' }]
    }, {
        entryId: '',
        desc: 'Work on mobile layout',
        created: { nanoseconds: 0, seconds: today.getSeconds() },
        startTime: { nanoseconds: 0, seconds: today.getSeconds() },
        endTime: { nanoseconds: 0, seconds: later.getSeconds() + 1000 },
        categories: [{ categoryName: 'Work', color: '', categoryId: '' }, { categoryName: 'Timer', color: '', categoryId: '' }]
    }
]

export const Entries: React.FC = () => {
    const [entries, setEntries] = React.useState([] as OpenEntry[])
    React.useEffect(() => {
        const unsub = onSnapshot(collection(db, "users", UID, "entries"), (doc) => {
            const res: OpenEntry[] = []
            doc.forEach((d) => {
                console.log('d', d.data()); res.push(d.data() as OpenEntry)

            }
            )
            setEntries(IS_OFFLINE ? mockEntries : res)
        }
        )
        return () => unsub();
    }, [])

    return (
        <>
            {entries.map((e) => {
                if(isMobile()){

                    return <EntryMobile {...e} key={e.entryId} />;
                }
                return <Entry {...e} key={e.entryId} />;

            })}
        </>
    )
}