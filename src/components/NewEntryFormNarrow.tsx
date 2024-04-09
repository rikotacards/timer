import { Alert, Box, Button, Chip, IconButton, TextField, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useAppDataContext, useDrawerContext, useSnackbarContext } from '../Providers/contextHooks';
import { AddOpenEntry, updateOpenEntry } from '../firebase/db';
import { Category, OpenEntry } from '../firebase/types';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { IS_OFFLINE } from '../App';
const mockCategories = [{
    categoryName: 'work',
    color: '',
    categoryId: '1'
}, {
    categoryName: 'Travel',
    color: 'blue',
    categoryId: '2'

}, {
    categoryName: 'Walk',
    color: '',
    categoryId: '3'

}, {
    categoryName: 'Clean',
    color: 'blue',
    categoryId: '4'

}]
export const NewEntryFormNarrow: React.FC = () => {
    const s = useSnackbarContext();
    console.log('new entry form')
    const [desc, setDesc] = React.useState("");

    const { toggleOpen } = useDrawerContext();
    const { openEntry, setOpenEntry, categories } = useAppDataContext();
    const [inputText, setInputText] = React.useState('');
    const onCatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
        e.preventDefault()
      }
    const [selectedCategory, setSelectedCategory] = React.useState<string | undefined>()
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDesc(e.target.value)
        e.preventDefault()
    }
   
    const filtered = (IS_OFFLINE ? mockCategories : categories).filter((cat) => cat.categoryName.indexOf(inputText) >= 0)

    const onStart = async () => {
        s.onSetComponent(<Alert variant='filled' severity='success'>Logging started</Alert>)
        s.toggleOpen();


       
        try {
            const ref = await AddOpenEntry({...openEntry, desc})
            toggleOpen();
            if (ref) {
                console.log('adding open entry', ref)
                setOpenEntry(ref as unknown as OpenEntry)
            }
        } catch (e) {
            alert(e)
        }
    }
    const addCategory = (category: Category) => {
        console.log('category added to UI', category.categoryName)
        setSelectedCategory(category.categoryName)
        setOpenEntry((p) => ({ ...p, categories: [category] }))
        console.log('after setting', openEntry)
        if (openEntry && openEntry.entryId) {
            console.log('setting', openEntry)
            updateOpenEntry({ ...openEntry, categories: [category] })
        }
    }
    return <Box>
        <Box >
            <Toolbar>
                <Typography fontWeight={'bold'}>Add Entry</Typography><IconButton sx={{ ml: 'auto' }} onClick={toggleOpen}><KeyboardArrowDownIcon /></IconButton>
            </Toolbar>
            <Box sx={{p:1}}>

            <TextField autoFocus onChange={onChange} size='small' margin='dense' fullWidth placeholder='What are you working on?' />
            <TextField onChange={onCatChange} size='small' fullWidth placeholder='Add Category' />

            <Box sx={{ m: 1 }}>
                {filtered.map((c) => <Chip key={c.categoryId} icon={selectedCategory === c.categoryName ? <CheckCircleIcon/> : <RadioButtonUncheckedIcon/>} onClick={()=>addCategory(c)} label={c.categoryName} sx={{ background: c.color, mr: 1, mb: 1 }} />)}
            </Box>
            <Typography variant='caption'>Add Category</Typography>
            <Button color='success' size='large' onClick={onStart} variant='contained' sx={{ mt: 1 }} fullWidth>Start</Button>
            </Box>
        </Box>


    </Box>
}