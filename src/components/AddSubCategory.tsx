import { Box, Card, Chip, List, ListItem,  TextField, Typography, } from '@mui/material';
import React from 'react';
import { addSubCategory, getCategories } from '../firebase/db';
import { AddCategoryRequestBody, Category } from '../firebase/types';
import { useAppDataContext } from '../Providers/contextHooks';
// render categories'
interface AddSubCategoryProps {
    setStep: (step: number) => void;
    categoryName: string;
    color: string;
    resetText: () => void;
}
export const AddSubCategory: React.FC<AddSubCategoryProps> = ({ resetText, color, categoryName, setStep}) => {
   const [categories, setCategories] = React.useState<Category[]>([])
   const [searchText, setSearchText] = React.useState('')
   const {triggerRefetch}= useAppDataContext();
   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value.toLocaleLowerCase());
   }
   React.useEffect(() => {
    getCategories().then((res) => {
        if(res){
            setCategories(res)
        }
    })
   },[])
   const categoryIdMap: {[key:string]: Category} = {};
   categories.forEach((c) => {
    categoryIdMap[c.categoryId]= c
   })

   const filtered = searchText === '' ? categories : categories.filter((c) => c.categoryName.toLocaleLowerCase().indexOf(searchText) >=0)
   const displayedCategories = filtered.map((c) => {
    const childCategory: AddCategoryRequestBody = {
        color,
        categoryName,
        parent: c.categoryId,
        children: [],
       }
       const add = async() => {
        try {
            await addSubCategory({parentCategoryId: c.categoryId, childCategory})
            setStep(0)
            resetText()
            triggerRefetch()

        } catch {
            alert('failed to add sub category')
        }
       }
       if(c.parent){
        
        return null
       }
    return (
        <li key={c.categoryId}>
                <ul>

        <ListItem onClick={add}><Chip sx={{background: c.color}} label={c.categoryName}/></ListItem>
        {c.children?.map((c, i) => <ListItem  key={c + i}><Chip sx={{ ml:3, background: categoryIdMap[c]?.color}} label={categoryIdMap[c]?.categoryName}/></ListItem>)}
                </ul>
        </li>
    )

        }
        )
    
   return (
        <Box sx={{p:1, m:1}}>
            <Card variant='outlined' sx={{p:1,mb:1}}>
                <Typography variant='body2'>Add {categoryName} to below category</Typography>
            </Card>
            <TextField fullWidth value={searchText} onChange={onChange} placeholder='Search categories'/>
            <List sx={{
        width: '100%',
        position: 'relative',
        overflow: 'auto',
        '& ul': { padding: 0 },
      }}
      subheader={<li />}>

            {displayedCategories}
            </List>
        </Box>
    )
}