interface FirebaseTimeStamp {
    nanoseconds: number;
    seconds: number;
}
export interface OpenEntry {
    entryId?: string; 
    desc: string;
    endTime?: FirebaseTimeStamp | null;
    created: FirebaseTimeStamp;
    startTime: FirebaseTimeStamp;
    categories: Category[];
}

export interface Category {
    categoryName: string;
    child?: string;
    parent?: string;
    color: string;
    categoryId: string;
}