/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import useFile from "@/app/hooks/useFile";
import useFolder from "@/app/hooks/useFolder";

const GlobalContext = createContext({
  /**
   * @typedef  {Object} Terminal
   * @property {object} cli    - CLI data.
   * @property {string} debug  - Debug data (Errors).
   * @property {string} output - Code output.
   */

  terminal: {},
  setTerminal: () => {},

  /**
   * @typedef  {Array}  Storage
   * @property {Object} item - item object.
   */

  storage: {},
  setStorage: () => {},
});

export const GlobalContextProvider = ({ children }) => {
  const [terminal, setTerminal] = useState({
    cli: {},
    debug: "",
    output: "",
  });

  const [storage, setStorage] = useState({
    folders: [],
    files: [],
  });

  const { getFolders } = useFolder();
  const { getFiles } = useFile();

  useEffect(() => {
    setStorage({
      folders: getFolders(),
      files: getFiles(),
    });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        terminal,
        setTerminal,

        storage,
        setStorage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
