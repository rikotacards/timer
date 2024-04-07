import { AppBar, Box,  Chip, TextField, Typography } from '@mui/material';
import React from 'react';
import { CategoryNewForm } from './CategoryNewForm';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Category } from '../firebase/types';
import {  getCategories } from '../firebase/db';
import { CreateNewCategory } from './CreateNewCategory';

interface CategoryOption {
  label: string;
  inputValue?: string;
  child?: string
}


const existingCategories: CategoryOption[] = [{ label: 'study', child: '' }, { label: 'physics', child: '' }, { label: 'Leetcode', child: '' }, { label: 'work', child: '' }]

const filter = createFilterOptions<CategoryOption>();
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
  const [value, setValue] = React.useState<CategoryOption | null>(null);
  const [openCreateNew, setCreateNew] = React.useState(false);
  const toggleOpenCreateNew = () => {
    setCreateNew(!openCreateNew)
  }

 if(openCreateNew){
  return <CreateNewCategory onHandleClose={onHandleClose} onCancel={toggleOpenCreateNew} categoryName={value?.label}/>
 }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 1 , maxWidth:400}}>

      <Typography sx={{ p: 1, fontWeight: 'bold' }}>Add a category</Typography>

      <Autocomplete
        size='small'
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue } = params;
          // Suggest the creation of a new value
          const isExisting = options.some((option) => inputValue === option.label);
          if (inputValue !== '' && !isExisting) {
            filtered.push({
              inputValue,
              label: `Add "${inputValue}"`,
            });
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        freeSolo

        renderOption={(props, option) => <li {...props} ><Chip label={option.label} /></li>}
        renderInput={(params) => (
          <TextField placeholder='Search/create new category' {...params} />
        )}
        autoComplete
        options={existingCategories}
        onChange={async (event, newValue) => {
          console.log(newValue)
          if (typeof newValue === 'string') {
            setValue({
              label: newValue,
            });
            toggleOpenCreateNew()
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setValue({
              label: newValue.inputValue,
            });
            toggleOpenCreateNew()
          } else {
            // existing value
            setValue(newValue);
            onHandleClose();
          }
        }}
        value={value}

      />
      <Box sx={{ mt: 1, mb: 1 }}>
      
        {categories.map((c) => <Chip onClick={()=>{addCategory(c)}} key={c.categoryId} sx={{background: c.color}}  label={c.categoryName} />)}

      </Box>


      <Typography variant='caption'>Edit categories</Typography>

    </Box >
  )
}