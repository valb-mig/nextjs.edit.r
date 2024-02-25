'use client';

import React, { useState } from "react";

import File    from "@/app/components/Files";
import Editor  from "@/app/components/Editor";

import useFile from "@/app/hooks/useFile";
import Icon    from "@/config/icons";

export default function Home()
{
    const [ files, setFiles ]   = useState([]);
    const { addFile, getFiles } = useFile(setFiles);

    const [ selectedFile, setSelectedFile ] = useState(false);

    const [ formData, setFormData ] = useState({
        name:"",
        body:""
    })

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <File.Root>
                <File.Body>
                    <button onClick={() => {setIsOpen(true)}} className="btn btn-default text-center text-white rounded-circle w-[40px] h-[40px]">
                        <Icon.File/>
                    </button>
                    <button className="btn btn-default text-center text-white rounded-circle w-[40px] h-[40px]">
                        <Icon.Close/>
                    </button>
                    <button onClick={() => setSelectedFile(false)} className="btn btn-default text-center text-white rounded-circle w-[40px] h-[40px]">
                        <Icon.Home/>
                    </button>
                </File.Body>
                {getFiles().length > 0 && (
                    getFiles().map((value, index) => (
                        <span 
                            id={value.name} 
                            key={value.name} 
                            className="btn btn-default text-light-0"
                            onClick={() => {setSelectedFile(value)}}
                        >
                            {value.name+'.'+value.type}
                        </span>
                    ))
                )}
            </File.Root>

            {isOpen && (
                <div id="add-modal" className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 ${isOpen ? '' : 'hidden'}" style={{zIndex:"999"}}>
                    <form 
                        className="d-flex flex-column p-2 w-[30vw] rounded bg-dark-0 border-[1px] border-dark-1" 
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
                                Voltar
                            </button>
                        </div>
                    </form>
                </div>
            )}
                    
            <section id="content" className="w-100 h-100 bg-dark-0">
                {selectedFile !== undefined && selectedFile !== null && selectedFile !== false ? (
                    <>
                        <nav className="d-flex w-100 bg-dark-1 gap-2">
                            <button className="btn btn-default rounded-0 bg-dark-0 text-light-0">
                                <span>./{selectedFile.name}.{selectedFile.type}</span>
                            </button>
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