import { Alert, Box, Button, Chip, Input} from '@mui/material';
import React from 'react';
import { ColorPicker } from './ColorPicker';
import { addCategory } from '../firebase/db';
import { useAppDataContext, useSnackbarContext } from '../Providers/contextHooks';
interface CreateNewCategoryProps {
    categoryName?: string
    onCancel: () => void;
    onHandleClose: () => void
    isEditing: boolean;
    editingCategoryId?: string;
}
export const CreateNewCategory: React.FC<CreateNewCategoryProps> = ({categoryName, onCancel, onHandleClose, isEditing, editingCategoryId}) => {
    const [text, setText] = React.useState(editingCategoryId || '')
    const snackbar = useSnackbarContext();
    const {triggerRefetch, categories} = useAppDataContext();
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }
    const categoryNames = categories.map((c) => c.categoryName.toLowerCase())
    const categoryExists = categoryNames.includes(text.toLowerCase())
    const onAddCategory = async() => {
        await addCategory({categoryName:text, color})
        triggerRefetch()
        onHandleClose();
        snackbar.onSetComponent(<Alert variant='filled' severity='success'>{categoryName} added</Alert>)
        snackbar.toggleOpen();
     }
  

    const [color, setColor] = React.useState('')
    return (
        <Box sx={{ maxWidth:400, m: 1, display: 'flex', flexDirection: 'column' }}>

                <Chip sx={{
        border: '1px solid transparent',
        borderColor: color,
        color: color,
        fontWeight:600,
        background: color+"34"
    }} label={<div><Input
                    inputProps={{ size: text?.length || 5 }}
                    autoFocus placeholder='name' margin='dense' size='small'
                    disableUnderline
                    onChange={onChange}
                    value={text}
                    sx={{color:color, background: 'transparent', size: 1 }} /></div>} />

            <div>





            </div >

            {categoryExists &&   <Alert sx={{m:1}} severity='error'>Category exists</Alert>}

            <div>
                <ColorPicker color={color} selectColor={setColor} />
            </div>
            <Button disabled={categoryExists || text.length === 0} onClick={onAddCategory}>Add</Button>
            <Button onClick={onCancel}>Cancel</Button>

        </Box>
    )
}