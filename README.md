# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list


## Endpoints needed
* CREATE entry [done]

   * name
   * start time
   * entry ID
   * start date
   * category ID

* UPDATE entry
* DELETE entry [done]
* CREATE category
* UPDATE category
* DELTE category
* CREATE quick entry
* UPDATE quick entry
* DELTE quick entry
* UPDATE dark mode
* GET all entries [done]


* Categories Table
* Entries Table


## Description
On Clockify, 
* When starting new timer, click start, starts
* There is no pause, there is only stop. 
* Each time you stop, a new entry is created.

When you click "start" from an existing entry, the time there doesn't move

We start a new one at the top. 

# Firebase Storage Schema

users/{uid}/entries/{entryId}
users/{uid}/categories/{categoryId}


1. user starts first timer from new entry form, pressing start adds to currentEntry in the db
2. Pressing stop, deletes this currEntry, before we delete, we take this entry ID, and details, and adds it into the entries table 

# Categories

Each entry can only have 1 category

```
{
  categoryName: "activity"
  categoryId: "123"
  children: ["1", "2"] //id1, id2
}
```

User Journey of Adding Categories

Add category, Activity
2. User can decide to add parent or child
3. Decides to add child. 

When rendering, if I only selected a parent category, we would onlyrender this. 

Showing category in an Entry
Essentailly, only render current category, and parents
If I selected "Running", then we would show 
"Activity" -> "Running"

if I only selected "Activity", then we show "Activity" -> "General"

### Rendering out category selection
* I can get a list of all categories 
```js
const category = {
  categoryName: '', 
  categoryId: '', 
  parentIds: [1,2,3], 
  childrenIds: [4,5,6]
  }
```

Firebase Schema
```js
{
  categoryId: {
    categoryName: '',
    parents: {},
    children: ['email']
  }
}
```
emails 
composing
activity
running
tennis
coding
work

From Firebase, categories is going to be a flat list, that is retreived once for example: 
```js
[
  {
    categoryName: 'work'
    children: []
  },
  {
    categoryName: 'coding'
    children: [],
  },
  {
    categoryName: 'email',
    children: [],
  }
]
```
## Categories in Firebase
```js
// Snapshot 1, create one parent category. Children and parent will be empty.
{
  categoryId: {
    categoryName: 'work',
    children: [],
    parent: undefined,
  }, 
}
// snapshot 2, in the Category UI, in the parent category, create a sub category: 
// 1. We create a new entry in the category, with the parent ID
// 2. we update the parent category with the child ID
{
  categoryId: {
    categoryName: 'work',
    children: [], // push child ID
    parent: undefined,
  }, 
  childCategory: {
    categoryName: 'email',
    children: [],
    parent: 'categoryId',
  }, 
}

// Create a new parent, to move childCategory to newParent
{
  categoryId: {
    categoryName: 'work',
    children: [], // push child ID
    parent: undefined,
  }, 
  childCategory: {
    categoryName: 'email',
    children: [], // children cannot contain parentID
    parent: 'categoryId',
  }, 
  newParent: {
    categoryName: 'newParent',
    children: [],
    parent: undefined,
  }, 
// move child category to parent
// 1. Go check the parent, remove the child
// 2. update new parent
// 3. Go to new parent, add child
}
const entry = {
  category: 'email'
}
```
## Actions with Categories
* Create new parent category

## What happens to Entries when you delete a category
1. GET all entries by category
2. Remove that category from all entries

## Deleting a child category
1. You'll already get the parent ID from the child category
2. GET parent node
3. Remove child ID from the parent
4. Remove child node from table

## Deleting a parent category
Should delete all children

1. map through all children
2. for each child, do Delete a child category
3. Then do What happens to entries when you delete a category




## Creating Category UI
1. You can either create a parent category
2. You can create a child category under existing parent categories.

# Todo
* show start - end time in entry
* Figure out how to display and edit nested categories

# Data Visualization
* Total hours of a specific category


* Stats per day, break down of what is recorded per day