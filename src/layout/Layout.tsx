import { Alert, Box, Toolbar } from '@mui/material';
import React from 'react';
import { NewEntryForm } from '../components/NewEntryForm';
import { QuickEntries } from '../components/QuickEntries';
import { Entries } from '../components/Entries';
import { BottomAppBar } from '../components/BottomAppBar';
import { useIsNarrow } from '../utils/isMobile';
import { useSnackbarContext } from '../Providers/contextHooks';
import { Route, Routes } from 'react-router';
import { StatsByCategory } from '../components/StatsByCategory';
import { TopAppBarProvider } from '../Providers/TopAppBarProvider';

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
            <TopAppBarProvider>
                {isNarrow && <Toolbar />}
                {!isNarrow && <NewEntryForm />}
                <Routes>
                    <Route path={'/stats/:category'} element={<StatsByCategory />} />
                    <Route path={'/stats/*'} element={<StatsByCategory />} />
                    <Route path={'/'} element={<Entries />} />
                </Routes>
                {!isNarrow && <QuickEntries />}
                {isNarrow && <BottomAppBar />}
            </TopAppBarProvider>
        </Box>
    )
}