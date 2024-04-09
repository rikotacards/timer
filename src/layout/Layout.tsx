import { Alert, Box, Toolbar } from '@mui/material';
import React from 'react';
import { NewEntryForm } from '../components/NewEntryForm';
import { QuickEntries } from '../components/QuickEntries';
import { TopAppBar } from '../components/TopAppBar';
import { Entries } from '../components/Entries';
import { BottomAppBar } from '../components/BottomAppBar';
import { useIsNarrow } from '../utils/isMobile';
import { ActiveEntry } from '../components/ActiveEntry';
import { useAppDataContext, useSnackbarContext } from '../Providers/contextHooks';

export const Layout: React.FC = () => {
    const isNarrow = useIsNarrow();
    const s = useSnackbarContext();
    const { openEntry } = useAppDataContext();
    if(!navigator.onLine){
        s.onSetComponent(<Alert severity='error'>Not connected</Alert>)
        s.toggleOpen();
    }
    return (
        <Box margin={1} display={'flex'} flexDirection={'column'}>
            {<TopAppBar />}
            {!isNarrow && <Toolbar />}
            {!isNarrow && <NewEntryForm />}
            <QuickEntries />
            <Entries />
            { isNarrow && openEntry?.entryId && <Box sx={{ position: 'sticky', bottom: 0 }}>
                <ActiveEntry />
            </Box>}


            {isNarrow && !openEntry?.entryId && <BottomAppBar />}
        </Box>
    )
}