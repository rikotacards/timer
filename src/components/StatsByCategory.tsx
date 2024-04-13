import { Box, Card, Chip, CircularProgress, Slide, TextField, Typography } from "@mui/material"
import { useAppDataContext } from "../Providers/contextHooks"
import { totalTimeByCategory } from "../utils/totalTimeByCategoty";
import { IS_OFFLINE } from "../App";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useParams } from "react-router";

export const StatsByCategory: React.FC = () => {
    const { entries, isLoadingEntries, categories } = useAppDataContext();
    const params = useParams();
    console.log(params)
    const [inputText, setInputText] = React.useState('')
    const [selectedCategory, setSelectedCategory] = React.useState<string>(params?.category || categories[0]?.categoryName || '')
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value)
        e.preventDefault()
    }
    const series = selectedCategory ? totalTimeByCategory(entries, selectedCategory) : []
    const filtered = (IS_OFFLINE ? categories : categories).filter((cat) => cat.categoryName.indexOf(inputText) >= 0)
    if (isLoadingEntries) {
        return <CircularProgress />
    }
    const sum = series.reduce((p, c) => {  const total = p + c.totalTime; return total}, 0 )
    const rounded = Math.round(sum*10)/10
    return (
        <Slide direction='left' in={true}>
        <Box>
            <Card sx={{p:1, alignItems: 'center', display: 'flex',flexDirection: 'column'}}>
                <Typography variant='h6'>
                    Total Hours Logged for <Chip label={selectedCategory}/>
                </Typography>
                <Typography>
                   {rounded}
                </Typography>
            </Card>
            {series.length && <BarChart leftAxis={null} height={300} series={[{ dataKey: 'totalTime' }]} dataset={series} xAxis={[{ dataKey: 'date', scaleType: 'band' }]} yAxis={[]} />}
            <TextField size='small' fullWidth value={inputText} onChange={onChange} />
            <Box sx={{ m: 1 }}>
                {filtered.map((c) => <Chip key={c.categoryId} icon={selectedCategory === c.categoryName ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />} onClick={() => setSelectedCategory(c.categoryName)} label={c.categoryName} sx={{ background: c.color, mr: 1, mb: 1 }} />)}
            </Box>

        </Box>
        </Slide>
    )
}