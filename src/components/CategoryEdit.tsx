import { AppBar, Box, Button, Chip, Input, List, ListItem, ListItemButton, TextField, Typography, useAutocomplete } from '@mui/material';
import React from 'react';
import { CategoryNewForm } from './CategoryNewForm';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Category } from '../firebase/types';
import { getCategories } from '../firebase/db';
import { CreateNewCategory } from './CreateNewCategory';

interface CategoryOption {
  label: string;
  inputValue?: string;
  child?: string
}



interface CategoryEdit {
  onHandleClose: () => void;
  addCategory: (category: Category) => void;
}
export const CategoryEdit: React.FC<CategoryEdit> = ({ onHandleClose, addCategory }) => {
  const [categories, setCategories] = React.useState<Category[]>([]);
  React.useEffect(() => {
    getCategories().then((c) => {
      setCategories(c)
    }).catch((e) => console.log(e))
  }, [])

  const [inputText, setInputText] = React.useState('')
  const filtered = categories.filter((cat) => cat.categoryName.indexOf(inputText) >= 0)
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }
  const [openCreateNew, setCreateNew] = React.useState(false);
  const toggleOpenCreateNew = () => {
    setCreateNew(!openCreateNew)
    if (openCreateNew) {
      setInputText('')
    }
  }

  if (openCreateNew) {
    return <CreateNewCategory onHandleClose={onHandleClose} onCancel={toggleOpenCreateNew} categoryName={inputText} />
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 1, width: 400 }}>

      <Typography sx={{ p: 1, fontWeight: 'bold' }}>Add a category</Typography>
      <TextField autoFocus onChange={onChange} size='small' placeholder='Add/create category' />

      <List>

        {filtered.map((c) => <ListItemButton onClick={() => { addCategory(c) }} ><Chip onClick={() => { addCategory(c) }} key={c.categoryId} sx={{ background: c.color, mb: 1 }} label={c.categoryName} /></ListItemButton>)}
      </List>

      {
        !filtered.length && <Button onClick={toggleOpenCreateNew} sx={{ textTransform: 'capitalize' }}>Create category for {inputText}</Button>
      }


      <Typography variant='caption'>Edit categories</Typography>

    </Box >
  )
}