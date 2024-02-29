'use client'

import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '@/config/context/store';

import MonacoEditor, { loader } from '@monaco-editor/react';
import useFile      from '@/app/hooks/useFile';
import getLanguage  from '@/utils/helpers/getLanguage';

const Editor = ({ setFiles }) => {

  const { file } = useGlobalContext();
  const { editFile } = useFile(setFiles);
  const [code, setCode] = useState(file.body);

  useEffect(() => {
    console.log("[Editor]: "+file.name);
    setCode(file.body)
  }, [file]);

  /* 
  *   Keyboard Actions 
  */

  useEffect(() => {
    function handleKeyDown(event) {
        if (event.key === 's' && event.ctrlKey) {
          editFile({...file, body:code});
          event.preventDefault();
        }
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [file, code]);

  /* 
  *   Component 
  */

  loader.init().then((monaco) => {
    monaco.editor.defineTheme('myTheme', {
        base: 'vs-dark',
        inherit: true,
        rules: [],
        colors: {
            'editor.background': '#000000',
        },
    });
  });

  return (
    <MonacoEditor
      theme='myTheme'
      language={getLanguage(file.type).name} 
      value={file.body}
      onChange={(newValue, e) => setCode(newValue)}
      options={{
        automaticLayout: true,
        fontFamily: "CaskaydiaCove Nerd Font",
        fontSize: 20,
        minimap: {
          enabled: false 
        }
      }}
    />
  );
};

export default Editor;