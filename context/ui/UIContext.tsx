import { createContext } from 'react';

interface ContextProps {
    sidebarOpen: boolean;
    showNewEntry: boolean;
    handleOpenSidebar: () => void;
    handleCloseSidebar: () => void;
    setShowNewEntry: (show: boolean) => void;
}

export const UIContext = createContext({} as ContextProps);
