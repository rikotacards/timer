import { Snackbar } from '@mui/material';
import React from 'react';

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

    const onSetComponent = (component: React.ReactNode) => {
        setComponent(component)
    }
    const toggleOpen = () => {
        setOpen(!open);
    }

    const value = {
        open,
        toggleOpen,
        onSetComponent
    }

    return <SnackbarContext.Provider value={value}>
        <Snackbar autoHideDuration={4000} open={open} onClose={toggleOpen}>
            <div>
                {component}
            </div>
        </Snackbar>
        {children}
    </SnackbarContext.Provider>
}