import { EntriesState } from './';

type EntriesActionType = { type: '[Entries] - List' };

export const entriesReducer = (state: EntriesState, action: EntriesActionType): EntriesState => {
    switch (action.type) {
        case '[Entries] - List':
            return {
                ...state,
            };
        default:
            return state;
    }
};
