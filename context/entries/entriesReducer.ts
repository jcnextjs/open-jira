import { Entry } from '@app/interfaces';
import { EntriesState } from './';

type EntriesActionType =
    | { type: '[Entry] - Add-Entry'; entry: Entry }
    | { type: '[Entry] - Update-Entry'; entry: Entry }
    | { type: '[Entry] - Delete-Entry'; id: string }
    | { type: '[Entry] - Get All Entries'; entries: Entry[] };

export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {
    switch (action.type) {
        case '[Entry] - Add-Entry':
            return {
                ...state,
                entries: [...state.entries, action.entry],
            };
        case '[Entry] - Update-Entry':
            return {
                ...state,
                entries: state.entries.map((e) => {
                    if (e._id === action.entry._id) {
                        e.status = action.entry.status;
                        e.description = action.entry.description;
                        e.updatedAt = Date.now();
                    }
                    return e;
                }),
            };
        case '[Entry] - Get All Entries':
            return {
                ...state,
                entries: [...action.entries],
            };
        case '[Entry] - Delete-Entry':
            return {
                ...state,
                entries: state.entries.filter((e) => e._id !== action.id),
            };
        default:
            return state;
    }
};
