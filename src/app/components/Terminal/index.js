'use client';

import React, { useEffect, useState } from "react";
import { useGlobalContext } from '@/config/context/global/store';

import executeCode from '@/utils/api/piston';

import Button from "@/app/components/Button";
import Icon   from "@/config/icons";

const Terminal = ({ file }) => {

    const { terminal, setTerminal }   = useGlobalContext();
    const [ typedText, setTypedText ] = useState('');

    const runCode = async () => {

        setTypedText('');

        if(file.body !== "")
        {
            let response = await executeCode(file);

            if(response.run.output === undefined)
            {
                setTerminal({
                    ...terminal, 
                    debug: response.run.stderr
                })
            }
            else
            {
                setTerminal({
                    ...terminal, 
                    output: response.run.output
                })
    
                let count = 1;
    
                const intervalId = setInterval(() => {
    
                    setTypedText(
                        response.run.output.substring(0, count)
                    );
    
                    count++;
                }, 50);
    
                setTimeout(() => {
                    clearInterval(intervalId);
                }, response.run.output.length * 50);
            }
        }
    }

    return (
        <div className="absolute bottom-0 w-full flex flex-col">
            <div className="flex w-full justify-content-end p-2">
                <Button Icon={<Icon.Execute/>} Title="run" OnClick={() => {runCode()}} Style="primary"/>
            </div>
            <div id="terminal" className="h-[20vh] border-t-[1px] border-t-dark-3 bg-dark-0 p-2 text-white">
                <header className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                        <span className="text-smcursor-pointer">Output</span>
                        <span className="text-sm text-zinc-700 hover:text-white cursor-pointer">Terminal</span>
                        <span className="text-sm text-zinc-700 hover:text-white cursor-pointer">Debug</span>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* <Icon.Minus className="cursor-pointer" onClick={() => setOpen(!open)}/> */}
                    </div>
                </header>
                <span id="typing" className="typing-animation break-words w-full">
                    <span className="run">{">> "}</span>{typedText}<span className="cursor"/>
                </span>
            </div>
        </div>
    )
}

export default Terminal;