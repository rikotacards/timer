import { Modal } from '@mui/material';
import React from 'react';

interface ModalContextProps {
    open: boolean;
    toggleOpen: () => void;
    onSetComponent: (component: React.ReactNode) => void;
}
export const ModalContext = React.createContext<ModalContextProps>({} as ModalContextProps)

interface ModalProviderProps {
    children: React.ReactNode
}
export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
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

    return <ModalContext.Provider value={value}>
        <Modal open={open} onClose={toggleOpen}>
            <>
                {component}
            </>
        </Modal>
        {children}
    </ModalContext.Provider>
}