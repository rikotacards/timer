import { Alert, AppBar, Box, Button, Card, Chip, IconButton, Paper, TextField, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useAppDataContext, useDrawerContext, useSnackbarContext } from '../Providers/contextHooks';
import { AddOpenEntry, updateOpenEntry } from '../firebase/db';
import { Category, OpenEntry } from '../firebase/types';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { IS_OFFLINE } from '../App';
import { AddNewCategory } from './AddNewCategory';
import { AddSubCategory } from './AddSubCategory';
import { CategoryList } from './CategoryList';
import { flattenCategories } from '../utils/flattenCategories';
const mockCategories = [{
    categoryName: 'work',
    color: '',
    categoryId: '1'
}, {
    categoryName: 'Travel',
    color: 'blue',
    categoryId: '2'

}, {
    categoryName: 'Walk',
    color: '',
    categoryId: '3'

}, {
    categoryName: 'Clean',
    color: 'blue',
    categoryId: '4'

}]
export const AddEntryNarrow: React.FC = () => {
    const s = useSnackbarContext();
    const [currStep, setCurrStep] = React.useState(0)

    const setStep = (step: number) => {
        setCurrStep(step)
    }
    const back = () => {
        if (currStep > 0) {

            setCurrStep(currStep - 1)
            resetText();
        }
    }

    const { toggleOpen } = useDrawerContext();
    const { openEntry, setOpenEntry, categories } = useAppDataContext();
    console.log(categories)
    const [categoryText, setCategoryText] = React.useState('');
    const [color, setColor] = React.useState('')
    const onCatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryText(e.target.value);
        e.preventDefault()
    }
    const resetText = () => {
        setCategoryText('')
    }
    const [selectedCategory, setSelectedCategory] = React.useState<string | undefined>()
    const desc = React.useRef<HTMLInputElement>(null)

    const selectCategory = (categoryName: string) => {
        setSelectedCategory(categoryName)
    }
    const filtered = (IS_OFFLINE ? mockCategories : categories).filter((cat) => cat.categoryName.indexOf(categoryText) >= 0)
    console.log(categories, 'filtered', filtered, 'categorytext', categoryText)
    const onStart = async () => {
        s.onSetComponent(<Alert variant='filled' severity='success'>Logging started</Alert>)
        s.toggleOpen();



        try {
            toggleOpen();
            const ref = await AddOpenEntry({ ...openEntry, desc: desc?.current?.value || '' })
            if (ref) {
                console.log('adding open entry', ref)
                setOpenEntry(ref as unknown as OpenEntry)
            }
        } catch (e) {
            alert(e)
        }
    }
    const addCategory = (category: Category) => {
        console.log('category added to UI', category.categoryName)
        setSelectedCategory(category.categoryName)
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const flattened = flattenCategories([category], categories)
        const categoryIds = flattened.map((c) => c.categoryId)
        setOpenEntry((p) => ({ ...p, categories: flattened, categoryIds }))

        if (openEntry && openEntry.entryId) {
            console.log('setting', openEntry)
            updateOpenEntry({ ...openEntry, categories: flattened, categoryIds })
        }
    }

    const addNewEntryForm = (<Box sx={{ p: 1, display: 'flex', flexDirection: 'column', height: '100%', overflowX: 'hidden' }}>

        <TextField
            value={categoryText}
            onChange={onCatChange}
            size='small'
            fullWidth
            placeholder='Search categories' />
        {(categoryText.length === 0 ? categories : filtered).length === 0 &&
            <Box sx={{ p: 1, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <Card sx={{ width: '100%', p: 2, textAlign: 'center' }}>
                    <Typography sx={{ mb: 1 }} variant='body2'>{categoryText} does not exist</Typography>
                    <Button sx={{ mb: 1 }} variant='contained' fullWidth onClick={() => setCurrStep(1)}>Add New</Button>
                    <Button variant='contained' fullWidth onClick={() => resetText()}>Go Back</Button>
                    <Typography sx={{ mb: 1 }} variant='caption'>or continue below to add entry without category</Typography>

                </Card>
            </Box>}

        <Box sx={{ overflow: 'hidden', overflowY: 'scroll', width: '100%', alignItems: 'flex-start', m: 1, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
            <CategoryList selectedCategory={selectedCategory}
                categoryInput={categoryText}
                addCategory={addCategory}
                categories={filtered} />
        </Box>

        <Box sx={{ position: 'sticky', bottom: '0', p: 1, width: '100%' }}>
            <Paper sx={{ p: 0.5 }} elevation={10}>


                <TextField inputRef={desc} size='small' margin='dense' fullWidth placeholder='What are you working on?' />
                <Button color='success' size='large' onClick={onStart} variant='contained' sx={{ mt: 1 }} fullWidth>Start</Button>
            </Paper>
        </Box>
    </Box>
    )
    const steps = [addNewEntryForm,
        <AddNewCategory selectCategory={selectCategory} resetText={resetText} color={color} setColor={setColor}
            category={categoryText} setStep={setStep} />,
        <AddSubCategory resetText={resetText} categoryName={categoryText} color={color} setStep={setStep} />]

    return <Box sx={{ height: '100%', flexDirection: 'column' }}>
        <AppBar>
            <Toolbar>
                {currStep !== 0 && <IconButton onClick={back} size='small'><ArrowBackIosNewIcon /></IconButton>}
                <Typography fontWeight={'bold'}>Add Activity</Typography><IconButton sx={{ ml: 'auto' }} onClick={toggleOpen}><KeyboardArrowDownIcon /></IconButton>
            </Toolbar>
        </AppBar>
        <Toolbar />
        {steps[currStep]}

    </Box>


}