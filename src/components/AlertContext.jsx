import {createContext, useContext} from "react";

const AlertContext = createContext(undefined);
export const AlertProvider = AlertContext.Provider;
export const useAlert = () => {
    const context = useContext(AlertContext);
    if (context === undefined) {
        throw new Error('useAlert must be used within a AlertProvider');
    }
    return context;
}