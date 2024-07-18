import { Alert, Box, IconButton, Zoom } from '@mui/material';
import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { useSnackbarContext } from '../Providers/contextHooks';
import { editCategory } from '../firebase/db';



export const defaultColors = [
    { dark: '#002884', light: '#757ce8' },
    { dark: '#f44336', light: '#757ce8' },
    { dark: '#30a54c', light: '#757ce8' },
    { dark: '#B70204' },
    { dark: '#D93F0C' },
    { dark: '#F5CB04' },
    { dark: '#288A17' },
    { dark: '#286A75' },
    { dark: '#4175DB' },
    { dark: '#3853CD' },
    { dark: '#5318E7' }
]
interface ColorSelectionProps {
    color: string;
    isSelected: boolean
    onClick: (selectedColor: string) => void;
}
const ColorSelection: React.FC<ColorSelectionProps> = ({ color, onClick, isSelected }) => {

    return (
        <IconButton onClick={() => onClick(color)} sx={{ m: 1, borderRadius: '100%', background: color, height: 30, width: 30 }}>
            <Zoom in={isSelected}>
                <CheckIcon fontSize='small' />
            </Zoom>
        </IconButton>
    )
}
interface ColorPickerProps {
    selectColor: (selectedColor: string) => void;
    color: string;
    isUpdate?: boolean;
    categoryId?: string;
}
export const ColorPicker: React.FC<ColorPickerProps> = ({categoryId, isUpdate, selectColor, color }) => {
    const s = useSnackbarContext();

    const onColorPick = async(categoryId?: string, color?: string) => {
        if(!categoryId || !color){
            return;
        }
        try {
            s.onSetComponent(<Alert severity="success">Color updated</Alert>)
            s.toggleOpen()
            await editCategory(categoryId, {color})
        } catch {
            s.onSetComponent(<Alert severity="error">Error in updating color</Alert>)
            s.toggleOpen()
        }
    }
    return <Box>
        {defaultColors.map((c, i) => <ColorSelection key={c.dark + i} isSelected={color === c.dark} key={c.dark + i} color={c.dark} onClick={isUpdate ? () => onColorPick(categoryId, c.dark) : selectColor}/>)}
    </Box>
}