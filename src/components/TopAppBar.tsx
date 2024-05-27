import { AppBar, Box, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
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
interface TopAppBarProps {
    title?: string;
    enableBack?: boolean;
}
export const TopAppBar: React.FC<TopAppBarProps> = ({title, enableBack}) => {
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
                { (enableBackButton || enableBack) && <IconButton onClick={() => nav(-1)} size='small'>
                    <ArrowBackIosNewIcon fontSize='small' /></IconButton>}
                {!isNarrow && !enableBack && <IconButton onClick={onClick}>
                    <MenuIcon />
                </IconButton>}
                <Typography fontWeight={'bold'}>{title ||'Linear'}</Typography>
                <Box sx={{marginLeft: 'auto'}}>

                <IconButton onClick={() => nav('app-settings')}><MenuIcon/></IconButton>
                </Box>
            </Toolbar>
            <Divider sx={{width: '100%'}}/>
        </AppBar>
    )
}