import { AppBar, Box, Collapse, Divider, IconButton, Paper, Toolbar } from '@mui/material';
import React from 'react';

import { useAppDataContext, useDrawerContext } from '../Providers/contextHooks';
import { NewEntryFormNarrow } from './NewEntryFormNarrow';
import AddIcon from '@mui/icons-material/Add';
import './button.css'
import { useNavigate } from 'react-router';
import ReorderIcon from '@mui/icons-material/Reorder';
import { ActiveEntry } from './ActiveEntry';
import BarChartIcon from '@mui/icons-material/BarChart';
import { isChrome } from '../utils/isChrome';


export const BottomAppBar: React.FC = () => {
    const { onSetComponent, toggleOpen, onSetAnchor } = useDrawerContext();
    const { openEntry } = useAppDataContext();
    const onClick = () => {
        onSetComponent(<Box><NewEntryFormNarrow /></Box>)
        onSetAnchor('bottom')
        toggleOpen()
    }
    const onItemClick = (route:string) => {
        setSelected(route)
        nav(route)
    }
    const [selected, setSelected] = React.useState('home')
    const nav = useNavigate()
    return (
        <AppBar position='fixed' sx={{ background: 'black', top: 'auto', bottom: 0, backdropFilter: 'blur(20px)', }}>
            <Paper elevation={0} sx={{ background: 'transparent' }}>

                <Divider sx={{ width: '100%' }} />

                {<Collapse in={!!openEntry?.entryId}>
                    <Box sx={{ zIndex: '1000', p: 1, pb:0 }}>
                        {openEntry?.entryId && <ActiveEntry />}
                    </Box> </Collapse>}
                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-evenly', mb: 0.5, mt: 0.5 }}>
                    <IconButton onClick={() => onItemClick('/')}>

                        <ReorderIcon color={selected === '/' ? 'primary' : 'action'}/>
                    </IconButton>
                    <IconButton onClick={onClick}>

                        <AddIcon color='action' />
                    </IconButton>
                    <IconButton onClick={() => onItemClick('stats')}>

                        <BarChartIcon color={selected === 'stats' ? 'primary' : 'action'} />
                    </IconButton>
                </Box>
            </Paper>
            {isChrome() && <Toolbar/>}
        </AppBar>
    )
}