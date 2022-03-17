import { FC, useContext } from 'react';
import { GlobalStyles, List, Paper, darkScrollbar } from '@mui/material';
import { Entry, EntryStatus } from '../../interfaces';
import { EntryCard } from './';
import { EntriesContext } from '../../context/entries';

interface Props {
    status: EntryStatus;
}

export const EntryList: FC<Props> = ({ status }) => {
    const { entries } = useContext(EntriesContext);

    const filterByStatus = (entry: Entry) => entry.status === status;

    return (
        <div style={{ height: '100%' }}>
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
                {/* Todo: Cambia con el Drag */}
                <List sx={{ opacity: 1 }}>
                    {entries.filter(filterByStatus).map((e) => (
                        <EntryCard key={e._id} entry={e} />
                    ))}
                </List>
            </Paper>
        </div>
    );
};
