import {  Box, Chip, ListItem, TextField, Typography } from '@mui/material';
import React from 'react';
import { CategoryNewForm } from './CategoryNewForm';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

interface CategoryOption {
    label: string;
    inputValue?: string;
    child?: string
  }

const existingCategories: CategoryOption[] = [{label: 'study', child: ''}, {label: 'physics', child: ''}]

const filter = createFilterOptions<CategoryOption>();

export const CategoryEdit: React.FC = () => {
    const [value, setValue] = React.useState<CategoryOption | null>(null);

    
    return (
        <Box sx={{display: 'flex', flexDirection: 'column', p:1}}>
            <Typography sx={{p:1, fontWeight: 'bold'}}>Add a category</Typography>
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
              renderOption={(props, option) => <ListItem {...props} >{option.label}</ListItem>}

              renderInput={(params) => (
                <TextField  placeholder='Search/create new category' {...params}  />
              )}
              options={existingCategories}
             onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                  setValue({
                    label: newValue,
                  });
                } else if (newValue && newValue.inputValue) {
                  // Create a new value from the user input
                  setValue({
                    label: newValue.inputValue,
                  });
                } else {
                  setValue(newValue);
                }
              }}
            value={value}

            />
            <CategoryNewForm/>
            <div>

            <Chip label='Study'/>
            <Chip label='Physics'/>
            <Chip label='Work'/>
            <Chip label='Work'/>

            </div>
     <Typography variant='caption'>Edit</Typography>

        </Box >
    )
}