'use client';

import React, { createContext, useContext, useState, useEffect } from "react";
import useFile from "@/app/hooks/useFile";

const GlobalContext = createContext({

    /**
     * @typedef  {Object} Terminal
     * @property {object} cli    - CLI data.
     * @property {string} debug  - Debug data (Errors).
     * @property {string} output - Code output.
     */

    terminal: {}, setTerminal: () => {},

    /**
     * @typedef  {Array}  Storage
     * @property {Object} item - item object.
     */

    storage: {}, setStorage: () => {}
});

export const GlobalContextProvider = ({ children }) => {

    const [ terminal, setTerminal ] = useState({
        cli:{},
        debug:"",
        output:""
    });

    const [storage, setStorage] = useState({});
    
    const { getFiles } = useFile();

    useEffect(() => {
        setStorage(getFiles());
    },[]);

    return (
        <GlobalContext.Provider value={{ 
            terminal, 
            setTerminal,

            storage, 
            setStorage 
        }}>
            { children }
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);