import { useStopwatch } from "react-timer-hook";

export const useGetTimeElapsed = (seconds: number) => {
    const curr = new Date()
    const now = new Date().getTime()
    const dif = now - seconds * 1000
    curr.setSeconds(curr.getSeconds() + dif / 1000);

    const { totalSeconds, pause, reset } = useStopwatch({ autoStart: true, offsetTimestamp: curr });
    
    return {
        totalSeconds, 
        pause, 
        reset
    }
}