import { OpenEntry } from "../firebase/types";
import { groupByDate } from "./groupByDate";

export const totalTimeByCategory = (openEntries: OpenEntry[], categoryName: string) => {
    const dateGroups = groupByDate(openEntries);
    const dateStrings = Object.keys(dateGroups);
    const res: number[] = [];  //{date}
    dateStrings.forEach((dateString) => {
        let sum = 0; 
        dateGroups[dateString].entries.forEach((e) => {
            if(e?.categories?.length === 0){
                return
            }
            if(e.categories?.[0].categoryName === categoryName){
                if(e?.endTime?.seconds){
                    sum = sum + (e?.endTime?.seconds - e.startTime?.seconds)
                }
            }
        
        })
        res.push(sum)
    })
    return res



}