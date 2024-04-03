import { Drawer, DrawerProps } from '@mui/material';
import React from 'react';
interface DrawerContextProps {
    open: boolean;
    toggleOpen: () => void;
    onSetComponent: (component: React.ReactNode) => void;
    onSetAnchor:(anchor: DrawerProps['anchor']) => void;
}
export const DrawerContext = React.createContext<DrawerContextProps>({} as DrawerContextProps)

interface DrawerProviderProps {
    children: React.ReactNode;
}

export const DrawerProvider: React.FC<DrawerProviderProps> = ({ children }) => {
    const [open, setOpen] = React.useState(false);
    const [anchor, setAnchor] = React.useState<DrawerProps['anchor']>()

    const onSetAnchor = (anchor: DrawerProps['anchor']) =>{
        setAnchor(anchor)
    }
    const [component, setComponent] = React.useState<React.ReactNode | null>();
    const onSetComponent = (component: React.ReactNode) => {
        setComponent(component)
    }
    const toggleOpen = () => {
        setOpen(!open)
    }
    const value = {
        open,
        toggleOpen,
        onSetComponent,
        onSetAnchor
    }
    return (
        <DrawerContext.Provider value={value}>
            <Drawer anchor={anchor} open={open} onClose={toggleOpen}>
                {component}
            </Drawer>
                {children}
        </DrawerContext.Provider>
    )
}