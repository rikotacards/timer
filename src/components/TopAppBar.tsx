import { AppBar, Avatar, Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useDrawerContext } from '../Providers/contextHooks';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DashboardIcon from '@mui/icons-material/Dashboard';
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
    const { onSetComponent, toggleOpen, onSetAnchor } = useDrawerContext();
    const onClick = () => {
        onSetComponent(<SidebarList />)
        onSetAnchor('left')
        toggleOpen()
    }
    return (
        <AppBar position='fixed'>
            <Toolbar sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <IconButton onClick={onClick}>
                    <MenuIcon />
                </IconButton>
                <Typography fontWeight={'bold'}>Simple Timer</Typography>
                <Avatar sx={{ ml: 'auto' }} />
            </Toolbar>
        </AppBar>
    )
}