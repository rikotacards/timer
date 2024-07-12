import { setDoc, updateDoc, deleteDoc, getDocs, doc, addDoc, collection, serverTimestamp, onSnapshot, query, orderBy, where, arrayUnion } from "firebase/firestore";
import { UID, db } from "./firebaseConfig";
import { OpenEntry , Category, AddCategoryRequestBody, Entry as IEntry} from "./types";

export interface Entry {
    desc: string;
    entryId: string;
}
// Current entry should only be 1 existing.
export const AddOpenEntry = async (args: OpenEntry) => {
    console.log('db, addopen', args)
    const created = serverTimestamp();
    const entry = {
        ...args, 
        created,
        startTime: created
    }
    try {
        const docRef = await addDoc(collection(db, "users", UID, "openEntry"), entry)
        return {...entry, entryId: docRef.id}

    } catch (e) {
        alert(e)
    }
}
export const updateOpenEntry = async (args: OpenEntry) => {
    if(!args.entryId){
        throw new Error('No entry ID')
    }
    console.log('update')
    try {
        const docRef = doc(db, "users", UID, "openEntry", args.entryId);
        await updateDoc(docRef, {categories: args.categories, desc: args.desc})
        
        }
       
     catch (e) {
        alert(e)
    }
}



export const getOpenEntries = async () => {
    const querySnapshot = await getDocs(collection(db, "users", UID, "openEntry"));
    const res: OpenEntry[] = [];
    querySnapshot.forEach((doc) => {
        res.push({...doc.data(), entryId: doc.id} as OpenEntry)
    });
    return res
}

export const deleteOpenEntry = async (args: { entryId: string }) => {
    try {
        console.log('deleting openEntry, args')
        await deleteDoc(doc(db, "users", UID, "openEntry", args.entryId))
    } catch(e){
        alert(e)
    }
}

export const addEntry = async (args: Entry) => {
    const {  entryId } = args;
    try {
        const openEntry = await getOpenEntries()
        const {created,startTime} = openEntry[0]
        const docRef = await setDoc(doc(db, "users", UID, "entries", args.entryId), {...args,
            created,
            startTime,
            endTime: serverTimestamp(),
        })
        await deleteOpenEntry({entryId})
        return docRef
    } catch (e) {
        alert(e)
    }
}


export const updateEntry = () => {
    
}

export const deleteEntry = async(args: {entryId: string}) => {
    try {
        console.log('deleting openEntry, args')
        await deleteDoc(doc(db, "users", UID, "entries", args.entryId))
    } catch(e){
        alert(e)
    }
}

export const getEntries = async() => {
    const querySnapshot = await getDocs(collection(db, "users", UID, "entries"));
    const res: OpenEntry[] = [];
    querySnapshot.forEach((doc) => {
        res.push({...doc.data(), entryId: doc.id} as OpenEntry)
    });
    return res
}

// today = new Date();
// sevenDaysAgo = new Date(today); sevenDaysAgo.setDate(today.getDate()-7)
export const getEntriesByDateRange = async({start, end}: {start: Date, end: Date}) => {
    const collRef = collection(db, "users", UID, "entries")
    const q =  query(collRef, where("created", "<=", start ), where("created", '>=', end), orderBy('created', 'desc'))
    const querySnapshot = await getDocs(q);
    const res: IEntry[] = [] 
    if(!querySnapshot){
        return []
    }
    querySnapshot.forEach((doc) => {
        res.push({...doc.data() as IEntry, entryId: doc.id})
    })
    return res;
}
export const getEntriesByDateRangeAndCategories = async({start, end, categoryIds}: {start: Date, end: Date, categoryIds:string[]}) => {
    const collRef = collection(db, "users", UID, "entries")
    const q =  query(collRef, where("created", "<=", start ), where("created", '>=', end), where("categoryIds", "array-contains-any", categoryIds))
    const querySnapshot = await getDocs(q);
    const res: Entry[] = [] 
    if(!querySnapshot){
        return [] as Entry[]
    }
    querySnapshot.forEach((doc) => {
        res.push({...doc.data() as Entry, entryId: doc.id})
    })
    return res;
}

export const getEntriesOnSnapshot = () => {
    const collRef = collection(db, "users", UID, "entries")
    const q = query (collRef, orderBy("created","desc" ));

    const res: Entry[] = []
    const unsub =  onSnapshot(q, (doc) =>{
       doc.forEach((d) => {console.log('d', d.data()); res.push(d.data() as Entry)})})
        return {unsub: unsub, res}
} 
    


// categories
export const addCategory = async(arg: AddCategoryRequestBody) => {
    try {
        if(!arg.categoryName){
            throw new Error("Category name cannot be empty.")
        }
        const docRef = await addDoc(collection(db, "users", UID, "categories"), arg)
        return docRef
    } catch (e) {
        throw new Error('Failed to add category')
    }
}
export const editCategory = async(categoryId: string,arg: Partial<AddCategoryRequestBody> ) => {
    const ref = doc(db, "users", UID, "categories", categoryId)
    try {
        const docRef = await updateDoc(ref, arg)
        return docRef
    } catch (e) {
        throw new Error('Failed to add category')
    }
}
export const deleteCategory = async(categoryId: string) => {
    try {
        await deleteDoc(doc(db, "users", UID, "categories", categoryId))
    } catch(e) {
        alert(e)
    }
}

export const getCategories = async() => {
    const querySnapshot = await getDocs(collection(db, "users", UID, "categories"));
    const res: Category[] = [];
    querySnapshot.forEach((doc) => {
        res.push({...doc.data(), categoryId: doc.id} as Category)
    });
    return res
}
export const addChildToParent = async(parentCategoryId: string, childCategoryId: string) => {
    const docRef = doc(db, "users", UID, "categories", parentCategoryId);
    if(childCategoryId === parentCategoryId){
        throw new Error("Subcategory cannot be same as parent category")
    }
    try {
        await updateDoc(docRef, {
            children: arrayUnion(childCategoryId)
        })
    } catch {
        alert('errror adding sub')
    }
}
interface addSubCategoryArgs {
    parentCategoryId: string, 
    childCategory: AddCategoryRequestBody
}
// does the two things of adding a new category
// use this in frontend ui to add sub category
export const addSubCategory = async(arg: addSubCategoryArgs) => {
    try {
       const childCategory = await addCategory(arg.childCategory);
        await addChildToParent(arg.parentCategoryId, childCategory.id)

    }catch(e){
        alert(e)
    }

}



