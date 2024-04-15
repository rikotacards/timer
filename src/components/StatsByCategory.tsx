import { Box, Button, Chip, CircularProgress, Slide, TextField, Typography } from "@mui/material"
import { useAppDataContext, useTopAppBarContext } from "../Providers/contextHooks"
import { totalTimeByCategory } from "../utils/totalTimeByCategoty";
import { IS_OFFLINE } from "../App";

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useParams } from "react-router";

import { CustomLines } from "./CustomLines";
import { CategoryTopAppBar } from "./CategoryTopAppBar";
import { getEntriesByDateRange } from "../firebase/db";
import { Entry } from "../firebase/types";
const today = new Date();
today.setHours(23,59,59,99)
const endOfDay = new Date(today)
endOfDay.setHours(0,0,0,0)
console.log(today, endOfDay)
const week = new Date(today)
week.setDate(today.getDate() - 7)
const month = new Date(today)
month.setDate(today.getDate() - 31)
const sixMonth = new Date(today)
sixMonth.setDate(today.getDate() - 180)
const year = new Date(today)
year.setDate(today.getDate() - 365);

    type RangeType = 'D' | 'W' | 'M' | '6M' | 'Y'

const ranges:{label: RangeType}[] = [{
    label: 'D',
},
{ label: 'W' },
{ label: 'M' },
{ label: '6M' },
{ label: 'Y' }
]
const rangeMap = {
    'D': endOfDay,
    'W': week,
    'M': month,
    '6M': sixMonth,
    'Y': year
}

export const StatsByCategory: React.FC = () => {
    const [range, setRange] = React.useState<RangeType>("D")
    const onRangeSelect = (range: RangeType) => {
        setFetching(true)
        setRange(range)
    }
    const [fetching, setFetching] = React.useState(true);
    const {  categories } = useAppDataContext();
    const params = useParams();
    const [entries, setEntries] = React.useState<Entry[]>([] as Entry[])
    const [inputText, setInputText] = React.useState('')
    const [selectedCategory, setSelectedCategory] = React.useState<string>(params?.categoryName || categories[0]?.categoryName || '')
    const { onSetComponent } = useTopAppBarContext();
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value)
        e.preventDefault()
    }
    React.useEffect(() => {
        onSetComponent(<CategoryTopAppBar title={params.categoryName} />)
        getEntriesByDateRange({ start: today, end: rangeMap[range] }).then((e) => {
            setEntries(e as Entry[])
            console.log("wonder", e)
            setFetching(false);
        })
    }, [onSetComponent, params.categoryName, range])
    const filteredByCategory = entries.filter((e) => e.categories?.[0]?.categoryName === selectedCategory)
    const series = selectedCategory ? totalTimeByCategory(entries, selectedCategory) : []
   console.log('Sosup', series)
    const filtered = (IS_OFFLINE ? categories : categories).filter((cat) => cat.categoryName.indexOf(inputText) >= 0)


    console.log("series", series)
    const sum = series.reduce((p, c) => { const total = p + c?.totalTime ||0; return total }, 0)
    const rounded = Math.round(sum * 10) / 10
    return (
        <Slide direction='left' in={true}>
            <Box>
                <CategoryTopAppBar title='hi' />
                <Box sx={{ width: '100%', flexDirection: 'row', display: 'flex', justifyContent: 'center' }}>
                    {ranges.map((r) => <Button key={r.label} onClick={() => onRangeSelect(r.label)} size='small' fullWidth variant={range === r.label ? "contained" : "outlined"}>{r.label}</Button>)}
                </Box>
                <Box sx={{ p: 1 }}>
                    <Typography fontWeight={'bold'}>
                        Total
                    </Typography>
                    <Typography fontWeight='bold' variant='h4'>
                        {rounded}hrs
                    </Typography>
                    <Typography color='GrayText' variant='body1'>{rangeMap[range].toDateString()}-{today.toDateString()}</Typography>
                   {  <Box sx={{ display: 'flex', height: 300, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        { fetching ? <CircularProgress/> : <BarChart margin={{
                            left: 10,
                            right: 10,
                            top: 0,
                            bottom: 30,
                        }} grid={{ vertical: true }}
                            leftAxis={null} series={[{ dataKey: 'totalTime' }]} dataset={series} xAxis={[{ tickPlacement: 'middle', dataKey: 'date', scaleType: 'band' }]} />}

                    </Box>}
                    <Box sx={{ m: 1 }}>
                        <CustomLines entries={filteredByCategory} />
                    </Box>


                    <TextField size='small' fullWidth value={inputText} onChange={onChange} />
                    <Box sx={{ m: 1 }}>
                        {filtered.map((c) => <Chip key={c.categoryId} icon={selectedCategory === c.categoryName ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />} onClick={() => setSelectedCategory(c.categoryName)} label={c.categoryName} sx={{ background: c.color, mr: 1, mb: 1 }} />)}
                    </Box>

                </Box>
            </Box>
        </Slide>
    )
}