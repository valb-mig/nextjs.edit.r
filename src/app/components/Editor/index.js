'use client'

import React, { useState, useEffect } from 'react';

import MonacoEditor from '@monaco-editor/react';
import useFile      from '@/app/hooks/useFile';
import getLanguage  from '@/config/utils/getLanguage';

const Editor = ({ lang, selectedFile, setFiles }) => {

  const { editFile }    = useFile(setFiles);
  const [code, setCode] = useState(content);

  useEffect(() => {
    console.log(selectedFile);
    setCode(selectedFile.body)
  }, [selectedFile]);

  /* 
  *   Keyboard Actions 
  */

  useEffect(() => {
    function handleKeyDown(event) {
        if (event.key === 's' && event.ctrlKey) {
            console.log('saved');
            editFile({...selectedFile, body:code});
            event.preventDefault();
        }
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedFile, code]);

  /* 
  *   Component 
  */

  return (
    <MonacoEditor
      language={getLanguage(lang).name} 
      theme="vs-dark"
      value={selectedFile.body}
      onChange={(newValue, e) => setCode(newValue)}
      options={{
        automaticLayout: true,
        fontSize: 16,
        minimap: {
          enabled: false 
        }
      }}
    />
  );
};

export default Editor;