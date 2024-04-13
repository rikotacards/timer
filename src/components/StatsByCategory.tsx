import { Box, Button, Card, Chip, CircularProgress, Slide, TextField, Typography } from "@mui/material"
import { useAppDataContext } from "../Providers/contextHooks"
import { totalTimeByCategory } from "../utils/totalTimeByCategoty";
import { IS_OFFLINE } from "../App";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useParams } from "react-router";
import { getEntryDurations } from "../utils/getEntryDurations";
const ranges = [{
    label: 'D'
}, { label: 'W' }, { label: 'M' }, { label: '6M' }, { label: 'Y' }]
export const StatsByCategory: React.FC = () => {
    const { entries, isLoadingEntries, categories } = useAppDataContext();
    const params = useParams();
    const [inputText, setInputText] = React.useState('')
    const [selectedCategory, setSelectedCategory] = React.useState<string>(params?.category || categories[0]?.categoryName || '')

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value)
        e.preventDefault()
    }
    const filteredByCategory = entries.filter((e) => e.categories?.[0]?.categoryName === selectedCategory)
    const entriesWithDuration = getEntryDurations(filteredByCategory)
    const series = selectedCategory ? totalTimeByCategory(entries, selectedCategory) : []
    const filtered = (IS_OFFLINE ? categories : categories).filter((cat) => cat.categoryName.indexOf(inputText) >= 0)
    if (isLoadingEntries) {
        return <CircularProgress />
    }
    

    const sum = series.reduce((p, c) => { const total = p + c.totalTime; return total }, 0)
    const rounded = Math.round(sum * 10) / 10
    return (
        <Slide direction='left' in={true}>
            <Box>
                <Box sx={{ width: '100%', flexDirection: 'row', display: 'flex', justifyContent: 'center' }}>
                    {ranges.map((r) => <Button size='small' fullWidth variant='outlined'>{r.label}</Button>)}
                </Box>
                <Box sx={{ p: 1 }}>
                    <Typography fontWeight={'bold'}>
                        Total
                    </Typography>
                    <Typography fontWeight='bold' variant='h4'>
                        {rounded}hrs
                    </Typography>
                    <Box sx={{ display: 'flex', height: 300, width: '100%' }}>
                        {series.length && <BarChart grid={{ vertical: true }}
                            leftAxis={null} series={[{ dataKey: 'totalTime' }]} dataset={series} xAxis={[{ dataKey: 'date', scaleType: 'band' }]} yAxis={[]} />}

                    </Box>
                    <Box sx={{ display: 'flex', height: 500, width: '100%' }}>
                        {<BarChart layout="horizontal"
                            grid={{ vertical: true }}
                             series={[{ dataKey: 'duration' }]} dataset={entriesWithDuration}

                            yAxis={[{ dataKey: 'desc', scaleType: 'band', }]} />}

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