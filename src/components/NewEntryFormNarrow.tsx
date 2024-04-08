import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import { QuickEntries } from './QuickEntries';
import { CategoryEdit } from './CategoryEdit';

export const NewEntryFormNarrow: React.FC = () => {
    return <Box>
        <Box sx={{p:1}}>

        <QuickEntries />
        <TextField size='small' fullWidth placeholder='What are you working on?'/>
        <Button variant='contained' sx={{mt:1}} fullWidth>Start</Button>
        </Box>


    </Box>
}