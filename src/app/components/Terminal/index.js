'use client';

import React, { useState } from "react";
import { useGlobalContext } from '@/config/context/global/store';

import executeCode from '@/utils/api/piston';

import Button from "@/app/components/Button";
import Icon   from "@/config/icons";

const Terminal = ({ file }) => {

    const { terminal, setTerminal } = useGlobalContext();

    const [ typedOutput, setTypedOutput ] = useState('');
    const [ typedDebug, setTypedDebug ] = useState('');

    const [ terminalSection, setTerminalSection ] = useState('Output');

    const runCode = async () => {

        setTypedOutput('');
        setTypedDebug('');

        if(file.body !== "")
        {
            let response = await executeCode(file);
            let codeResponse = {};

            if(response.run.stdout === undefined || response.run.stdout === '')
            {
                codeResponse = {
                    type: 'debug',
                    value: response.run.stderr
                };
            }
            else
            {
                codeResponse = {
                    type: 'output',
                    value: response.run.stdout
                };
            }

            setTerminal({
                ...terminal, 
                [codeResponse.type]: codeResponse.value
            })

            let count = 1;
    
            const intervalId = setInterval(() => {
                if(codeResponse.type == "output")
                {
                    setTypedOutput(codeResponse.value.substring(0, count));
                }
                else if(codeResponse.type == "debug")
                {
                    setTypedDebug(codeResponse.value.substring(0, count));
                }
                count++;
            }, 50);

            setTimeout(() => {
                clearInterval(intervalId);
            }, codeResponse.value.length * 50);
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
                        {['Output', 'Debug'].map((section, index) => (
                            <div key={index} className="flex">
                                <span className="text-sm cursor-pointer" onClick={() => setTerminalSection(section)}>
                                    {section}
                                </span>
                                {section == 'Output' && typedOutput != '' ? (
                                    <Icon.Dot className="animate-pulse"/>
                                ): section == 'Debug' && typedDebug != '' ? (
                                    <Icon.Dot className="text-red-500 animate-ping"/>
                                ):null}
                            </div>
                        ))}
                    </div>
                </header>

                <section id="terminal-content">
                    <span id="typing" className="typing-animation break-words w-full">
                        {terminalSection === "Output" ? (
                            <span>
                                <span className="run">{'>> '}</span>{typedOutput}
                            </span>
                        ) : terminalSection === "Debug" ? (
                            <span>
                                <span className="debug">{'[!] '}</span>{typedDebug}
                            </span>
                        ) : null}
                        <span className="cursor"/>
                    </span>
                </section>
            </div>
        </div>
    )
}

export default Terminal;