import { Box, Card, Chip, TextField, Typography } from '@mui/material';
import React from 'react';
import { CategoryNewForm } from './CategoryNewForm';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Category } from '../firebase/types';
import {  getCategories } from '../firebase/db';

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
    })
  })
  const [value, setValue] = React.useState<CategoryOption | null>(null);

  const [open, setOpen] = React.useState(false);
  const toggleOpen = () => {
    setOpen(!open);
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
            toggleOpen()
          } else if (newValue && newValue.inputValue) {
            // Create a new value from the user input
            setValue({
              label: newValue.inputValue,
            });
            toggleOpen()
          } else {
            // existing value
            setValue(newValue);
            onHandleClose();
          }
        }}
        value={value}

      />
      <Box sx={{ mt: 1, mb: 1 }}>
      
        {open && <CategoryNewForm onHandleClose={onHandleClose} categoryName={value?.label || ""} />}
        {categories.map((c) => <Chip onClick={()=>{addCategory(c)}} key={c.categoryId} sx={{background: c.color}}  label={c.categoryName} />)}

      </Box>


      <Typography variant='caption'>Edit categories</Typography>

    </Box >
  )
}