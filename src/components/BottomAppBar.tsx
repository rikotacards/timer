import { Box, Fab, IconButton } from '@mui/material';
import React from 'react';

import { useDrawerContext } from '../Providers/contextHooks';
import { NewEntryFormNarrow } from './NewEntryFormNarrow';
import AddIcon from '@mui/icons-material/Add';


export const BottomAppBar: React.FC = () => {
    const { onSetComponent, toggleOpen, onSetAnchor } = useDrawerContext();
    const onClick = () => {
        onSetComponent(<Box><NewEntryFormNarrow /></Box>)
        onSetAnchor('bottom')
        toggleOpen()
    }
    return (

        <Box sx={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Fab color='primary' size='small' onClick={onClick} sx={{ backdropFilter: '', bottom: 0, position: 'fixed', background: '', margin: 1 }} ><IconButton><AddIcon /></IconButton></Fab>
        </Box>
    )
}