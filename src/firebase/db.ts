import { setDoc, updateDoc, deleteDoc, getDocs, doc, addDoc, collection, serverTimestamp, DocumentData, DocumentReference, onSnapshot } from "firebase/firestore";
import { UID, db } from "./firebaseConfig";
import { OpenEntry , Category} from "./types";

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
        await updateDoc(docRef, {categories: args.categories})
        
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
    console.log('getting entries', res)
    return res
}
export const getEntriesOnSnapshot = () => {
    const res: Entry[] = []
    const unsub =  onSnapshot(collection(db, "users", UID, "entries"), (doc) =>{
       doc.forEach((d) => {console.log('d', d.data()); res.push(d.data() as Entry)})})
       console.log(res)
        return {unsub: unsub, res}
} 
    


// categories
export const addCategory = async(arg: Category) => {
    try {
        if(!arg.categoryName){
            throw new Error("Category name cannot be empty.")
        }
        const docRef = await addDoc(collection(db, "users", UID, "categories"), arg)
        console.log('add category', arg)
        return docRef
    } catch (e) {
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

export const updateCategory = () => {

}
