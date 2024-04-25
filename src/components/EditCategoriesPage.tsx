import { Alert, Box } from "@mui/material"
import React from 'react';
import { deleteCategory, getCategories } from "../firebase/db";
import { Category } from "../firebase/types";
import { useSnackbarContext, useTopAppBarContext } from "../Providers/contextHooks";
import { TopAppBar } from "./TopAppBar";

import { EditCategoryRow } from "./EditCategoryRow";
export const EditCategoriesPage: React.FC = () => {
    const [categories, setCategories] = React.useState<Category[]>([])
    const s = useSnackbarContext();
    const top = useTopAppBarContext();
   
   
    React.useEffect(() => {
        top.onSetComponent(<TopAppBar title='Edit Categories' enableBack/>)
        getCategories().then((res) => {
            setCategories(res)
        })
    }, [])
    const displayed = categories.map((c) => {
        const onDelete = async() => {
            s.onSetComponent(<Alert severity='success'>Deleted {c.categoryName}</Alert>)
            await deleteCategory(c.categoryId)

        }
        return (
         <EditCategoryRow onDelete={onDelete} category={c}/>
        )
    })
    return (
        <Box>
                {displayed}
        </Box>
    )
}