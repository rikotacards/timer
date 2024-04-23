import { Alert, Box, Button, Chip } from "@mui/material"
import React from 'react';
import { deleteCategory, getCategories } from "../firebase/db";
import { Category } from "../firebase/types";
import { useSnackbarContext, useTopAppBarContext } from "../Providers/contextHooks";
import { TopAppBar } from "./TopAppBar";
export const EditCategoriesPage: React.FC = () => {
    const [categories, setCategories] = React.useState<Category[]>([])
    const s = useSnackbarContext();
    const top = useTopAppBarContext();
    React.useEffect(() => {
        top.onSetComponent(<TopAppBar title='Edit Categories' enableBack/>)
        getCategories().then((res) => {
            setCategories(res)
        })
    }, [top])
    const displayed = categories.map((c) => {
        const onDelete = async() => {
            s.onSetComponent(<Alert severity='success'>Deleted {c.categoryName}</Alert>)
            await deleteCategory(c.categoryId)

        }
        return (
            <Box sx={{p:0.5, display: 'flex', width: '100%'}}>
               <Chip sx={{background: c.color}} label={c.categoryName}/>
               <Box sx={{marginLeft: 'auto'}}>

               <Button onClick={onDelete} variant='outlined' color='error'>delete</Button>
               </Box>
            </Box>
        )
    })
    return (
        <Box>
                {displayed}
        </Box>
    )
}