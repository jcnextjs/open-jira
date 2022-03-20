import { createContext } from 'react';

import { Entry } from '@app/interfaces';
import { EntriesState } from './';

interface ContextProps extends EntriesState {
    addNewEntry: (description: string) => void;
    updateEntry: (entry: Entry, notify?: boolean) => void;
    deleteEntry: (entryId: string, notify?: boolean) => void;
}

export const EntriesContext = createContext({} as ContextProps);
