import { Box, Chip } from '@mui/material'
import React from 'react'
import { Category } from '../firebase/types';
import { useAppDataContext } from '../Providers/contextHooks';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
interface CategoryChipsProps {
    entryCategories?: Category[];
    onChipClick: (categoryName: string) => void;
}
export const CategoryChips: React.FC<CategoryChipsProps> = ({onChipClick, entryCategories}) => {
    const categoryIdMap: {[key:string]: Category} = {};
    const {categories} = useAppDataContext();
    categories.forEach((c) => {
        categoryIdMap[c.categoryId]= c
    })
    if(!entryCategories){
     return null
    }
    const res: Category[] = []; 
    
    entryCategories.forEach((c) => {
        if(c.parent){
            res.push(categoryIdMap[c.parent])
        }
        res.push(c)
    })
    const displayed = res.map((c,i) => <Box key={c.categoryId} sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}><Chip size='small' key={c.categoryId} onClick={() => onChipClick(c.categoryName)} label={c.categoryName} sx={{background: c.color, mr:0.5}}/>{i < res.length -1 && <ArrowRightIcon/>}</Box>)

    return(
        <Box sx={{display: 'flex', flexDirection: 'row'}}>{displayed}</Box>
    )
}