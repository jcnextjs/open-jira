import { FC, useEffect, useReducer } from 'react';
import { useSnackbar } from 'notistack';

import { EntriesContext, entriesReducer } from './';
import { entriesApi } from '@app/apis';
import { Entry } from '@app/interfaces';

export interface EntriesState {
    entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [],
};

export const EntriesProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);
    const { enqueueSnackbar } = useSnackbar();

    const addNewEntry = async (description: string) => {
        const { data: entry } = await entriesApi.post<Entry>('/entries', { description });
        dispatch({ type: '[Entry] - Add-Entry', entry });
    };

    const updateEntry = async ({ _id, description, status }: Entry, notify: boolean = false) => {
        try {
            const { data: entry } = await entriesApi.put<Entry>(`/entries/${_id}`, {
                description,
                status,
            });
            dispatch({ type: '[Entry] - Update-Entry', entry });
            notify &&
                enqueueSnackbar('Tarea actualizada', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                });
        } catch (e) {
            // ToDo: handle error
        }
    };

    const getAllEntries = async () => {
        const { data } = await entriesApi.get<Entry[]>('/entries');
        dispatch({ type: '[Entry] - Get All Entries', entries: data });
    };

    useEffect(() => {
        getAllEntries();
    }, []);

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
