'use client';

import React, { useState, useEffect } from "react";

import { useGlobalContext } from '@/config/context/global/store';
import { useRouter } from 'next/navigation'

import Sidebar    from "@/app/components/Sidebar";
import Button     from "@/app/components/Button";
import LinkButton from "@/app/components/LinkButton";
import Input      from "@/app/components/Input";
import Modal      from "@/app/components/Modal";
import Tag        from "@/app/components/Tag";

import searchItemsJSON from "@/config/json/search_items.json";

import useCommandPallet from "@/app/hooks/useCommandPallet";
import Icon from "@/config/icons";

import getLanguage from '@/utils/helpers/getLanguage';

const PageTemplate = ({ children }) => {
    
    const router = useRouter();

    const { runPallet } = useCommandPallet();
    const { storage } = useGlobalContext();

    const [ modal,  setModal ]  = useState(false);
    const [ search, setSearch ] = useState("");

    const searchItems = searchItemsJSON.filter(obj => search.length > 0 ? obj.icon.includes(search[0]) : obj);

    const submitForm = () => {

        if(search != "") {
            if(runPallet(search)){
                console.log('Ok');
            }
        }

        setSearch("");
        setModal(!modal);
    }

    /* 
    *   Keyboard actions
    */

    useEffect(() => {
        function handleKeyDown(event) {

            if (event.key === 'O' && event.shiftKey && event.altKey) {

                router.push('/');
                console.info('[shift + H]: Go Home');

            } else if(event.key === 'N' && event.shiftKey && event.altKey) {

                setModal(!modal);
                console.info('[shift + N]: New file');

            }
            else if (event.key === 'Escape') {
                if(modal)
                {
                    setSearch("");
                    setModal(false);
                    console.log('[Close seach]');
                }
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
                    <div className="flex w-full gap-2">
                        <Button 
                            OnClick={() => { router.push('/') }}
                            Icon={<Icon.Home/>}
                            Format="circle"
                        />
                        <Button 
                            OnClick={() => setModal(!modal)}
                            Icon={<Icon.Terminal/>}
                            Format="circle"
                        />
                        <Button 
                            OnClick={() => {setModal(!modal); setSearch("+/")}}
                            Icon={<Icon.Folder/>}
                            Format="circle"
                        />
                    </div>
                    <Sidebar.Section Title="Files">
                        {storage.length > 0 ? (
                            storage.map((value, index) => (
                                <LinkButton 
                                    key={index}
                                    Url={'/edit/'+index}
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
                <form className="flex gap-2 flex-col p-2 w-[30vw] rounded bg-dark-0 border-[1px] border-dark-1" onSubmit={submitForm}>
                    <Input Icon={<Icon.Comma/>} Value={search} Name="commandInput" OnChange={(e) => setSearch(e.target.value)}/>
                    <div className="flex w-full flex-col justify-center rounded gap-1">
                        {searchItems.length > 0 ? (
                            searchItems.map((value, index) => (
                                <Tag key={index} Icon={value.icon} Title={value.title}/>
                            ))
                        ): search.length === 1 ? (
                            <div>
                                No command found :/
                            </div>
                        ):null}
                    </div>
                </form>
            </Modal.Root>

            <section id="content" className="flex flex-col bg-dark-0 w-full overflow-x-hidden">
                { children }
            </section>
        </>
    );
}

export default PageTemplate;