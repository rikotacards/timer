import React from 'react';
import { Category } from '../firebase/types';
import { Chip } from '@mui/material';
interface CategoryChipProps {
    category: Category;
    onClick?:   (categoryName: string, categoryId: string) => void;
    isNarrow?: boolean;


}
export const CategoryChip: React.FC<CategoryChipProps> = ({ isNarrow, category, onClick}) => {
    return (
        <Chip sx={{
            textTransform: 'capitalize',
            border: '1px solid transparent',
            borderColor: category.color,
            color: category.color,
            
            fontWeight: isNarrow ? undefined : 600,
            background: category.color + "34"
        }} 
        size='small' key={category.categoryId} 
        onClick={() => onClick && onClick(category.categoryName, category.categoryId)} 
        label={category.categoryName} />
    )
}