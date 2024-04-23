import { Drawer, DrawerProps, PaperProps } from '@mui/material';
import React from 'react';
interface DrawerContextProps {
    open: boolean;
    toggleOpen: () => void;
    onSetComponent: (component: React.ReactNode) => void;
    onSetAnchor:(anchor: DrawerProps['anchor']) => void;
    close: () => void;
    onSetPaperProps: (paperProps: PaperProps) => void;
}
export const DrawerContext = React.createContext<DrawerContextProps>({} as DrawerContextProps)

interface DrawerProviderProps {
    children: React.ReactNode;
}

export const DrawerProvider: React.FC<DrawerProviderProps> = ({ children }) => {
    const [open, setOpen] = React.useState(false);
    const [anchor, setAnchor] = React.useState<DrawerProps['anchor']>()
    const [paperProps, setPaperProps] = React.useState<PaperProps>({} as PaperProps)
    const onSetAnchor = (anchor: DrawerProps['anchor']) =>{
        setAnchor(anchor)
    }
    const onSetPaperProps = (paperProps: PaperProps) => {
        setPaperProps(paperProps); 
    }
    const [component, setComponent] = React.useState<React.ReactNode | null>();
    const onSetComponent = React.useCallback((component: React.ReactNode) => {
        setComponent(component)
    }, [])
    const toggleOpen = () => {
        setOpen(!open)
    }
    const close = () => {
        setOpen(false)
    }
    const value = {
        open,
        toggleOpen,
        onSetComponent,
        onSetAnchor,
        close, 
        onSetPaperProps,
        paperProps
    }
    return (
        <DrawerContext.Provider value={value}>
            <Drawer PaperProps={paperProps} sx={{ position: 'relative'}} anchor={anchor} open={open} onClose={toggleOpen}>
                {component}
            </Drawer>
                {children}
        </DrawerContext.Provider>
    )
}