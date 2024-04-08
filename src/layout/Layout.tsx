import { Box, Card, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { NewEntryForm } from '../components/NewEntryForm';
import { QuickEntries } from '../components/QuickEntries';
import { TopAppBar } from '../components/TopAppBar';
import { Entries } from '../components/Entries';
import { BottomAppBar } from '../components/BottomAppBar';
import { isMobile } from '../utils/isMobile';
import { ActiveEntry } from '../components/ActiveEntry';

export const Layout: React.FC = () => {
    return (
        <Box margin={1} display={'flex'} flexDirection={'column'}>
            {!isMobile() && <TopAppBar />}
            {!isMobile() && <Toolbar />}
            {!isMobile() && <NewEntryForm />}
            <QuickEntries />
            <Typography> April 2 2024</Typography>
            <Entries />
                <Box sx={{position: 'sticky', bottom: 0}}>
                    <ActiveEntry/>
                </Box>

           
            {isMobile() && <BottomAppBar/>}
        </Box>
    )
}