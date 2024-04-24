import { Box, Card, Chip, LinearProgress, Typography } from '@mui/material';
import React from 'react';
import { Entry as EntryType } from '../firebase/types';
import { useAppDataContext, useTopAppBarContext } from '../Providers/contextHooks';
import { groupEntriesByCategoryId } from '../utils/groupEntriesByCategoryId';
import { totalTimeInSeconds } from '../utils/totalTime';
import { formatTime } from '../utils/formatTime';
import { getEntriesByDateRange } from '../firebase/db';
import { round } from '../utils/round';
import { PieChart } from '@mui/x-charts/PieChart';


// see categories
// see total time logged
// see number of entries
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { TopAppBar } from './TopAppBar';

import { EntryNarrow } from './EntryNarrow';
interface TodaySummaryProps {
    entriesPassedIn?: EntryType[];
}
const today = new Date();
const endOfDay = new Date(today)
endOfDay.setHours(0, 0, 0, 0)
const StyledText = styled('text')(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fontSize: 15,
}));

function PieCenterLabel({ children }: { children: React.ReactNode }) {
    const { width, height, left, top } = useDrawingArea();
    return (
        <StyledText x={left + width / 2} y={top + height / 2}>
            {children}
        </StyledText>
    );
}

// Considered doing a version where you just pass in the dates
// here we assume we pass in a group of dates belonging to the same day
export const TodaySummary: React.FC<TodaySummaryProps> = () => {
    const { categories } = useAppDataContext();
    const [fetching, setFetching] = React.useState(true);
    const { onSetComponent } = useTopAppBarContext();

    const [entries, setEntries] = React.useState<EntryType[]>([])

    React.useEffect(() => {
        console.log('GETTING');
        onSetComponent(<TopAppBar />)

        getEntriesByDateRange({ start: today, end: endOfDay }).then((e) => {
            setEntries(e as EntryType[])
            console.log("GOT", e)
            setFetching(false);
        }).catch((e) => console.log('error', e))
    }, [])

    const totalTimeByCategory: { [key: string]: number } = {};
    const entriesByCategoryId = groupEntriesByCategoryId(entries)
    const totalEntries = entries.length;
    const totalTime = totalTimeInSeconds(entries)
    const formattedTotalTime = formatTime(totalTime);
    const percentOfDayLogged = round((totalTime / (24 * 60 * 60)) * 100)
    const categoryIds = Object.keys(entriesByCategoryId)

    for (const key in entriesByCategoryId) {

        totalTimeByCategory[key] = totalTimeInSeconds(entriesByCategoryId[key])
    }
    const pieCharData = categoryIds.map((id) => {
        const c = categories.find((x) => x.categoryId === id)
        const time = totalTimeByCategory[id]
        return ({ label: c?.categoryName, color: c?.color || 'green', value: round(time / (24 * 60 * 60) * 100) })
    })

    if (fetching) {
        return <LinearProgress />
    }
    return (
        <Box>
            <Typography variant='body2' color='GrayText'>{today.toDateString()}</Typography>
            <Typography variant='h6' fontWeight={'bold'}>
                {'Summary'}
            </Typography>

            <Card elevation={5} sx={{ p: 1, m: 0, mb:2 }}>
                <Typography variant='body1'>You have logged {percentOfDayLogged}% of your day.</Typography>
                <Typography variant='body1'>Time logged: {formattedTotalTime}</Typography>
                <Typography variant='body1'>Total entries: {totalEntries}</Typography>

                <Box sx={{ display: 'flex', flexGrow: 1 }}>
                  
                        
                    <PieChart
                        slotProps={{ legend: { hidden: true } }}
                        height={200}
                        series={[
                            {
                                data:
                                    [...pieCharData,
                                    { label: 'Unlogged', value: 100 - percentOfDayLogged, color: 'black' }

                                    ],
                                innerRadius: 60,
                                paddingAngle: 0

                            }
                        ]}

                    >
                        <PieCenterLabel>{percentOfDayLogged}% logged</PieCenterLabel>

                    </PieChart>


                </Box>
              

            </Card>
            <Typography fontWeight={'bold'}>By Category</Typography>
            <Card elevation={10} sx={{mt:1, p:2, mb:1}}>
                {
                    categoryIds.map((id) => {
                        const c = categories.find((x) => x.categoryId === id)
                        const time = formatTime(totalTimeByCategory[id])
                        return (<Box>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 1 }}>
                                <Chip sx={{mr:1, backgroundColor: c?.color }} label={c?.categoryName || 'NA'} />
                                <Typography>{round(((totalTimeByCategory[id] / (24 * 60 * 60)) * 100))}%</Typography>
                                <Typography sx={{ ml: 'auto' }}>{time}</Typography>
                            </Box>
                        </Box>)
                    })
                }

            </Card>
            <Typography fontWeight={'bold'}>Acivities today</Typography>

         
            {entries.map((e) => <EntryNarrow hideTimestamp={false} {...e} />)}

        </Box>
    )
}