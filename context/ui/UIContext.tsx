import { createContext } from 'react';

interface ContextProps {
    sidebarOpen: boolean;
    handleOpenSidebar: () => void;
    handleCloseSidebar: () => void;
}

export const UIContext = createContext({} as ContextProps);
