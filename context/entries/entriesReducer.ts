import { Entry } from '../../interfaces';
import { EntriesState } from './';

type EntriesActionType =
    | { type: '[Entry] - Add-Entry'; entry: Entry }
    | { type: '[Entry] - Update-Entry'; entry: Entry };

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
                        e.updateAt = Date.now();
                    }
                    return e;
                }),
            };
        default:
            return state;
    }
};
