import { Entry } from "../firebase/types";

// returns in seconds
export const totalTimeInSeconds = (entries: Entry[]) => {
    let totalSeconds = 0;
    entries.forEach((e) => {
        const duration = e.endTime.seconds-e.startTime.seconds;
        totalSeconds = duration + totalSeconds
    })
    return totalSeconds
}