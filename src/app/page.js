'use client';

import React, { useState } from "react";

import Sidebar from "@/app/components/Sidebar";
import Editor  from "@/app/components/Editor";
import Button  from "@/app/components/Button";

import useFile from "@/app/hooks/useFile";
import Icon    from "@/config/icons";

export default function Home()
{
    const [ files, setFiles ]   = useState([]);
    const { addFile, removeFile, getFiles } = useFile(setFiles);

    const [ selectedFile, setSelectedFile ] = useState(false);

    const [ formData, setFormData ] = useState({
        name:"",
        body:""
    })

    const [isOpen, setIsOpen] = useState(false);

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
                        {getFiles().length > 0 && (
                            getFiles().map((value, index) => (
                                <span 
                                    id={value.name} 
                                    key={index} 
                                    className="btn btn-default text-light-0"
                                    onClick={() => {setSelectedFile(value)}}
                                >
                                    {value.name+'.'+value.type}
                                </span>
                            ))
                        )}
                    </Sidebar.Section>
                </Sidebar.Body>
            </Sidebar.Root>

            {isOpen && (
                <div id="add-modal" className="d-flex fixed w-100 h-100 items-center justify-center bg-black bg-opacity-50 ${isOpen ? '' : 'hidden'}" style={{zIndex:"999"}}>
                    <form 
                        className="d-flex flex-column p-2 w-[30vw] mb-[80vh] rounded bg-dark-0 border-[1px] border-dark-1" 
                        onSubmit={(e) => {
                            e.preventDefault(); 
                            addFile(formData);
                            setIsOpen(false);
                            setFormData({
                                name:"",
                                body:"",
                                type:"" 
                            })
                        }}>
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Filename"
                            value={formData.name} 
                            onChange={(e) => setFormData({...formData, name:e.target.value})}
                        />
                        <div className="d-flex gap-2 justify-content-end">
                            <button type="submit" className="btn btn-default">Add</button>
                            <button 
                                className="btn btn-default" 
                                onClick={() => {setIsOpen(false) && setFormData({
                                    name:"",
                                    body:"",
                                    type:"" 
                                })}}>
                                Back
                            </button>
                        </div>
                    </form>
                </div>
            )}
                    
            <section id="content" className="w-100 h-100 bg-dark-0">
                {selectedFile !== undefined && selectedFile !== null && selectedFile !== false ? (
                    <>
                        <nav className="d-flex w-100 bg-dark-1 gap-2">

                            <div className="d-flex gap-1 rounded-0 bg-dark-0 text-light-0 p-2">
                                <span>./{selectedFile.name}.{selectedFile.type}</span>
                                <button 
                                    className="d-flex justify-content-center align-items-center text-red-500 rounded-circle border-[1px] w-[25px] h-[25px] border-dark-1"
                                    onClick={() => {
                                        removeFile(selectedFile.name+'.'+selectedFile.type);
                                        setSelectedFile(false)
                                    }}
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
                    <div className="d-flex justify-content-center w-100">
                        <span className="text-white text-[4em] mt-[30vh]">
                            <h2 className="border-b-[1px] border-dark-5">edit.r</h2>
                        </span>
                    </div>
                )}
            </section>
        </>
    );
}