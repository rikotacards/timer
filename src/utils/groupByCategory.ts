import { Category, Entry } from "../firebase/types";
// const return = [{category: Category, entries: Entry[]}]
export const groupByCategory = (entries: Entry[]) => {
    const categoryIds: {[key: string]: Category[]} = {}; 
    entries.forEach((e) => categoryIds[e.categories?.[0]?.categoryId ||'noCategory'] = e.categories)
}