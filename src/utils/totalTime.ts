import { Entry } from "../firebase/types";

// returns in seconds
export const totalTimeInSeconds = (entries: Entry[]) => {
    let totalSeconds = 0;
    entries.forEach((e) => {
        if(!e.endTime?.seconds){
            return 0
        } 
        const duration = (e.endTime.seconds|| 0)-e.startTime.seconds;
        totalSeconds = duration + totalSeconds
    })
    return totalSeconds
}