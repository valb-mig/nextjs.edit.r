'use client';

import React, { useState } from "react";
import { useGlobalContext } from '@/config/context/store';

import Layout  from "@/app/components/Layout";
import Editor  from "@/app/components/Editor";
import Tag     from "@/app/components/Tag";
import Button  from "@/app/components/Button";

import useFile from "@/app/hooks/useFile";
import Icon    from "@/config/icons";

import executeCode from '@/utils/api/piston';
import getLanguage from '@/utils/helpers/getLanguage';

const Home = () => {
    
    const { removeFile } = useFile();
    const { file, setFile } = useGlobalContext();
    const [ debug, setDebug ] = useState("");

    const removeSelectedFile = () => {
        removeFile();
        setFile({});
    }

    const runCode = async () => {
        let response = await executeCode(file);
        setDebug(response.run.output);
    }

    return (
        <>
            <Layout>
                {Object.keys(file).length !== 0 ? (
                    <div className="flex flex-col w-full h-full overflow-y-hidden relative">
                        <nav className="flex justify-content-between align-items-center bg-dark-1 gap-2 border-b-[20px] border-dark-0">
                            <div className="flex gap-1 rounded-0 bg-dark-0 text-light-0 p-2">
                                <span className="flex gap-1 align-items-center">
                                    {getLanguage(file.type).icon}{file.name}.{file.type}
                                </span>
                                <button 
                                    className="d-flex justify-content-center align-items-center text-red-500 rounded-circle border-[1px] w-[25px] h-[25px] border-dark-1"
                                    onClick={() => removeSelectedFile()}
                                >
                                    <Icon.Close/>
                                </button>
                            </div>
                            <Button Icon={<Icon.Execute/>} OnClick={() => runCode()} Style="w-full h-[40px]"/>
                        </nav>
                        <Editor lang={file.type}/>
                        {debug != "" && (
                            <div id="debug" className="absolute bottom-0 h-[20vh] w-full border-t-[1px] border-t-dark-3 bg-dark-0 p-2 text-white">
                                {">> "+debug}
                            </div>
                        )}
                    </div>
                ):(
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
                )}
            </Layout>
        </>
    );
}

export default Home;