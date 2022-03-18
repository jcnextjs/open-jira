import { createContext } from 'react';
import { UIState } from './UIProvider';

interface ContextProps extends UIState {
    handleOpenSidebar: () => void;
    handleCloseSidebar: () => void;
    setShowNewEntry: (show: boolean) => void;
    startDragging: () => void;
    endDragging: () => void;
}

export const UIContext = createContext({} as ContextProps);
