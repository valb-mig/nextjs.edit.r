'use client';

import React, { useState, useEffect } from "react";

import { useGlobalContext } from '@/config/context/global/store';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation'

import Sidebar from "@/app/components/Sidebar";
import Button  from "@/app/components/Button";
import Input   from "@/app/components/Input";
import Modal   from "@/app/components/Modal";

import useFile from "@/app/hooks/useFile";
import Icon    from "@/config/icons";

import getLanguage from '@/utils/helpers/getLanguage';

const Layout = ({ children }) => {
    
    const router = useRouter();

    const { addFile, removeFile } = useFile();
    const { storage, setStorage } = useGlobalContext();

    const [ modal, setModal ] = useState(false);
    const { handleSubmit, reset, register } = useForm();

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
    *   Keyboard actions
    */

    useEffect(() => {
        function handleKeyDown(event) {

            if (event.key === 'O' && event.shiftKey && event.altKey) {

                router.push('/');
                console.info('[shift + H ]: Go Home');

            } else if(event.key === 'N' && event.shiftKey && event.altKey) {

                setModal(!modal);
                console.info('[shift + N ]: New file');

            }
        }

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [modal]);

    return (
        <>
            <Sidebar.Root>
                <Sidebar.Body>
                    <Button 
                        OnClick={() => { router.push('/') }}
                        Icon={<Icon.Home/>}
                        Title="Home"
                        Format="full"
                    />
                    <Button 
                        OnClick={() => setModal(!modal)}
                        Icon={<Icon.File/>}
                        Title="Add file"
                        Format="full"
                    />
                    <Sidebar.Section Title="Files">
                        {storage.length > 0 ? (
                            storage.map((value, index) => (
                                <Button 
                                    key={index}
                                    OnClick={() => router.push('/edit/'+index)}
                                    Icon={getLanguage(value.type).icon}
                                    Title={value.name+'.'+value.type}
                                    // Selected={(file.name+'.'+file.type) == (value.name+'.'+value.type)}
                                    Format="full"
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
                <form className="flex gap-2 flex-col p-2 w-[30vw] mb-[80vh] rounded bg-dark-0 border-[1px] border-dark-1" onSubmit={handleSubmit(submitForm)}>
                    <Input Icon={<Icon.Comma/>} Name="commandInput" formState={register}/>
                    <button type="submit"/>
                </form>
            </Modal.Root>

            <section id="content" className="flex flex-col bg-dark-0 w-full overflow-x-hidden">
                { children }
            </section>
        </>
    );
}

export default Layout;