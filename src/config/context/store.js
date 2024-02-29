'use client';

import React, { createContext, useContext, useState } from "react";

const GlobalContext = createContext({

    /**
     * @typedef  {Object} File
     * @property {string} name - File name.
     * @property {string} body - File body (content).
     * @property {string} type - File extension (for example, 'js', 'php', 'txt', etc.).
     */

    file: {}, setFile:    () => {},

    /**
     * @typedef  {Array}  Storage
     * @property {Object} item - item object.
     */

    storage: {}, setStorage: () => {},
});

export const GlobalContextProvider = ({ children }) => {

    const [file,    setFile]    = useState({});
    const [storage, setStorage] = useState({});
    
    return (
        <GlobalContext.Provider value={{ 
            file, 
            setFile,

            storage, 
            setStorage 
        }}>
            { children }
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);