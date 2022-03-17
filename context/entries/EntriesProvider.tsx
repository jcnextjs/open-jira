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
            decription:
                'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic soluta repudiandae',
            createAt: Date.now(),
            status: 'PENDING',
        },
        {
            _id: nanoid(),
            decription: 'Velit ad nostrud culpa laborum sunt et cillum officia nisi consectetur.',
            createAt: Date.now() - 1000 * 60 * 34,
            status: 'PENDING',
        },
        {
            _id: nanoid(),
            decription: 'Occaecat ut magna labore veniam do nulla amet enim labore.',
            createAt: Date.now() - 1000 * 60 * 60 * 18,
            status: 'IN-PROGRESS',
        },
        {
            _id: nanoid(),
            decription:
                'Cillum nulla mollit veniam esse quis ad cupidatat ullamco nulla exercitation cillum fugiat aliqua aliquip.',
            createAt: Date.now() - 1000 * 60 * 60 * 28,
            status: 'DONE',
        },
        {
            _id: nanoid(),
            decription: 'Do consequat irure labore qui ea do velit.',
            createAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
            status: 'DONE',
        },
    ],
};

export const EntriesProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

    return (
        <EntriesContext.Provider
            value={{
                ...state,
            }}
        >
            {children}
        </EntriesContext.Provider>
    );
};
