// If category has children, we want to flatten it
// used for charting
// used for if a child category has a parent, we want to do 
// [parentCategory, childCategory]

import { Category } from "../firebase/types";

// then we can put this into firebase
export const flattenWithChildren = (category: Category): Category['categoryId'][] => {
   const res = [category.categoryId]; 
if(category?.children?.length){
    category.children.forEach((c) => {
        res.push(c)
    })
}
   return res

}