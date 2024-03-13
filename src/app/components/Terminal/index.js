"use client";

import React, { useState } from "react";
import { useGlobalContext } from "@/config/context/global/store";

import useTerminal from "@/app/components/Terminal/hooks/useTerminal";

import Button from "@/app/components/Button";
import Icon from "@/config/icons";

const Terminal = ({ file }) => {
    const { terminal, setTerminal } = useGlobalContext();
    const [typedOutput, setTypedOutput] = useState("");
    const [typedDebug, setTypedDebug] = useState("");

    const [terminalSection, setTerminalSection] = useState("Output");

    const { runCode } = useTerminal(
        file,
        setTerminal,
        setTypedDebug,
        setTypedOutput,
    );

    return (
        <div className="absolute bottom-0 w-full flex flex-col">
            <div className="flex w-full justify-content-end p-2">
                <Button
                    Icon={<Icon.Execute />}
                    Title="run"
                    OnClick={() => {
                        runCode();
                    }}
                    Type="primary"
                />
            </div>
            <div
                id="terminal"
                className="h-[20vh] border-t-[1px] border-t-dark-3 bg-dark-0 p-2 text-white"
            >
                <header className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                        {["Output", "Debug"].map((section, index) => (
                            <div key={index} className="flex">
                                <span
                                    className="text-sm cursor-pointer"
                                    onClick={() => setTerminalSection(section)}
                                >
                                    {section}
                                </span>
                                {section == "Output" && typedOutput != "" ? (
                                    <Icon.Dot className="animate-pulse" />
                                ) : section == "Debug" && typedDebug != "" ? (
                                    <Icon.Dot className="text-red-500 animate-ping" />
                                ) : null}
                            </div>
                        ))}
                    </div>
                </header>

                <section id="terminal-content">
                    <span
                        id="typing"
                        className="typing-animation break-words w-full"
                    >
                        {terminalSection === "Output" ? (
                            <span>
                                <span className="run">{">> "}</span>
                                {typedOutput}
                            </span>
                        ) : terminalSection === "Debug" ? (
                            <span>
                                <span className="debug">{"[!] "}</span>
                                {typedDebug}
                            </span>
                        ) : null}
                        <span className="cursor" />
                    </span>
                </section>
            </div>
        </div>
    );
};

export default Terminal;
