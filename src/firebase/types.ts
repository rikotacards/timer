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
    categoryIds?: string[]
}

export interface Entry {
    entryId: string; 
    desc: string;
    endTime: FirebaseTimeStamp;
    created: FirebaseTimeStamp;
    startTime: FirebaseTimeStamp;
    categories: Category[];
    categoryIds: string[]
}

export interface Category {
    categoryName: string;
    children?: string[];
    parent?: string;
    color: string;
    categoryId: string;
}

export interface AddCategoryRequestBody {
    categoryName: string;
    children?: string[];
    parent?: string;
    color: string;
}

