import { FC, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
    sidebarOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
    sidebarOpen: false,
};

export const UIProvider: FC = ({ children }) => {
    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const handleOpenSidebar = () => dispatch({ type: '[UI] - Open Sidebar' });
    const handleCloseSidebar = () => dispatch({ type: '[UI] - Close Sidebar' });

    return (
        <UIContext.Provider
            value={{
                ...state,
                handleCloseSidebar,
                handleOpenSidebar,
            }}
        >
            {children}
        </UIContext.Provider>
    );
};
