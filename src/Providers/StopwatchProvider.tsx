import React from 'react';
import { useStopwatch } from 'react-timer-hook';
interface StopwatchResult {
    totalSeconds: number;
    seconds: number;
    minutes: number;
    hours: number;
    days: number;
    isRunning: boolean;
    start: () => void;
    pause: () => void;
    reset: (offsetTimestamp?: Date, autoStart?: boolean) => void;
}
export const StopwatchContext = React.createContext<StopwatchResult>({} as StopwatchResult)
interface StopwatchProviderProps {
    children: React.ReactNode;
}
export const StopwatchProvider: React.FC<StopwatchProviderProps> = ({children}) => {
    const stopwatch = useStopwatch({ autoStart:false })
    const value = {...stopwatch}

    return (
        <StopwatchContext.Provider value={value}>
            {children}
        </StopwatchContext.Provider>
    )
}