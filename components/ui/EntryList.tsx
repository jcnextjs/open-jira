import { DragEvent, FC, useContext } from 'react';
import { GlobalStyles, List, Paper, darkScrollbar, useTheme } from '@mui/material';
import { Entry, EntryStatus } from '../../interfaces';
import { EntryCard } from './';

import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

import styles from './EntryList.module.css';

interface Props {
    status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
    const { entries, updateEntry } = useContext(EntriesContext);
    const { isDragging, endDragging } = useContext(UIContext);
    const {
        palette: { primary },
    } = useTheme();

    const filterByStatus = (entry: Entry) => entry.status === status;

    const allowDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDropCard = (event: DragEvent<HTMLDivElement>) => {
        const id = event.dataTransfer.getData('text/plain');
        const entry = entries.find((e) => e._id === id)!;
        entry.status = status;
        updateEntry(entry);
        endDragging();
    };

    return (
        <div
            style={{
                height: '100%',
                border: isDragging ? `2px dotted ${primary.main}80` : '',
            }}
            onDrop={handleDropCard}
            onDragOver={allowDrop}
            className={isDragging ? styles.dragging : ''}
        >
            <GlobalStyles styles={{ ...darkScrollbar() }} />
            <Paper
                square
                sx={{
                    overflow: 'auto',
                    backgroundColor: 'transparent',
                    paddingX: 1,
                    height: '100%',
                }}
            >
                <List sx={{ opacity: isDragging ? 0.4 : 1, transition: 'all .3s' }}>
                    {entries.filter(filterByStatus).map((e) => (
                        <EntryCard key={e._id} entry={e} />
                    ))}
                </List>
            </Paper>
        </div>
    );
};
