import { Box, Fab, IconButton } from '@mui/material';
import React from 'react';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';

import { useDrawerContext } from '../Providers/contextHooks';
import { NewEntryFormNarrow } from './NewEntryFormNarrow';



export const BottomAppBar: React.FC = () => {
    const { onSetComponent, toggleOpen, onSetAnchor } = useDrawerContext();
    const onClick = () => {
        onSetComponent(<Box><NewEntryFormNarrow /></Box>)
        onSetAnchor('bottom')
        toggleOpen()
    }
    return (

        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>


            <Fab size='small' onClick={onClick} sx={{ backdropFilter: '', bottom: 0, position: 'fixed', background: '' }} ><IconButton><AddCircleOutline /></IconButton></Fab>
        </Box>
    )
}