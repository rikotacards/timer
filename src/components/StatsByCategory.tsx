import { Autocomplete, Box, Button, Chip, CircularProgress, MenuItem, Slide, TextField, Toolbar, Typography } from "@mui/material"
import { useAppDataContext, useTopAppBarContext } from "../Providers/contextHooks"
import { totalDurationByDate } from "../utils/totalTimeByCategoty";
import { ScrollRestoration } from "react-router-dom";

import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useLocation, useParams } from "react-router";

import { CustomLines } from "./CustomLines";
import { CategoryTopAppBar } from "./CategoryTopAppBar";
import {  getEntriesByDateRangeAndCategories } from "../firebase/db";
import {  Entry } from "../firebase/types";
const today = new Date();
today.setHours(23, 59, 59, 99)
const endOfDay = new Date(today)
endOfDay.setHours(0, 0, 0, 0)
const week = new Date(today)
week.setDate(today.getDate() - 7)
const month = new Date(today)
month.setDate(today.getDate() - 31)
const sixMonth = new Date(today)
sixMonth.setDate(today.getDate() - 180)
export const year = new Date(today)
year.setDate(today.getDate() - 365);

type RangeType = 'D' | 'W' | 'M' | '6M' | 'Y'

const ranges: { label: RangeType }[] = [{
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
    const [range, setRange] = React.useState<RangeType>("W")
    const [fetching, setFetching] = React.useState(false);
    const [entries, setEntries] = React.useState<Entry[]>([] as Entry[])
    const { categories } = useAppDataContext();
    const location = useLocation();
    const categoryIdFromLocation = location.state?.['categoryId'] || ''
    // const category = categories.find((c) => c?.categoryId === categoryIdFromLocation)
    const params = useParams();
    const [selectedC, setSelectedC] = React.useState<{label: string, id: string, color: string} | undefined>()

    const onRangeSelect = (range: RangeType) => {
        setRange(range)
    }

    const { onSetComponent } = useTopAppBarContext();
    const selectedCategoryId = selectedC?.id || categoryIdFromLocation
    React.useEffect(() => {
        onSetComponent(<CategoryTopAppBar title={params.categoryName} />)
        if(!selectedCategoryId){
            return;
        }
        getEntriesByDateRangeAndCategories({ start: today, end: rangeMap[range], categoryIds: [selectedCategoryId] }).then((e) => {
            console.log('GETTING ENTRIES',e)
            setEntries(e as Entry[])
            setFetching(false);
        }).catch((e) => {setFetching(false); console.error('error', e)})
    }, [onSetComponent, params.categoryName, range, selectedCategoryId])


    const series = selectedC ? totalDurationByDate(entries) : []
    const sum = series.reduce((p, c) => { const total = p + c?.totalTime || 0; return total }, 0)
    const rounded = Math.round(sum * 10) / 10
    const options = categories.map((c) => ({ label: c.categoryName, id: c?.categoryId, color: c.color }))
    return (
        <Slide direction='left' in={true}>
            <Box>
                <ScrollRestoration />
                <CategoryTopAppBar title='hi' />

                <Autocomplete
                    sx={{ mb: 1 }}
                    size='small'
                    options={options}
                    onChange={(_e, newValue: {label: string; id: string;color: string} | null) => {
                        if(newValue){
                            console.log('change')
                            setSelectedC(newValue)
                        }
                    }}
                    isOptionEqualToValue={(o, v) => { return o.id === v.id}}
                    disableCloseOnSelect={false}
                    renderOption={(props, c) => (
                        <MenuItem component={'li'} {...props}
                       
                        >
                            <Chip key={c.id + c.label}
                              
                                label={c.label} sx={{ background: c.color, mr: 1, mb: 1 }} />
                        </MenuItem>)}

                    renderInput={(params) => {
                        return <TextField
                            {...params}
                            //  InputProps={{startAdornment: <Chip label={params.inputProps.value}/>}}
                            placeholder="Search or select category"
                        />
                    }
                    } />
                <Box sx={{ width: '100%', flexDirection: 'row', display: 'flex', justifyContent: 'center' }}>
                    {ranges.map((r) => <Button sx={{ mb: 1, borderRadius: 0 }}
                        key={r.label}
                        onClick={() => onRangeSelect(r.label)}
                        size='small' fullWidth
                        variant={range === r.label ? "contained" : "outlined"}>{r.label}</Button>)}
                </Box>
                <Box sx={{ p: 1 }}>
                    <Typography fontWeight={'bold'}>
                        Total
                    </Typography>
                    <Typography fontWeight='bold' variant='h4'>
                        {rounded}hrs
                    </Typography>
                    <Typography color='GrayText' variant='body1'>{rangeMap[range].toDateString()}-{today.toDateString()}</Typography>
                    <Box sx={{ display: 'flex', height: 300, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        {fetching ? <CircularProgress /> : 
                        series.length ? <BarChart margin={{
                            left: 10,
                            right: 10,
                            top: 0,
                            bottom: 30,
                        }} grid={{ vertical: true }}
                            leftAxis={null} series={[{ dataKey: 'totalTime' }]} dataset={series} xAxis={[{ tickPlacement: 'middle', dataKey: 'date', scaleType: 'band' }]} /> : 
                            <Typography variant='body2'>No data for this range. Try a different range.</Typography>}

                    </Box>
                    <Box sx={{ m: 1 }}>
                        <CustomLines entries={entries} />
                    </Box>




                </Box>
                <Toolbar/>
                <Toolbar/>

            </Box>
        </Slide>
    )
}