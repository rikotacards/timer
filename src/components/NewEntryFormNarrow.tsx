import { Box, Button, Chip, TextField, Typography } from '@mui/material';
import React from 'react';
import { QuickEntries } from './QuickEntries';

const categories = [{
    categoryName: 'work', 
    color: ''
}, {
    categoryName: 'Travel', 
    color: 'blue'
}, {
    categoryName: 'Walk', 
    color: ''
}, {
    categoryName: 'Clean', 
    color: 'blue'
}]
export const NewEntryFormNarrow: React.FC = () => {
    return <Box>
        <Box sx={{p:1}}>

        <QuickEntries />
        <TextField size='small' margin='dense' fullWidth placeholder='What are you working on?'/>
        <TextField  size='small' fullWidth placeholder='Add Category'/>

        <Box sx={{m:1}}>
            {categories.map((c) => <Chip label={c.categoryName} sx={{background:c.color, mr:1}}/>)}

        </Box>
        <Typography variant='caption'>Add Category</Typography>
        <Button variant='contained' sx={{mt:1}} fullWidth>Start</Button>
        </Box>


    </Box>
}