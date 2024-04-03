import { AppBar, Avatar, Box, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Entry } from '../components/Entry';
import { NewEntryForm } from '../components/NewEntryForm';
import { QuickEntries } from '../components/QuickEntries';
import { TopAppBar } from '../components/TopAppBar';

export const Layout: React.FC = () => {
    return (
        <Box margin={1}>
            <TopAppBar/>
            <Toolbar />
            <NewEntryForm />
            <QuickEntries />
            <Typography> April 2 2024</Typography>
            <Entry />
            <Entry />

        </Box>
    )
}