import {  Chip, List, ListItem, } from '@mui/material';
import React from 'react';
import {  Category } from '../firebase/types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface CategoryListProps {
    categories: Category[];
    addCategory: (category: Category) => void;
    selectedCategory?: string
    categoryInput?: string;
}
export const CategoryList: React.FC<CategoryListProps> = ({addCategory, categories, selectedCategory}) => {
    const categoryIdMap: {[key:string]: Category} = {};
    categories.forEach((c) => {
     categoryIdMap[c.categoryId]= c
    })
    const displayedCategories = categories.map((c) => {
       
           if(c.parent){
            
            return null
           }
        return (
            <li key={c.categoryId}>
                    <ul>
    
            <ListItem onClick={() => addCategory(c)}>
                <Chip icon={selectedCategory === c.categoryName ? <CheckCircleIcon/> : <></>} sx={{background: c.color}} label={c.categoryName}/></ListItem>
            {c.children?.map((c) => <ListItem onClick={ () => addCategory(categoryIdMap[c])}  key={c}><Chip icon={selectedCategory === categoryIdMap[c]?.categoryName ? <CheckCircleIcon/> : <></>}  sx={{ ml:3, background: categoryIdMap[c]?.color}} label={categoryIdMap[c]?.categoryName}/></ListItem>)}
                    </ul>
            </li>
        )
    
            }
            )
        
    return (
        <List sx={{
            width: '100%',
            // bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'auto',
            '& ul': { padding: 0 },
          }}
          subheader={<li />}>
    
                {displayedCategories}
                </List>
    )
}