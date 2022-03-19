import { FC, useEffect, useReducer } from 'react';
import { nanoid } from 'nanoid';

import { entriesApi } from '../../apis';
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

    const addNewEntry = async (description: string) => {
        const { data: entry } = await entriesApi.post<Entry>('/entries', { description });
        dispatch({ type: '[Entry] - Add-Entry', entry });
    };

    const updateEntry = async ({ _id, description, status }: Entry) => {
        try {
            const { data: entry } = await entriesApi.put<Entry>(`/entries/${_id}`, {
                description,
                status,
            });
            dispatch({ type: '[Entry] - Update-Entry', entry });
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
