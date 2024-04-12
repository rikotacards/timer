import { OpenEntry } from "../firebase/types";

export const groupByDate = (openEntries: OpenEntry[]):{[key:string]: {date: Date, entries: OpenEntry[]}} => {
    const dateGroups: {[key:string]: {date: Date, entries: OpenEntry[]}} = {}
   console.log('o', openEntries)
    openEntries.forEach((o) => {
        if(!o.startTime){
            console.log('node')
            return []
        }
        const date = new Date (o.startTime.seconds * 1000)
        console.log('date', date)
        const month = date.getMonth() + 1; // Months are zero-indexed, so add 1
        const day = date.getDate();
        const year = date.getFullYear();

        const dateKey = `${month}/${day}/${year}`
      
 
        if(dateGroups[dateKey]){
            dateGroups[dateKey].entries.push(o)
        } else {
            dateGroups[dateKey] = {date: date, entries: [o]}
         

        }
    })
    return dateGroups
}