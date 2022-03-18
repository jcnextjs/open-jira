import { FC, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
    sidebarOpen: boolean;
    showNewEntry: boolean;
}

const UI_INITIAL_STATE: UIState = {
    sidebarOpen: false,
    showNewEntry: false,
};

export const UIProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const handleOpenSidebar = () => dispatch({ type: '[UI] - Open Sidebar' });
    const handleCloseSidebar = () => dispatch({ type: '[UI] - Close Sidebar' });
    const setShowNewEntry = (show: boolean) => dispatch({ type: '[UI] - Show New Entry', show });

    return (
        <UIContext.Provider
            value={{
                ...state,
                handleCloseSidebar,
                handleOpenSidebar,
                setShowNewEntry,
            }}
        >
            {children}
        </UIContext.Provider>
    );
};
