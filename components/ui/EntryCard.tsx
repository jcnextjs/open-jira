import { DragEvent, FC, useContext } from 'react';
import { Card, CardActionArea, CardActions, CardContent, Typography } from '@mui/material';

import { Entry } from '@app/interfaces';
import { UIContext } from '@app/context/ui';
import { useRouter } from 'next/router';

interface Props {
    entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {
    const { startDragging, endDragging } = useContext(UIContext);
    const router = useRouter();

    const handleDragStart = (event: DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('text/plain', entry._id);
        startDragging();
    };

    const handleDragEnd = (event: DragEvent<HTMLDivElement>) => {
        endDragging();
    };

    const handleClick = () => {
        router.push(`/entries/${entry._id}`);
    };

    return (
        <Card
            sx={{ marginBottom: 1 }}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onClick={handleClick}
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Typography variant="body2">Hace 30 minutos</Typography>
                </CardActions>
            </CardActionArea>
        </Card>
    );
};
