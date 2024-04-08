import { Alert, Box, Button, Chip, Input, Typography } from '@mui/material';
import React from 'react';
import { ColorPicker } from './ColorPicker';
import { addCategory } from '../firebase/db';
import { useSnackbarContext } from '../Providers/contextHooks';
interface CreateNewCategoryProps {
    categoryName?: string
    onCancel: () => void;
    onHandleClose: () => void
}
export const CreateNewCategory: React.FC<CreateNewCategoryProps> = ({categoryName, onCancel, onHandleClose}) => {
    const [text, setText] = React.useState(categoryName || '')
    const snackbar = useSnackbarContext();

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }
    const onAddCategory = async() => {
        await addCategory({categoryName:text, color, categoryId: ''})
        onHandleClose();
        snackbar.onSetComponent(<Alert severity='success'>{categoryName} added</Alert>)
        snackbar.toggleOpen();
     }
  

    const [color, setColor] = React.useState('')
    return (
        <Box sx={{ maxWidth:400, m: 1, display: 'flex', flexDirection: 'column' }}>

            <Typography sx={{ p: 1 }} fontWeight={'bold'}>Create new category</Typography>
            <div>
                <Chip sx={{ background: color, alignItems: 'center', justifyContent: 'center' }} label={<div><Input
                    inputProps={{ size: text?.length || 5 }}
                    autoFocus placeholder='name' margin='dense' size='small'
                    disableUnderline
                    onChange={onChange}
                    value={text}
                    sx={{ background: 'transparent', size: 1 }} /></div>} />

            </div>
            <div>





            </div >


            <div>
                <ColorPicker color={color} selectColor={setColor} />
            </div>
            <Button onClick={onAddCategory}>Done</Button>
            <Button onClick={onCancel}>Cancel</Button>

        </Box>
    )
}