import { Box, Card, Chip, IconButton, LinearProgress, Stack, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Entry as EntryType } from '../firebase/types';
import { useAppDataContext, useTopAppBarContext } from '../Providers/contextHooks';
import { groupEntriesByCategoryId } from '../utils/groupEntriesByCategoryId';
import { totalTimeInSeconds } from '../utils/totalTime';
import { formatTime } from '../utils/formatTime';
import { getEntriesByDateRange } from '../firebase/db';
import { round } from '../utils/round';
import { PieChart } from '@mui/x-charts/PieChart';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import EqualizerRoundedIcon from '@mui/icons-material/EqualizerRounded';// see categories
// see total time logged
// see number of entries
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { TopAppBar } from './TopAppBar';

import { useNavigate } from 'react-router';
import { AddEntryWide } from './AddEntryWide';
import { useIsNarrow } from '../utils/isMobile';
import { ActivitiesToday } from './ActivitiesToday';
import { PastActivities } from './PastActivities';
// import { IOSSlider } from './PercentSlider';
// import { Timeline } from './Timeline';
// import {SingleTimeline} from './SingleTimeline';
interface TodaySummaryProps {
    entriesPassedIn?: EntryType[];
}
const today = new Date();
const endOfDay = new Date(today)
endOfDay.setHours(0, 0, 0, 0)
const ELEVATION = 2;
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

const DISABLE_CHART = true;
// Considered doing a version where you just pass in the dates
// here we assume we pass in a group of dates belonging to the same day
export const TodaySummary: React.FC<TodaySummaryProps> = () => {
    const { categories } = useAppDataContext();
    const [fetching, setFetching] = React.useState(true);
    const { onSetComponent } = useTopAppBarContext();
    const isNarrow = useIsNarrow();

    const nav = useNavigate();
    const goToDashboards = React.useCallback(() => {
        nav('/dashboard')
    }, [nav])
    const [entries, setEntries] = React.useState<EntryType[]>([])

    React.useEffect(() => {
        onSetComponent(<TopAppBar />)

        getEntriesByDateRange({ start: endOfDay, end: today }).then((e) => {
            setEntries(e as EntryType[])
            setFetching(false);
        }).catch((e) => console.log('error', e))
    }, [onSetComponent])

    const totalTimeByCategory: { [key: string]: number } = {};
    const entriesByCategoryId = groupEntriesByCategoryId(entries)
    const totalEntries = entries.length;
    const totalTime = totalTimeInSeconds(entries)
    const formattedTotalTime = formatTime(totalTime);
    const percentOfDayLogged = round((totalTime / (24 * 60 * 60)) * 100)
    const categoryIds = Object.keys(entriesByCategoryId)

    // Inline style for the color scale

    for (const key in entriesByCategoryId) {

        totalTimeByCategory[key] = totalTimeInSeconds(entriesByCategoryId[key])
    }
    const pieCharData = categoryIds.map((id) => {
        const c = categories.find((x) => x.categoryId === id)
        const time = totalTimeByCategory[id]
        return ({ label: c?.categoryName, color: c?.color || 'grey', value: round(time / (24 * 60 * 60) * 100) })
    })

    if (fetching) {
        return <LinearProgress sx={{mt:-1}} />
    }
    return (
        <Box sx={{ m: 1 }}>
            {!isNarrow && <AddEntryWide />}

            <Typography variant='body2' fontWeight={600} color='GrayText'>{today.toDateString()}</Typography>
            <Box sx={{display: 'flex', alignItems: 'center'}}>

            <Typography sx={{ mb: 1 }} variant='h4' fontWeight={'bold'}>
                {'Summary'}
            </Typography>
            <IconButton onClick={goToDashboards} sx={{mb:1}}><EqualizerRoundedIcon/></IconButton>
            </Box>
            <Card elevation={ELEVATION} sx={{ borderRadius: 3, p: 2, mb: 2, display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', textAlign: 'left', width: '100%' }}>
                    <div>
                        <Typography fontWeight={'bold'} sx={{ mr: 0.5 }}>{percentOfDayLogged}%</Typography>
                    </div>
                    <Typography variant='body1' fontWeight={'bold'} sx={{ pb: 2, fontWeight: 500 }}> of day logged</Typography>
                </Box>
                <LinearProgress sx={{ mb: 1, borderRadius: 1 }} variant='determinate' value={percentOfDayLogged} />
                <Box sx={{ display: 'flex', alignItems: 'center' }}>

                    <Typography variant='caption' fontWeight={'bold'} sx={{ mr: 0.5 }}>
                        {formattedTotalTime}
                    </Typography>
                    <Typography variant='caption' color='GrayText'> of 24 hours logged</Typography>
                </Box>
                <Typography variant='caption' color='GrayText'>Entries: {totalEntries}</Typography>



            </Card>
            {DISABLE_CHART ? null : <><Box sx={{ mb: 1, display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                <Typography variant='h6' fontWeight={'bold'}>By Category</Typography>
                <IconButton onClick={() => nav('stats')}>
                    <ChevronRightIcon />
                </IconButton>
            </Box>

            <Card elevation={ELEVATION} sx={{ borderRadius: 3, p: 2, mb: 1 }}>
                <Box sx={{ mb: 1 }}>
                </Box>
                <Stack textAlign={'center'} direction='row'>

                    <Box flexGrow={1} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>


                        <PieChart
                            slotProps={{ legend: { hidden: true, } }}
                            height={200}
                            margin={{ right: 5 }}
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
                </Stack>

                {
                    categoryIds.map((id) => {
                        const c = categories.find((x) => x.categoryId === id)
                        const time = formatTime(totalTimeByCategory[id])
                        return (<Box key={id}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 1 }}>
                                <Chip
                                    onClick={() => nav(`/stats/${c?.categoryName}`, { state: { categoryId: c?.categoryId } })}
                                    sx={{
                                        border: '1px solid transparent',
                                        borderColor: c?.color,
                                        color: c?.color,
                                        fontWeight: 600,
                                        background: c?.color + "34", mr: 1
                                    }} label={c?.categoryName || 'NA'} />
                                <Typography variant='body1' sx={{ mr: 1 }}>{time}</Typography>
                                <Typography sx={{ ml: 'auto' }} color='GrayText'>{round(((totalTimeByCategory[id] / (24 * 60 * 60)) * 100))}%</Typography>
                            </Box>
                            {/* <IOSSlider min={0} max={24} defaultValue={[11.4,12]} track={'normal'}/> */}
                        </Box>)
                    })
                }

            </Card></>}
            <ActivitiesToday/>
            <PastActivities/>
            <Toolbar />
            <Toolbar />
        </Box>
    )
}