import { Alert, Box, Button, Chip, IconButton, Popover, Typography } from '@mui/material'
import React from 'react'
import { AddCircleOutline, MoreVertOutlined } from '@mui/icons-material';

import { Category } from '../firebase/types';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { CategoryEdit } from './CategoryEdit';
import { updateEntryCategory } from '../firebase/db';
import { useSnackbarContext } from '../Providers/contextHooks';
import { useIsNarrow } from '../utils/isMobile';
interface CategoryChipsProps {
    entryId: string;
    entryCategories?: Category[];
    onChipClick: (categoryName: string, categoryId: string) => void;
}
export const CategoryChips: React.FC<CategoryChipsProps> = ({ onChipClick, entryCategories, entryId }) => {
    const s = useSnackbarContext();
    const isNarrow = useIsNarrow();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const open = Boolean(anchorEl);

    const id = open ? 'add-category' : undefined;

    const handleClose = () => {
        setAnchorEl(null);
    };
    const addCategory = async (category: Category) => {
        try {
            await updateEntryCategory({ category, entryId })
            s.onSetComponent(<Alert variant='filled' severity='success'>Category updated</Alert>)
            s.toggleOpen()

        } catch (e) {
            alert(e)
        }

    }
    if (!entryCategories?.length) {
        return (
            <>
                <Button
                    aria-describedby={id}
                    color='primary'
                    sx={{ mr: 1, p: 1 }}
                    size='small'
                    onClick={handleClick}
                    startIcon={<AddCircleOutline />}>
                    <Typography sx={{ textTransform: 'capitalize' }}
                        variant='body2'>Add category</Typography>
                </Button>
                <Popover id={id}
                    anchorEl={anchorEl}
                    open={open}
                    autoFocus
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                    <CategoryEdit entryId={entryId} addCategory={addCategory} onHandleClose={handleClose} />
                </Popover>
            </>
        )
    }

    const displayed = entryCategories.map((c, i) =>
        <Box key={c.categoryId} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Chip sx={{
                textTransform: 'capitalize',
                border: '1px solid transparent',
                borderColor: c.color,
                color: c.color,
                fontWeight: isNarrow ? undefined : 600,
                background: c.color + "34"
            }} size='small' key={c.categoryId} onClick={() => onChipClick(c.categoryName, c.categoryId)} label={c.categoryName} />{i < entryCategories.length - 1 && <ArrowRightIcon />}</Box>)

    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            }}>{displayed}
                <IconButton
                    onClick={handleClick}
                    size='small'>

                    <MoreVertOutlined
                         fontSize='small'
                        color='inherit' />
                </IconButton>
            </Box>
            <Popover id={id}
                anchorEl={anchorEl}
                open={open}
                autoFocus
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <CategoryEdit entryId={entryId} addCategory={addCategory} onHandleClose={handleClose} />
            </Popover>

        </>
    )
}