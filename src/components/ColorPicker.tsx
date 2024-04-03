import {  Box, IconButton } from '@mui/material';
import React from 'react';
import CheckIcon from '@mui/icons-material/Check';

const defaultColors = [{dark: '#002884', light:'#757ce8'}];

interface ColorSelectionProps {
    color: string;
}
const ColorSelection: React.FC<ColorSelectionProps> = ({color}) => {
    return (
       <IconButton sx={{m:1, borderRadius:'100%', background: color, height: 30, width: 30}}>
        <CheckIcon fontSize='small'/>
       </IconButton>
    )
}

export const ColorPicker: React.FC = () => {
    return <Box>
        <ColorSelection color={defaultColors[0].dark}/>
        <ColorSelection color={defaultColors[0].dark}/>
        <ColorSelection color={defaultColors[0].dark}/>
        <ColorSelection color={defaultColors[0].dark}/>
    </Box>
}