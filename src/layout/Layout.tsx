import { Alert, Box, Toolbar } from '@mui/material';
import React from 'react';
import { NewEntryForm } from '../components/EntryFormDesktop';
import { QuickEntries } from '../components/QuickEntries';
import { BottomAppBar } from '../components/BottomAppBar';
import { useIsNarrow } from '../utils/isMobile';
import { useSnackbarContext } from '../Providers/contextHooks';
import { Outlet } from 'react-router';

export const Layout: React.FC = () => {
    const isNarrow = useIsNarrow();
    const s = useSnackbarContext();
    const [isConnected, setIsConnected] = React.useState(true);
    React.useEffect(() => {

        if (!isConnected && !navigator.onLine) {
            s.onSetComponent(<Alert severity='error'>Not connected</Alert>)
            s.toggleOpen();
            setIsConnected(false)
        }
    }, [s, isConnected])
    return (
        <Box margin={1} display={'flex'} flexDirection={'column'}>
            { <Toolbar />}
            {!isNarrow && <NewEntryForm />}
                  <Outlet/>
            {!isNarrow && <QuickEntries />}
            {isNarrow && <BottomAppBar />}
        </Box>
    )
}