import { OpenEntry } from "../firebase/types";
const today = new Date()
const later = new Date()
export const mockEntries: OpenEntry[] = [
    {
        entryId: '0',
        desc: 'Going to tokyo by HK Express',
        created: { nanoseconds: 0, seconds: today.getSeconds() },
        startTime: { nanoseconds: 0, seconds: today.getSeconds() },
        endTime: { nanoseconds: 0, seconds: later.getSeconds() + 100 },
        categories: [{ categoryName: 'Travel', color: 'blue', categoryId: '0' }, { categoryName: 'Plane', color: '', categoryId: '7' }]
    },
    {
        entryId: '',
        desc: 'Going to airport',
        created: { nanoseconds: 0, seconds: today.getSeconds() },
        startTime: { nanoseconds: 0, seconds: today.getSeconds() },
        endTime: { nanoseconds: 0, seconds: later.getSeconds() + 1000 },
        categories: [{ categoryName: 'Travel', color: '', categoryId: '1' }, { categoryName: 'Subway', color: '', categoryId: '6' }]
    },
    {
        entryId: '',
        desc: 'Walk around fish market',
        created: { nanoseconds: 0, seconds: today.getSeconds() },
        startTime: { nanoseconds: 0, seconds: today.getSeconds() },
        endTime: { nanoseconds: 0, seconds: later.getSeconds() + 1000 },
        categories: [{ categoryName: 'Work', color: '', categoryId: '2' }, { categoryName: 'Timer', color: '', categoryId: '5' }]
    },
    {
        entryId: '',
        desc: 'Eating sushi with dad',
        created: { nanoseconds: 0, seconds: today.getSeconds() },
        startTime: { nanoseconds: 0, seconds: today.getSeconds() },
        endTime: { nanoseconds: 0, seconds: later.getSeconds() + 1000 },
        categories: [{ categoryName: 'Work', color: '', categoryId: '3' }]
    },
    {
        entryId: '',
        desc: 'Work on mobile layout',
        created: { nanoseconds: 0, seconds: today.getSeconds() },
        startTime: { nanoseconds: 0, seconds: today.getSeconds() },
        endTime: { nanoseconds: 0, seconds: later.getSeconds() + 1000 },
        categories: [{ categoryName: 'Work', color: '', categoryId: '09' }]
    }, {
        entryId: '',
        desc: 'Walk to shibuya',
        created: { nanoseconds: 0, seconds: today.getSeconds() },
        startTime: { nanoseconds: 0, seconds: today.getSeconds() },
        endTime: { nanoseconds: 0, seconds: later.getSeconds() + 1000 },
        categories: [{ categoryName: 'Work', color: '', categoryId: '10' }]
    }, {
        entryId: '',
        desc: 'Testing mobile',
        created: { nanoseconds: 0, seconds: today.getSeconds() },
        startTime: { nanoseconds: 0, seconds: today.getSeconds() },
        endTime: { nanoseconds: 0, seconds: later.getSeconds() + 110 },
        categories: [{ categoryName: 'Work', color: '', categoryId: '9' }]
    }
]