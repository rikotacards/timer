import { Chip, ChipProps } from '@mui/material';
import { Category } from '../firebase/types';
interface CategoryChipProps {
    category: Category
}

export const CategoryChip: React.FC<CategoryChipProps & ChipProps> = (props, category) =>  {
   console.log(category)
    return  (<Chip sx={{
        border: '1px solid transparent',
        borderColor: category.color,
        color: category.color,
        fontWeight:600,
        background: category.color+"34"
    }}
        label={category.categoryName}
        />)
}
    
   
           