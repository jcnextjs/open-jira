import { FC, useReducer } from 'react';
import { nanoid } from 'nanoid';

import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';

export interface EntriesState {
    entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: nanoid(),
            description:
                'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic soluta repudiandae',
            createAt: Date.now(),
            status: 'PENDING',
        },
        {
            _id: nanoid(),
            description: 'Velit ad nostrud culpa laborum sunt et cillum officia nisi consectetur.',
            createAt: Date.now() - 1000 * 60 * 34,
            status: 'PENDING',
        },
        {
            _id: nanoid(),
            description: 'Occaecat ut magna labore veniam do nulla amet enim labore.',
            createAt: Date.now() - 1000 * 60 * 60 * 18,
            status: 'IN-PROGRESS',
        },
        {
            _id: nanoid(),
            description:
                'Cillum nulla mollit veniam esse quis ad cupidatat ullamco nulla exercitation cillum fugiat aliqua aliquip.',
            createAt: Date.now() - 1000 * 60 * 60 * 28,
            status: 'DONE',
        },
        {
            _id: nanoid(),
            description: 'Do consequat irure labore qui ea do velit.',
            createAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
            status: 'DONE',
        },
    ],
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

        dispatch({ type: '[Entry] - Add-Entry', payload: entry });
    };

    return (
        <EntriesContext.Provider
            value={{
                ...state,
                addNewEntry,
            }}
        >
            {children}
        </EntriesContext.Provider>
    );
};
