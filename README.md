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
* CREATE entry

   * name
   * start time
   * entry ID
   * start date
   * category ID

* UPDATE entry
* DELETE entry
* CREATE category
* UPDATE category
* DELTE category
* CREATE quick entry
* UPDATE quick entry
* DELTE quick entry
* UPDATE dark mode
* GET all entries


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

## Categories

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

# Todo
* show start - end time in entry
* Figure out how to display and edit nested categories

# Data Visualization
* Total hours of a specific category


* Stats per day, break down of what is recorded per day