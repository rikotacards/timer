import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import React from 'react';
import { ColorPicker } from './ColorPicker';
import { addCategory } from '../firebase/db';
import { useAppDataContext, useSnackbarContext } from '../Providers/contextHooks';
interface AddNewCategoryProps {
    setStep: (step: number) => void;
    category: string;
    color: string;
    setColor: (color: string) => void;
    resetText: () => void;
    selectCategory: (cateogryName: string) => void;
}
export const AddNewCategory: React.FC<AddNewCategoryProps> = ({selectCategory, resetText , color, setColor, category, setStep}) => {
   
    const snackbar = useSnackbarContext();
    const {triggerRefetch} = useAppDataContext();
   
    const [categoryName, setCategoryName] =React.useState(category);
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryName(e.target.value)
    }
    const onAddChildCategory = () => {
        setStep(2)
    }
    const onAddCategory = async() => {
        try {
            await addCategory({categoryName:category, color, children:[]})
            setStep(0)
            resetText();
            triggerRefetch();
            selectCategory(categoryName)
            snackbar.onSetComponent(<Alert variant='filled' severity='success'>{category} added</Alert>)
            snackbar.toggleOpen();
        } catch {
            snackbar.onSetComponent(<Alert variant='filled' severity='error'>Failed to add {category}</Alert>)
            snackbar.toggleOpen();

        }
     }

    return (<Box sx={{display: 'flex', flexDirection: 'column', p:1, alignItems: 'center', justifyContent: 'center'}}
    >

        <TextField fullWidth onChange={onChange} value={categoryName} variant='outlined' size='small'/>
        <ColorPicker color={color} selectColor={setColor}/>
        <Button variant='contained' fullWidth onClick={onAddCategory}>Add as top level category</Button>

        <Typography>or</Typography>
        <Button variant='contained' fullWidth onClick={onAddChildCategory}>Add as sub category</Button>

    </Box>)
}