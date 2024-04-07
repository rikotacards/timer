import { Card, Skeleton } from '@mui/material';
import React from 'react';

export const NewEntryFormSkeleton: React.FC = () => {
    return <Card>
        <Skeleton variant='rectangular' sx={{width: '100%', height: 50}}/>
        </Card>
}