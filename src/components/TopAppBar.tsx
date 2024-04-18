import { AppBar, Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDataContext, useDrawerContext } from '../Providers/contextHooks';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useIsNarrow } from '../utils/isMobile';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router';
const sidebarItems = [
    { icon: <AccessTimeIcon />, label: 'Home' }, 
    { icon: <DashboardIcon />, label: 'Dashboard' },
]

const SidebarList: React.FC = () => {
    const items = sidebarItems.map((item) => <ListItem key={item.label} disablePadding><ListItemButton><ListItemIcon>{item.icon}</ListItemIcon><ListItemText primary={item.label} /></ListItemButton></ListItem>)
    return (
        <Box>
            <List>
                {items}
            </List>
        </Box>
    )

}

export const TopAppBar: React.FC = () => {
    const {enableBackButton} = useAppDataContext();
    const { onSetComponent, toggleOpen, onSetAnchor } = useDrawerContext();
    const onClick = () => {
        onSetComponent(<SidebarList />)
        onSetAnchor('left')
        toggleOpen()
    }
    const nav = useNavigate();
    const isNarrow = useIsNarrow();
    return (
        <AppBar elevation={0} position='fixed'>
            <Toolbar sx={{height:20, overflow:'hidden', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                { enableBackButton && <IconButton size='small'>
                    <ArrowBackIosNewIcon fontSize='small' onClick={() => nav(-1)}/></IconButton>}
                {!isNarrow && <IconButton onClick={onClick}>
                    <MenuIcon />
                </IconButton>}
                <Typography fontWeight={'bold'}>Linear</Typography>
            </Toolbar>
        </AppBar>
    )
}