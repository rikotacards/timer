import React from 'react';
interface TopAppBarContextProps {
    onSetComponent: (component: React.ReactNode) => void;
}
interface TopAppBarProviderProps {
    children: React.ReactNode;
}
export const TopAppBarContext = React.createContext<TopAppBarContextProps>({} as TopAppBarContextProps)

export const TopAppBarProvider: React.FC<TopAppBarProviderProps> = ({children}) => {
    const [component, setComponent] = React.useState<React.ReactNode>()
    const onSetComponent = React.useCallback((component: React.ReactNode) => {
        setComponent(component)
    },[])
    React.useEffect(() => {
        console.log('TopApp rendered')
    }, [])
   
    const value = {
        setComponent,
        onSetComponent,
        component
    }
    return (
        <TopAppBarContext.Provider value={value}>
            {component}
            {children}
        </TopAppBarContext.Provider>
    )
}