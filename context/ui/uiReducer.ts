import { UIState } from './';

type UIActionType =
    | { type: '[UI] - Open Sidebar' }
    | { type: '[UI] - Close Sidebar' }
    | { type: '[UI] - Show New Entry'; show: boolean };

export const uiReducer = (state: UIState, action: UIActionType): UIState => {
    switch (action.type) {
        case '[UI] - Open Sidebar':
            return {
                ...state,
                sidebarOpen: true,
            };
        case '[UI] - Close Sidebar':
            return {
                ...state,
                sidebarOpen: false,
            };
        case '[UI] - Show New Entry':
            return {
                ...state,
                showNewEntry: action.show,
            };
        default:
            return state;
    }
};
