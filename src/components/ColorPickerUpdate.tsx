import { Alert, Box, IconButton, Zoom } from '@mui/material';
import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import { useSnackbarContext } from '../Providers/contextHooks';
import { editCategory } from '../firebase/db';
import { defaultColors } from './ColorPicker';



interface ColorPickerPropsUpdate {
    currColor?: string;
    categoryId?: string;
}
export const ColorPickerUpdate: React.FC<ColorPickerPropsUpdate> = ({ categoryId, currColor }) => {
    const s = useSnackbarContext();
    const [selectedColor, setSelectedColor] = React.useState<string | undefined>()
  
    console.log('CURR', currColor)
    const onClick = async (categoryId?: string, color?: string) => {
        if (!categoryId) {
            return;
        }
        try {
            setSelectedColor(color || 'grey')
            s.onSetComponent(<Alert severity="success">Color updated</Alert>)
            s.toggleOpen()
            await editCategory(categoryId, { color })
        } catch {
            s.onSetComponent(<Alert severity="error">Error in updating color</Alert>)
            s.toggleOpen()
        }
    }
    return <Box>
        {defaultColors.map((c, i) => <IconButton onClick={() => onClick(categoryId, c.dark)} sx={{ m: 1, borderRadius: '100%', background: c.dark, height: 30, width: 30 }}>
            <Zoom in={c.dark === (selectedColor|| currColor)}>
                <CheckIcon fontSize='small' />
            </Zoom>
        </IconButton>)}
    </Box>
}