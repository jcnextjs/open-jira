import { UIState } from './';

type UIActionType =
    | { type: '[UI] - Open Sidebar' }
    | { type: '[UI] - Close Sidebar' }
    | { type: '[UI] - Show New Entry'; show: boolean }
    | { type: '[UI] - Start Dragging' }
    | { type: '[UI] - End Dragging' };

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
        // Muestra u oculta el formulario de nueva tarea
        case '[UI] - Show New Entry':
            return {
                ...state,
                showNewEntry: action.show,
            };

        // Indica que se está arrastrando un elemento
        case '[UI] - Start Dragging':
            return {
                ...state,
                isDragging: true,
            };
        case '[UI] - End Dragging':
            return {
                ...state,
                isDragging: false,
            };
        default:
            return state;
    }
};
