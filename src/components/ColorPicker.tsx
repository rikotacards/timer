import { Box, IconButton, Zoom } from '@mui/material';
import React from 'react';
import CheckIcon from '@mui/icons-material/Check';

const defaultColors = [{ dark: '#002884', light: '#757ce8' }, 
{ dark: '#f44336', light: '#757ce8' },
 { dark: '#30a54c', light: '#757ce8' }
];

interface ColorSelectionProps {
    color: string;
    isSelected: boolean
    onClick: (selectedColor: string) => void;
}
const ColorSelection: React.FC<ColorSelectionProps> = ({ color, onClick, isSelected }) => {

    return (
        <IconButton onClick={() =>onClick(color)} sx={{ m: 1, borderRadius: '100%', background: color, height: 30, width: 30 }}>
            <Zoom in={isSelected}>
                <CheckIcon fontSize='small' />
            </Zoom>
        </IconButton>
    )
}
interface ColorPickerProps {
    selectColor: (selectedColor: string) => void;
    color: string;
}
export const ColorPicker: React.FC<ColorPickerProps> = ({ selectColor , color}) => {

    return <Box>
        {defaultColors.map((c, i) => <ColorSelection isSelected={color === c.dark} key={c.dark + i} color={c.dark} onClick={selectColor} />)}

    </Box>
}