import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null); // 'umpire' or null

    const login = () => setUser({ role: 'umpire', name: 'Official Umpire' });
    const logout = () => setUser(null);

    return (
        <AppContext.Provider value={{ user, login, logout }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
