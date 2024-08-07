import { Box, Snackbar } from '@mui/material';
import React from 'react';
import { useIsNarrow } from '../utils/isMobile';

interface SnackbarContextProps {
    open: boolean;
    toggleOpen: () => void;
    onSetComponent: (component: React.ReactNode) => void;
}
export const SnackbarContext = React.createContext<SnackbarContextProps>({} as SnackbarContextProps)

interface SnackbarProvider {
    children: React.ReactNode
}
export const SnackbarProvider: React.FC<SnackbarProvider> = ({ children }) => {
    const [open, setOpen] = React.useState(false);
    const [component, setComponent] = React.useState<React.ReactNode | null>();
    const isNarrow = useIsNarrow();
    const onSetComponent = (component: React.ReactNode) => {
        setComponent(component)
    }
    const toggleOpen = () => {
        console.log('closed')
        setOpen(!open);
    }
    const onClose = () => {
        setOpen(false)
    }

    const value = {
        open,
        toggleOpen,
        onSetComponent
    }

    return <SnackbarContext.Provider value={value}>
        <Snackbar anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
         autoHideDuration={4000} 
         open={open} 
         onClose={onClose}>
            <Box sx={{width: isNarrow ? '100%': '100%'}}>
                {component}
            </Box>
        </Snackbar>
        {children}
    </SnackbarContext.Provider>
}