import { Box, Button, Chip, List, ListItemButton, Paper, TextField, Typography } from '@mui/material';
import React from 'react';
import { Category } from '../firebase/types';
import { CreateNewCategory } from './CreateNewCategory';
import { useAppDataContext } from '../Providers/contextHooks';





interface CategoryEdit {
  onHandleClose: () => void;
  addCategory: (category: Category) => void;
}
export const CategoryEdit: React.FC<CategoryEdit> = ({ onHandleClose, addCategory }) => {
  const { categories } = useAppDataContext();

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
    <Box sx={{ position: 
    'relative', display: 'flex',
     flexDirection: 'column', 
     p: 0, maxWidth: 400, 
     height: '300px',
     overflow: 'scroll'
     }}>
      <Paper
      elevation={5}
        sx={{p:1, zIndex: 10, position: 'sticky', top: 0 }}

      >

        <TextField
          autoFocus={true}
          onChange={onChange}
          size='small'
          placeholder='Search category' />
      </Paper>

      <List sx={{p:1, display: 'flex', 
        flexDirection: 'column', 

        }}>

        {filtered.map((c) => <ListItemButton
          key={c.categoryId}
          onClick={() => { addCategory(c); onHandleClose() }} >
          <Chip key={c.categoryId} sx={{
        border: '1px solid transparent',
        borderColor: c.color,
        color: c.color,
        fontWeight:600,
        background: c.color+"34",
        mr:1
    }} label={c.categoryName} /></ListItemButton>)}
      </List>

      {
        !filtered.length && <Button onClick={toggleOpenCreateNew} sx={{ textTransform: 'capitalize' }}>Create category for {inputText}</Button>
      }


      <Typography variant='caption'>Edit categories</Typography>

    </Box >

  )
}