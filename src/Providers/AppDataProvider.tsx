import React from 'react';
import { getCategories, getEntries, getOpenEntries, getOpenEntriesRealTime } from '../firebase/db';
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
    triggerRefetch: () => void;
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
    const [refetch, setRefetch] = React.useState(false);

    const [isLoadingEntries, setIsLoadingEntries]= React.useState(true);
    const [openEntry, setOpenEntry] = React.useState<OpenEntry>({} as OpenEntry)
    const [enableBackButton, setEnableBackButton] = React.useState(false);
    const activateBackButton = () => {
        setEnableBackButton(true)
    }
    const triggerRefetch = () => {
        setRefetch(!refetch)
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
        // getEntries().then((r) => {
        //     if (r.length) {
        //         setIsLoadingEntries(true)
        //         setEntries(r)
        //     }
        // }).finally(() => { setIsLoadingEntries(false) })
        // getOpenEntries().then((r) => {
        //     if (r.length) {
                // setIsRunning(true)
        //         setOpenEntry(r[0])
        //     }
        // }).finally(() => { setLoadingActiveEntry(false) })
       const unsub = getOpenEntriesRealTime(setOpenEntry, setIsRunning)
       return () => unsub()
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
    }, [refetch])
    const value: Value = {
        openEntry, 
        triggerRefetch,
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