'use client'

import React, { useState, useEffect } from 'react';

import MonacoEditor from '@monaco-editor/react';
import useFile      from "@/app/hooks/useFile";

const Editor = ({ lang, selectedFile, setFiles }) => {

  const { editFile } = useFile(setFiles);
  const [code, setCode] = useState(content);

  const getLanguade = (extension) => {

    let language = "";

    switch(extension) {
      case 'js':
        language = "javascript"
        break;
      case 'php':
        language = "php"
        break;
      case 'txt':
        language = "markdown"
        break;
      default:
        language = "markdown"
        break;
    }

    return language;
  }

  const getCode = () => {
    return selectedFile.body;
  }

  const handleEditorChange = (newValue, e) => setCode(newValue);

  /* Keyboard Actions */

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

  /* Component */

  return (
    <div className='d-flex w-100 h-[100vh]'>
      <MonacoEditor
        language={getLanguade(lang)} 
        theme="vs-dark"
        value={getCode()}
        onChange={handleEditorChange}
        options={{
          automaticLayout: true,
          fontSize: 16,
          minimap: {
            enabled: false 
          }
        }}
      />
    </div>
  );
};

export default Editor;