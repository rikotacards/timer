import React from 'react';

import {  Box, Button, Chip, Popover } from "@mui/material"
import { Category } from "../firebase/types";
import { ColorPickerUpdate } from "./ColorPickerUpdate";

interface EditCategoryRowProps {
    category: Category;
    onDelete: () => Promise<void>
}
export const EditCategoryRow: React.FC<EditCategoryRowProps> = ({onDelete, category}) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
    
    const c = category;
    const handleClose = () => {
        setAnchorEl(null);
      };
    console.log(category)
    const open = Boolean(anchorEl);
    return (
        <Box sx={{p:0.5, display: 'flex', width: '100%', alignItems: 'center'}}>
        <Chip label={category.categoryName} sx={{
        border: '1px solid transparent',
        borderColor: category.color,
        color: category.color,
        fontWeight:600,
    
        background: category.color+"34"}}/>
        <Box sx={{marginLeft: 'auto'}}>
        <Button variant='outlined' onClick={handleClick} size="small" sx={{mr:1}}>{c.color}</Button>

         <Popover
         id={c.categoryId}
         open={open}
         anchorEl={anchorEl}
         onClose={handleClose}
         anchorOrigin={{
             vertical: 'bottom',
             horizontal: 'left',
           }}
           transformOrigin={{
             vertical: 'top',
             horizontal: 'left',
           }}
         >
             <ColorPickerUpdate categoryId={c.categoryId}  currColor={c.color}/>
         </Popover>
        <Button sx={{textTransform: 'capitalize'}} onClick={onDelete} variant='outlined' color='error'>delete</Button>
        </Box>
     </Box>
    )
}