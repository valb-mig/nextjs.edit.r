'use client';

import React, { useState, useEffect } from "react";
import { useGlobalContext } from '@/config/context/store';
import { useForm } from "react-hook-form";

import Sidebar from "@/app/components/Sidebar";
import Button  from "@/app/components/Button";
import Input   from "@/app/components/Input";
import Modal   from "@/app/components/Modal";

import useFile from "@/app/hooks/useFile";
import Icon    from "@/config/icons";

import getLanguage from '@/utils/helpers/getLanguage';

const Layout = ({ children }) => {
    
    const { addFile, removeFile, getFiles } = useFile();
    const { file, setFile, storage, setStorage } = useGlobalContext();

    const [ modal, setModal ] = useState(false);
    const { handleSubmit, reset, register } = useForm();

    const removeSelectedFile = () => {
        removeFile();
        setFile({});
    }

    const submitForm = (form) => {

        if(form.commandInput != "") {

            if(true) { // [TODO]: Check command prefix
                addFile(form.commandInput);
            }
        }

        reset();
        setModal(!modal);
    }

    /* 
    *   Get storage files
    */

    useEffect(() => {
        setStorage(getFiles());
    },[]);

    /* 
    *   Keyboard actions
    */

    useEffect(() => {
        function handleKeyDown(event) {

            if (event.key === 'H' && event.shiftKey) {

                if(file !== false) {
                    setFile({});
                }
                console.info('[shift + H ]: Go Home');

            } else if(event.key === 'N' && event.shiftKey && event.altKey) {

                setModal(!modal);
                console.info('[shift + N ]: New file');

            } else if(event.key === 'W' && event.shiftKey && event.altKey) {

                if(file !== false) {
                    removeSelectedFile();
                    console.info('[shift + alt + W ]: Delete file');
                }
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [file, modal]);

    return (
        <>
            <Sidebar.Root>
                <Sidebar.Body>
                    <Button 
                        OnClick={() => setFile({})}
                        Icon={<Icon.Home/>}
                        Title="Home"
                    />
                    <Button 
                        OnClick={() => setModal(!modal)}
                        Icon={<Icon.File/>}
                        Title="Add file"
                    />
                    <Sidebar.Section Title="Files">
                        {storage.length > 0 ? (
                            storage.map((value, index) => (
                                <Button 
                                    key={index}
                                    OnClick={() => setFile(value)}
                                    Icon={getLanguage(value.type).icon}
                                    Title={value.name+'.'+value.type}
                                    Selected={(file.name+'.'+file.type) == (value.name+'.'+value.type)}
                                    Style="justify-content-start"
                                />
                            ))
                        ):(
                            <span className="flex justify-content-center gap-2 text-dark-4 text-sm">
                                Empty
                            </span>
                        )}
                    </Sidebar.Section>
                </Sidebar.Body>
            </Sidebar.Root>

            <Modal.Root Id="command-palette" Show={modal}>
                <form className="d-flex gap-2 flex-column p-2 w-[30vw] mb-[80vh] rounded bg-dark-0 border-[1px] border-dark-1" onSubmit={handleSubmit(submitForm)}>
                    <Input Icon={<Icon.Comma/>} Name="commandInput" formState={register}/>
                    <button type="submit"/>
                </form>
            </Modal.Root>

            <section id="content" className="flex flex-column w-full bg-dark-0 overflow-x-hidden">
                { children }
            </section>
        </>
    );
}

export default Layout;