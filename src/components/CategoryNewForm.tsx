import { InfoOutlined } from '@mui/icons-material';
import { Alert, Box, Button, Typography } from '@mui/material';
import React from 'react';
import { ColorPicker } from './ColorPicker';
import { addCategory } from '../firebase/db';
import { useSnackbarContext } from '../Providers/contextHooks';

interface CategoryNewFormProps {
    categoryName: string;
    onHandleClose: () => void;
}

export const CategoryNewForm: React.FC<CategoryNewFormProps> = ({onHandleClose, categoryName}) => {
    const [color, setColor] = React.useState<string>('');
    const snackbar = useSnackbarContext();
    const onAddCategory = async() => {
       await addCategory({categoryName, color, categoryId: ''})
       onHandleClose();
       snackbar.onSetComponent(<Alert variant='filled' severity='success'>{categoryName} added</Alert>)
       snackbar.toggleOpen();
    }
    const selectColor = (selectedColor: string) => {
        console.log('selected color', color)
        setColor(selectedColor)
    }
    return <Box sx={{ mt: 1, mb: 1, p: 1 }}>
        <Box flexDirection={'row'} display={'flex'} alignContent={'center'}>
            <InfoOutlined sx={{ mr: 1 }} />
            <Typography>
                Create new category
            </Typography>
        </Box>
        <ColorPicker color={color} selectColor={selectColor}/>
        <Button onClick={onAddCategory} fullWidth size='small'>Done</Button>
    </Box>
}