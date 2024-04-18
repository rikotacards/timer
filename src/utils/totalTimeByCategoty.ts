import {  Entry } from "../firebase/types";
import { groupByDate } from "./groupByDate";

export const totalTimeByCategory = (entries: Entry[], categoryName: string) => {
    const dateGroups = groupByDate(entries);
    console.log(entries)
    const dateStrings = Object.keys(dateGroups);
    const res: {category: string, totalTime: number, date: string}[] = [];  //{date}
    dateStrings.forEach((dateString) => {
        let sum = 0; 
        dateGroups[dateString].entries.forEach((e) => {
            if(e?.categories?.length === 0){
                return
            }
            if(e.categories?.[0].categoryName === categoryName){
                if(e?.endTime?.seconds && e.startTime.seconds){
                    sum = sum + (e?.endTime?.seconds - e.startTime?.seconds)
                }
            }
        
        })
        res.push({category: categoryName, totalTime: sum / 60/60 , date: dateString})
    })
    return res



}