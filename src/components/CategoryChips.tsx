import { Box, Chip } from '@mui/material'
import React from 'react'
import { Category } from '../firebase/types';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
interface CategoryChipsProps {
    entryCategories?: Category[];
    onChipClick: (categoryName: string) => void;
}
export const CategoryChips: React.FC<CategoryChipsProps> = ({onChipClick, entryCategories}) => {
    if(!entryCategories){
        return;
    }
  
    const displayed = entryCategories.map((c,i) => 
    <Box key={c.categoryId} sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Chip sx={{
        border: '1px solid transparent',
        borderColor: c.color,
        color: c.color,
        fontWeight:600,
        background: c.color+"34"
    }} size='small' key={c.categoryId} onClick={() => onChipClick(c.categoryName)} label={c.categoryName}/>{i < entryCategories.length -1 && <ArrowRightIcon/>}</Box>)

    return(
        <Box sx={{display: 'flex', flexDirection: 'row'}}>{displayed}</Box>
    )
}