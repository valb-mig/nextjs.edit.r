'use client';

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

import { useGlobalContext } from '@/config/context/global/store';

import useFile from "@/app/hooks/useFile";
import Icon    from "@/config/icons";

import getLanguage from '@/utils/helpers/getLanguage';

import Layout   from "@/app/components/Layout";
import Editor   from "@/app/components/Editor";
import Terminal from "@/app/components/Terminal";

const Edit = ({ params }) => {

    const router = useRouter();

    const { storage } = useGlobalContext();
    const { removeFile } = useFile();
    
    const file = storage[params.id];

    const removeSelectedFile = () => { removeFile(file) }

    return (
        <Layout>
            {file != undefined && (
                <div className="flex flex-col w-full h-full overflow-y-hidden relative">
                    <nav className="flex justify-content-between align-items-center bg-dark-1 gap-2 border-b-[20px] border-dark-0">
                        <div className="flex gap-1 rounded-0 bg-dark-0 text-light-0 p-2">
                            <span className="flex gap-1 align-items-center">
                                {getLanguage(file.type).icon}{file.name}.{file.type}

                                {file.state == "static" ? (
                                    <Icon.Close onClick={() => removeSelectedFile()}/>
                                ):(
                                    <Icon.Dot/>
                                )}
                            </span>
                        </div>
                    </nav>
                    <Editor file={file}/>
                    <Terminal file={file}/>                    
                </div>
            )}
        </Layout>
    );
}

export default Edit;