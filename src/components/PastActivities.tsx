import React from 'react';
import { db, UID } from '../firebase/firebaseConfig';
import { collection, DocumentData, getDocs, limit, orderBy, query, QueryDocumentSnapshot, startAfter, where } from 'firebase/firestore';
import { Button, Card, List, Skeleton, Typography } from '@mui/material';
import { EntryNarrow } from './EntryNarrow';
import { groupByDate } from '../utils/groupByDate';
import { Entry } from '../firebase/types';
const LIMIT = 10;
export const PastActivities: React.FC = () => {
    const today = new Date()
    today.setHours(0,0,0,0)
    const [items, setItems] = React.useState<Entry[]>([]);
  const [lastVisible, setLastVisible] = React.useState<QueryDocumentSnapshot<DocumentData, DocumentData> | null >(null);
  const [loading, setLoading] = React.useState(false);
    const onMore = () => {
       fetchItems(lastVisible)
    }
    const fetchItems = async (startAfterDoc: QueryDocumentSnapshot<DocumentData, DocumentData>  | null= null) => {
    setLoading(true);

    const q = startAfterDoc ? 
    query(collection(db, "users", UID, "entries"), orderBy('created', 'desc'), where('created','<=', today), limit(LIMIT), startAfter(startAfterDoc)):
     query(collection(db, "users", UID, "entries"),orderBy('created', 'desc'),where('created','<=', today),  limit(LIMIT));

   

    const snapshot = await getDocs(q)
    const itemsArray: Entry[] = snapshot.docs.map(doc => ({ 
        entryId: doc.id, ...doc.data() } as Entry));

    setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    setItems(prevItems => [...prevItems, ...itemsArray]);
    setLoading(false);
  };

    React.useEffect(() => {
        fetchItems(lastVisible)
    },[])
    const grouped = groupByDate(items);
    const dateKeys = Object.keys(grouped)
    return (
        <div>
         
            {loading ? <Skeleton height={110} variant='rectangular'/> : null}
           <List
             sx={{
                width: '100%',
                bgcolor: 'background.paper',
                position: 'relative',
                overflow: 'auto',
                '& ul': { padding: 0 },
              }}
              subheader={<li />}
           >
            {dateKeys.map((dateKey => {
                return (
                    <li key={dateKey}>
                        <ul>
                            <Card elevation={0} sx={{mb:1}}><Typography variant='h6' fontWeight={'bold'}>{grouped[dateKey].date.toDateString()}</Typography></Card>
                            {grouped[dateKey].entries.map((e) => {
                                return (
                                    <EntryNarrow key={e.entryId} hideTimestamp={false} {...e}/>
                                )
                            })}
                        </ul>
                    </li>
                )
            }))}
            

           </List>
        <Button onClick={onMore}>More</Button>
        </div>
    )
}