import { FC, useReducer } from 'react';
import { nanoid } from 'nanoid';

import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';

export interface EntriesState {
    entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [],
};

export const EntriesProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

    const addNewEntry = (description: string) => {
        const entry: Entry = {
            _id: nanoid(),
            description,
            createAt: Date.now(),
            status: 'PENDING',
        };

        dispatch({ type: '[Entry] - Add-Entry', entry });
    };

    const updateEntry = (entry: Entry) => {
        dispatch({ type: '[Entry] - Update-Entry', entry });
    };

    return (
        <EntriesContext.Provider
            value={{
                ...state,
                addNewEntry,
                updateEntry,
            }}
        >
            {children}
        </EntriesContext.Provider>
    );
};
