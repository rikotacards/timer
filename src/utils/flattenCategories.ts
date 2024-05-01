// used for if a child category has a parent, we want to do 
// [parentCategory, childCategory]

import { Category } from "../firebase/types";

// then we can put this into firebase
export const flattenCategories = (entryCategories: Category[], categories: Category[]) => {
   
    const categoryIdMap: {[key:string]: Category} = {};
    categories.forEach((c) => {
        categoryIdMap[c.categoryId]= c
    })
    const res: Category[] = []; 
    entryCategories.forEach((c) => {
        if(c.parent){
            res.push(categoryIdMap[c.parent])
        }
        res.push(c)
    })
    return res
}