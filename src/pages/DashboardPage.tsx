import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import { getEntriesByDateRange } from '../firebase/db';
import { StackedBarChart } from '../components/StackedBarChart';
import { Entry } from '../firebase/types';
import { TopAppBar } from '../components/TopAppBar';
import { useTopAppBarContext } from '../Providers/contextHooks';
import { getTimeWindow } from '../utils/getTimeWindow';

// created is in seconds, timestamp
// need to create humand readable dates as keys
const injectDate = (data: Entry[]) => {
    const withDate = data.map((d) => {
        const date = new Date(d.created.seconds * 1000)
        return {
            ...d,
            readableDate: date.toLocaleDateString()
        }
    })
    return withDate
}
interface EntryWithReadableDate extends Entry {
    readableDate: string
}
const groupByDate = (data: EntryWithReadableDate[]) => {
    const dateGroups: { [key: string]: Entry[] } = {};
    data.forEach((d) => dateGroups[d.readableDate] = []);
    data.forEach((d) => dateGroups[d.readableDate].push(d))
    const res = [];
    for (const dateKey in dateGroups) {
        res.push({ date: dateKey, entries: dateGroups[dateKey] })
    }
    console.log(res)
    return res
}

const flattenEntriesByCategores = (entires: Entry[]) => {
    const categories: { [key: string]: Entry[] } = {}
    const categoriesWithDuration = {}
    entires.forEach((e) => {
        const categoryId = e.categoryIds?.[0] || '0'
        if (categories[categoryId]) {
            categories[categoryId].push(e)
        } else {
            categories[categoryId] = [e];
        }
    })

    for (const categoryKey in categories) {
        if (categoryKey == "lKW4KLaLnUH0wMolMZ70") {
            console.log("WEGOTIT", categories[categoryKey])
        }
        let sum = 0;
        categories[categoryKey].forEach(e => {
            const duration = (e.endTime.seconds - e.startTime.seconds) / 60 / 60;
            sum = sum + duration;
        })
        categoriesWithDuration[categoryKey] = sum
    }
    console.log('FLAT', categoriesWithDuration)
    return categoriesWithDuration

}



export const DashboardPage: React.FC = () => {
    const now = new Date();
    const weekago = new Date()
    const [isFetching, setIsFetching] = React.useState(true);
    weekago.setDate(weekago.getDate() -7)
    console.log(weekago.toLocaleDateString())
    const [data, setData] = React.useState([])
    const { onSetComponent } = useTopAppBarContext();
    const [timeFrame, setTimeFrame] = React.useState('w')
    const onClick = (window: string)=> {
        setTimeFrame(window)
    }
    const windowString = getTimeWindow(timeFrame)
    React.useEffect(() => {
        onSetComponent(<TopAppBar title='Dashboard' enableBack />)
        setIsFetching(true);
        getEntriesByDateRange({ start: windowString.from, end: now }).then((res) => {
            console.log('res', res)
            const dataWithDate = injectDate(res)
            const grouped = groupByDate(dataWithDate)
            console.log('g', grouped)
            const withDuration = grouped.map((e) => ({ date: e.date, ...flattenEntriesByCategores(e.entries) }))
            console.log('more data', withDuration)
            setData(withDuration)
            setIsFetching(false)
        }).catch((e) => {
            alert(e);
            setIsFetching(false)
        })
    }, [timeFrame])
    const categoryIds = {};
    data.forEach((d) => {
        for (const key in d) {
            if (key !== 'date') {
                categoryIds[key] = true;
            }
        }
    })
    const list = Object.keys(categoryIds)
    console.log('list', list)
    return (
        <Box>
            <Box sx={{display: 'flex'}}>

            <Button variant={timeFrame === 'd' ? 'contained': 'outlined'} onClick={() => onClick('d')}>Day</Button>
            <Button variant={timeFrame === 'w' ? 'contained' : 'outlined'} onClick={() => onClick('w')}>week</Button>
            <Button variant={timeFrame === 'm' ? 'contained': 'outlined'}  onClick={() => onClick('m')}>Month</Button>
            <Button variant={timeFrame === '6m' ? 'contained': 'outlined'}  onClick={() => onClick('6m')}>6 Months</Button>

            </Box>
            {isFetching ? <CircularProgress /> : <StackedBarChart categoryIds={list} data={data} />
            }
        </Box>
    )
}