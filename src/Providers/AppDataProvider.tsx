import React from 'react';
import { getCategories, getOpenEntries } from '../firebase/db';
import { Category, OpenEntry } from '../firebase/types';
interface Value {
    openEntry: OpenEntry;
    setOpenEntry: React.Dispatch<React.SetStateAction<OpenEntry>>;
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
    isLoadingActiveEntry: boolean;
    isLoadingCategories: boolean;
    isRunning: boolean;
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>
}
export const AppDataContext = React.createContext({} as Value);
interface AppDataProviderProps {
    children: React.ReactNode;
}


export const AppDataProvider: React.FC<AppDataProviderProps> = ({ children }) => {
    const [isLoadingActiveEntry, setLoadingActiveEntry] = React.useState(true);
    const [isLoadingCategories, setLoadingCategories] = React.useState(true);
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [isRunning, setIsRunning] = React.useState(false);

    const [openEntry, setOpenEntry] = React.useState<OpenEntry>({} as OpenEntry)
    React.useEffect(() => {
        getOpenEntries().then((r) => {
            console.log('getting open entries', r)
            if (r.length) {
                setIsRunning(true)
                setOpenEntry(r[0])
            }
        }).finally(() => { setLoadingActiveEntry(false) })
    }, [])
     React.useEffect(() => {
        getCategories().then((c) => {
            setCategories(c)
        }).catch((e) => console.log(e)).finally(() => {
            setLoadingCategories(false)
        })
    }, [])
    const value: Value = {
        openEntry, 
        setOpenEntry, 
        categories, 
        setCategories, 
        isLoadingActiveEntry, 
        isLoadingCategories,
        isRunning,
        setIsRunning
    }
    return (

        <AppDataContext.Provider value={value}>
            {children}
        </AppDataContext.Provider>
    )
}