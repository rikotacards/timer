import {  Entry } from "../firebase/types";
// const return = [{category: Category, entries: Entry[]}]

// first iteration, since we are grouping by first seen ID
// However, an entry can have multiple categoryIDs.

export const groupEntriesByCategoryId = (entries: Entry[]) => {
  const res: {[key: string]: Entry[]} = {}; 
  entries.forEach((e) => {
    const categoryId = e.categories?.[0]?.categoryId || 'NA'
    if(res[categoryId]){
        res[categoryId].push(e)
    } else {
        res[categoryId] = [e]
    }
  })
return res

}