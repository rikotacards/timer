import { OpenEntry } from "../firebase/types";

export const getEntryDurations = (openEntries: OpenEntry[]) => {
    return openEntries.map((e) => ({...e, created: new Date(e.created.seconds *1000), duration:( (e.endTime?.seconds || 0)-e.startTime.seconds)/60/60 }))
}

export const getDuration = () => {
    
}