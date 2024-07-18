import { Alert, Box, Button, Card, IconButton, Popover, TextField, Tooltip, Typography } from '@mui/material';
import React from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { MoreVertOutlined } from '@mui/icons-material';
import { CategoryEdit } from './CategoryEdit';
import { OpenEntry } from '../firebase/types';
import { deleteEntry, updateEntry } from '../firebase/db';
import { formatTime } from '../utils/formatTime';
import { useDrawerContext, useSnackbarContext, useTopAppBarContext } from '../Providers/contextHooks';
import { MoreMenuNarrow } from './MoreMenuNarrow';
import { useNavigate } from 'react-router';
import { CategoryTopAppBar } from './CategoryTopAppBar';
import { CategoryChips } from './CategoryChips';
import { StartTimeEndTime } from './StartTimeEndTime';
import { useIsNarrow } from '../utils/isMobile';
export const EntryNarrow: React.FC<OpenEntry & { hideTimestamp: boolean }> = ({
    hideTimestamp,
    desc,
    entryId,
    startTime,
    endTime,
    categories
}) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const snackbar = useSnackbarContext();
    const isNarrow = useIsNarrow();
    const [isEdit, setIsEdit] = React.useState(false);
    const drawerContext = useDrawerContext()
    const { onSetComponent } = useTopAppBarContext();
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const nav = useNavigate();
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [newText, setNewNext] = React.useState(desc);


    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewNext(e.target.value);
    }

    const onUpdate = async (args: { desc: string, entryId: string, categories?: string[] }) => {
        setIsEdit(false);
        try {
            if (args.desc !== desc) {
                await updateEntry(args)
                snackbar.onSetComponent(<Alert variant='filled' severity='success'>Updated</Alert>)
                snackbar.toggleOpen()
            }
        } catch (e) {
            alert(e)
            snackbar.onSetComponent(<Alert severity='error'>Error updating</Alert>)
            snackbar.toggleOpen()

        }
    }


    const onDelete = async () => {
        entryId && await deleteEntry({ entryId })
        handleClose()
        snackbar.onSetComponent(<Alert variant='filled' severity='success'>Deleted entry</Alert>)
        snackbar.toggleOpen();

    }
    const component = {
        'simple-popover': <CategoryEdit entryId={entryId || ''} addCategory={() => { }} onHandleClose={handleClose} />,
        'more': <Button color='error' size='small' onClick={onDelete} >Delete</Button>
    }
    const onChipClick = React.useCallback((categoryName: string, categoryId: string) => {
        onSetComponent(<CategoryTopAppBar />)
        nav(`/stats/${categoryName}`, { state: { categoryId: categoryId } })
    }, [nav, onSetComponent])


    const onMoreClick = () => {
        drawerContext.onSetAnchor('bottom');
        drawerContext.onSetComponent(<MoreMenuNarrow handleClose={drawerContext.toggleOpen} onDelete={onDelete} />)
        drawerContext.toggleOpen()
    }
    if (!endTime?.seconds || !startTime?.seconds) {
        return null
    }
    const formattedDuration = endTime?.seconds ? formatTime(endTime?.seconds - startTime?.seconds) : '00:00:00'
    const splitFormattedDuration = formattedDuration.split(':')

    const open = Boolean(anchorEl);
    const id = open ? anchorEl?.id === 'more' ? 'more' : 'simple-popover' : undefined;



    return <div >




        <Card elevation={2} sx={{ mb: 1, width: '100%', p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'left' }}>


            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>

                <Box sx={{ display: 'flex', flexDirection: 'column' }}>

                    {!isEdit ? 
                    <div onClick={() => setIsEdit(true)}>{
                        <Typography variant={isNarrow? 'body2' : 'body1'} fontWeight={isNarrow ? undefined : 'bold'}>{newText}</Typography>}</div> :
                        <TextField
                            fullWidth
                            autoFocus
                            inputProps={{
                                style: {
                                    padding: 0,
                                    fontWeight: 600
                                }
                            }}
                            sx={{ display: 'flex', p: 0, m: 0, border: isEdit ? undefined : 'none', "& fieldset": { m: 0, p: 0 }, }}
                            onKeyDown={e => {
                                if (e.key === 'Enter') {
                                    entryId && onUpdate({ desc: newText, entryId })
                                }
                            }}

                            value={newText}
                            onChange={onChange}

                            onBlur={() => entryId && onUpdate({ desc: newText, entryId })}
                            size='small' variant='outlined' />}
                    {!hideTimestamp && entryId && <StartTimeEndTime startTime={startTime.seconds} endTime={endTime.seconds} entryId={entryId} />}
                </Box>
                <Box flexDirection={'row'} display='flex' sx={{ ml: 'auto' }}>
                    {splitFormattedDuration.map((time, i) => {

                        return <Typography key={time + i} fontWeight={'bold'} variant='body1' sx={{ mr: 0 }}>{time + (i == 2 ? '' : ':')}</Typography>

                    })}


                    <MoreVertOutlined onClick={onMoreClick} />

                </Box>


            </Box>
            <Box sx={{ mt: 1, ml: 0, alignContent: 'center' }}>
                {entryId && <CategoryChips entryId={entryId} onChipClick={onChipClick} entryCategories={categories} />}
                {false && <Tooltip title='Add category'>
                    <IconButton onClick={handleClick} id={id} size='small'>
                        <AddCircleOutlineIcon color='action' fontSize='small' />
                    </IconButton>
                </Tooltip>}
            </Box>

        </Card>



        {/* <Divider sx={{ width: '100%' }} /> */}
        <Popover id={id}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
            {id && component[id]}
        </Popover>
    </div>
}