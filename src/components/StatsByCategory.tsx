import { Box, Chip, CircularProgress, TextField } from "@mui/material"
import { useAppDataContext } from "../Providers/contextHooks"
import { totalTimeByCategory } from "../utils/totalTimeByCategoty";
import { IS_OFFLINE } from "../App";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export const StatsByCategory: React.FC = () => {
    const { entries, isLoadingEntries, categories } = useAppDataContext();
    const [inputText, setInputText] = React.useState('')
    const [selectedCategory, setSelectedCategory] = React.useState<string>(categories[0].categoryName)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value)
        e.preventDefault()
    }
    const series = selectedCategory ? totalTimeByCategory(entries, selectedCategory) : []
    const filtered = (IS_OFFLINE ? categories : categories).filter((cat) => cat.categoryName.indexOf(inputText) >= 0)
    if(isLoadingEntries){
        return <CircularProgress/>
    }
    return (
        <Box>
            <TextField fullWidth value={inputText} onChange={onChange} />
                {series.length && <BarChart height={300}  series={[{dataKey: 'totalTime'}]} dataset={series} xAxis={[{dataKey: 'date', scaleType: 'band'}]}/>}
                <Box sx={{ m: 1 }}>
                    {filtered.map((c) => <Chip  key={c.categoryId} icon={selectedCategory === c.categoryName ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />} onClick={() => setSelectedCategory(c.categoryName)} label={c.categoryName} sx={{ background: c.color, mr: 1, mb: 1 }} />)}
                </Box>

        </Box>
    )
}