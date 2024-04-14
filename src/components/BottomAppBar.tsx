import { AppBar, Box, Collapse, Divider, IconButton, Paper, Toolbar } from '@mui/material';
import React from 'react';

import { useAppDataContext, useDrawerContext } from '../Providers/contextHooks';
import { NewEntryFormNarrow } from './NewEntryFormNarrow';
import AddIcon from '@mui/icons-material/Add';
import './button.css'
import { useLocation, useNavigate } from 'react-router';
import ReorderIcon from '@mui/icons-material/Reorder';
import { ActiveEntry } from './ActiveEntry';
import BarChartIcon from '@mui/icons-material/BarChart';
import { isChrome } from '../utils/isChrome';
import { NavLink } from 'react-router-dom'

export const BottomAppBar: React.FC = () => {
    const location = useLocation()
    console.log('bottom', location)
    const { onSetComponent, toggleOpen, onSetAnchor } = useDrawerContext();
    const { openEntry } = useAppDataContext();
    const onClick = () => {
        onSetComponent(<Box><NewEntryFormNarrow /></Box>)
        onSetAnchor('bottom')
        toggleOpen()
    }
    const onItemClick = (route: string) => {
        nav(route)
    }
    const currRoute = location.pathname.split('/')[1]
    console.log('cur', currRoute)
    const nav = useNavigate()
    return (
        <AppBar position='fixed' sx={{ background: 'black', top: 'auto', bottom: 0, backdropFilter: 'blur(20px)', }}>
            <Paper elevation={0} sx={{ background: 'transparent' }}>

                <Divider sx={{ width: '100%' }} />

                {<Collapse in={!!openEntry?.entryId}>
                    <Box sx={{ zIndex: '1000', p: 1, pb: 0 }}>
                        {openEntry?.entryId && <ActiveEntry />}
                    </Box> </Collapse>}
                <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-evenly', mb: 0.5, mt: 0.5 }}>
                    <NavLink className={({ isActive, isPending }) =>
                        isActive
                            ? "active"
                            : isPending
                                ? "pending"
                                : ""
                    } to='/'>

                        <IconButton onClick={() => onItemClick('/')}>

                            <ReorderIcon color={currRoute === '' ? 'primary' : 'action'} />
                        </IconButton>
                    </NavLink>

                    <IconButton onClick={onClick}>
                        <AddIcon color='action' />
                    </IconButton>
                    <NavLink className={({ isActive, isPending }) =>
                        isActive
                            ? "active"
                            : isPending
                                ? "pending"
                                : ""
                    } to='stats'>
                        <IconButton onClick={() => onItemClick('stats')}>
                            <BarChartIcon color={currRoute === 'stats' ? 'primary' : 'inherit'} />
                        </IconButton>
                    </NavLink>
                </Box>
            </Paper>
            {isChrome() && <Toolbar />}
        </AppBar>
    )
}