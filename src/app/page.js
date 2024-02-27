'use client';

import React, { useState, useEffect } from "react";

import Sidebar from "@/app/components/Sidebar";
import Editor  from "@/app/components/Editor";
import Button  from "@/app/components/Button";
import Tag     from "@/app/components/Tag";

import useFile from "@/app/hooks/useFile";
import Icon    from "@/config/icons";

import getLanguage   from '@/config/utils/getLanguage';

export default function Home()
{
    const [ files, setFiles ] = useState([]);
    const { addFile, removeFile, getFiles } = useFile(setFiles);

    const [ selectedFile, setSelectedFile ] = useState(false);
    const [ isOpen, setIsOpen ] = useState(false);

    const [ formData, setFormData ] = useState({
        name:"",
        body:""
    })

    const removeSelectedFile = () => {
        removeFile(selectedFile.name+'.'+selectedFile.type);
        setSelectedFile(false)
    }

    const submitForm = (e) => {
        e.preventDefault();
        console.log('add');

        addFile(formData);
        setIsOpen(false);
        setFormData({
            name:"",
            body:"",
            type:"" 
        });
    }

    /*
    *   Ajust hydratation
    */

    useEffect(() => {
        setFiles(getFiles());
    },[]);

    /* 
    *   Keyboard actions
    */

    useEffect(() => {

        function handleKeyDown(event) {

            if (event.key === 'H' && event.shiftKey) {

                if(selectedFile !== false) {
                    setSelectedFile(false);
                }
                console.info('[shift + H ]: Go Home');

            } else if(event.key === 'N' && event.shiftKey && event.altKey) {

                if(!isOpen) {
                    setIsOpen(true);
                    console.info('[shift + alt + N ]: (open) New file');
                }
                else {
                    setIsOpen(false);
                    console.info('[shift + N ]: (close) New file');
                }

            } else if(event.key === 'W' && event.shiftKey && event.altKey) {

                if(selectedFile !== false) {
                    removeSelectedFile();
                    console.info('[shift + alt + W ]: Delete file');
                }
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedFile, isOpen]);

    return (
        <>
            <Sidebar.Root>
                <Sidebar.Body>
                    <Button 
                        OnClick={() => setSelectedFile(false)}
                        Icon={<Icon.Home/>}
                        Title="Home"
                    />
                    <Button 
                        OnClick={() => {setIsOpen(true)}}
                        Icon={<Icon.File/>}
                        Title="Add file"
                    />
                    <Sidebar.Section Title="Files">
                        {files.length > 0 ? (
                            files.map((value, index) => (
                                <Button 
                                    key={index}
                                    OnClick={() => {setSelectedFile(value)}}
                                    Icon={getLanguage(value.type).icon}
                                    Title={value.name+'.'+value.type}
                                    Selected={(selectedFile.name+'.'+selectedFile.type) == (value.name+'.'+value.type)}
                                />
                            ))
                        ):(
                            <span className="d-flex justify-content-center gap-2 text-dark-4 text-sm">
                                Empty
                            </span>
                        )}
                    </Sidebar.Section>
                </Sidebar.Body>
            </Sidebar.Root>

            {isOpen && (
                <div id="add-modal" className="d-flex fixed w-100 h-100 items-center justify-center bg-black bg-opacity-50 ${isOpen ? '' : 'hidden'}" style={{zIndex:"999"}}>
                    <form
                        className="d-flex gap-2 flex-column p-2 w-[30vw] mb-[80vh] rounded bg-dark-0 border-[1px] border-dark-1" 
                        onSubmit={(e) => submitForm(e)}>
                        <input 
                            type="text"
                            className="rounded p-2 text-white bg-dark-1"
                            placeholder="Filename"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name:e.target.value})}
                            autoFocus={true}
                        />
                        <div className="d-flex gap-2 justify-content-end">
                            <Button Title="Add" Type="submit"/>
                            <Button
                                OnClick={() => {
                                    setIsOpen(false);
                                    setFormData({
                                        name:"",
                                        body:"",
                                        type:"" 
                                    })
                                }}
                                Title="Back"
                            />
                        </div>
                    </form>
                </div>
            )}
                    
            <section id="content" className="w-100 h-100 bg-dark-0">
                {selectedFile !== undefined && selectedFile !== null && selectedFile !== false ? (
                    <>
                        <nav className="d-flex w-100 bg-dark-1 gap-2">

                            <div className="d-flex gap-1 rounded-0 bg-dark-0 text-light-0 p-2">
                                <span className="d-flex gap-1 align-items-center">
                                    {getLanguage(selectedFile.type).icon}{selectedFile.name}.{selectedFile.type}
                                </span>
                                <button 
                                    className="d-flex justify-content-center align-items-center text-red-500 rounded-circle border-[1px] w-[25px] h-[25px] border-dark-1"
                                    onClick={() => removeSelectedFile()}
                                >
                                    <Icon.Close/>
                                </button>
                            </div>

                        </nav>
                        <div className="d-flex w-100 bg-dark-0 text-light-0 rounded-[20px]">
                            <Editor
                                lang={selectedFile.type}
                                selectedFile={selectedFile}
                                setFiles={setFiles}
                            />
                        </div>
                    </>
                ):(
                    <>
                        <div className="d-flex justify-content-center w-100">
                            <div className="text-white mt-[30vh]">
                                <h2 className="d-flex justify-content-center border-b-[1px] text-[4em] border-dark-5">edit.r</h2>
                                
                                <section id="shortcuts" className="border-[1px] border-dark-1 p-2 rounded mt-2">
                                    <h3 className="d-flex justify-content-center">Shortcuts</h3>
                                    <div className="d-flex flex-column gap-2">
                                        <Tag Title="[shift + H]: Go Home" />
                                        <Tag Title="[shift + alt + N]: New file" />
                                        <Tag Title="[shift + alt + W]: Delete file" />
                                    </div>
                                </section>

                            </div>
                        </div>
                        
                    </>
                )}
            </section>
        </>
    );
}