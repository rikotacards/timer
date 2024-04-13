import React from 'react';
import { getCategories, getEntries, getOpenEntries } from '../firebase/db';
import { Category, OpenEntry } from '../firebase/types';
import { IS_OFFLINE } from '../App';
import { mockEntries } from '../mocks/mockEntries';
interface Value {
    openEntry: OpenEntry;
    setOpenEntry: React.Dispatch<React.SetStateAction<OpenEntry>>;
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
    isLoadingActiveEntry: boolean;
    isLoadingCategories: boolean;
    isRunning: boolean;
    entries: OpenEntry[];
    isLoadingEntries: boolean;
    disableBackButton: () => void;
    activateBackButton: () => void;
    enableBackButton: boolean;
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
    const [entries, setEntries] = React.useState([] as OpenEntry[])
    const [isLoadingEntries, setIsLoadingEntries]= React.useState(true);
    const [openEntry, setOpenEntry] = React.useState<OpenEntry>({} as OpenEntry)
    const [enableBackButton, setEnableBackButton] = React.useState(false);
    const activateBackButton = () => {
        setEnableBackButton(true)
    }
    const disableBackButton = () => {
        setEnableBackButton(false)
    }
    React.useEffect(() => {
        if(IS_OFFLINE){
            setEntries(mockEntries)
            setIsLoadingEntries(false)
            return
        }
        getEntries().then((r) => {
            if (r.length) {
                setIsLoadingEntries(true)
                setEntries(r)
            }
        }).finally(() => { setIsLoadingEntries(false) })
        getOpenEntries().then((r) => {
            if (r.length) {
                setIsRunning(true)
                setOpenEntry(r[0])
            }
        }).finally(() => { setLoadingActiveEntry(false) })
    }, [])
     React.useEffect(() => {

        if(IS_OFFLINE){
            return
        }
        getCategories().then((c) => {
            setCategories(c)
        }).catch((e) => console.log(e)).finally(() => {
            setLoadingCategories(false)
        })
    }, [])
    const value: Value = {
        openEntry, 
        disableBackButton,
        activateBackButton,
        enableBackButton,
        setOpenEntry, 
        categories, 
        setCategories, 
        isLoadingActiveEntry, 
        isLoadingCategories,
        isRunning,
        entries,
        isLoadingEntries,
        setIsRunning
    }
    return (

        <AppDataContext.Provider value={value}>
            {children}
        </AppDataContext.Provider>
    )
}