import { AppBar, Box, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper, Toolbar, Typography } from '@mui/material';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { useDrawerContext } from '../Providers/contextHooks';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useIsNarrow } from '../utils/isMobile';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate, useParams } from 'react-router';
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
interface CategoryTopAppBarProps {
    title?: string
}
export const CategoryTopAppBar: React.FC<CategoryTopAppBarProps> = () => {
    const { onSetComponent, toggleOpen, onSetAnchor } = useDrawerContext();
    const onClick = () => {
        onSetComponent(<SidebarList />)
        onSetAnchor('left')
        toggleOpen()
    }
    const params = useParams();
    
    const nav = useNavigate();
    const isNarrow = useIsNarrow();
    return (

        <AppBar sx={{ background: 'transparent' }} position='fixed'>
            <Paper variant='elevation' elevation={0}>
                <Toolbar sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <Box sx={{flex:1}}>
                        <IconButton  onClick={() => nav(-1)} size='small'><ArrowBackIosNewIcon fontSize='small' /></IconButton>
                        {!isNarrow && <IconButton onClick={onClick}>
                            <MenuIcon />
                        </IconButton>}
                    </Box>
                    <Box sx={{flex:1, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>

                        <Typography fontWeight={'bold'}>{params.categoryName}</Typography>
                    </Box>
                    <Box sx={{flex:1}} />
                </Toolbar>
            </Paper>
        </AppBar>
    )
}