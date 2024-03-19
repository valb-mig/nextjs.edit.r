"use client";

import React, { useState } from "react";
import { useGlobalContext } from "@/config/context/global/store";
import { Panel, PanelResizeHandle } from "react-resizable-panels";

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
		<Panel maxSize={75} className="relative pt-2">
			<div className="absolute z-1 right-[5px] top-[15px]">
				<Button
					Icon={<Icon.Execute />}
					Title="run"
					OnClick={() => {
						runCode();
					}}
					Type="primary"
				/>
			</div>
			<PanelResizeHandle
				id="grabber"
				className="absolute top-[1px] left-[50%] text-white bg-dark-3 px-2 rounded z-3 cursor-row-resize"
			>
				<Icon.Grab />
			</PanelResizeHandle>
			<div
				id="terminal"
				className="h-[20vh] border-t-[1px] border-t-dark-3 bg-dark-0 p-2 text-white overflow-y-scroll"
			>
				<header className="flex items-center justify-between mb-2">
					<div className="flex items-center gap-3">
						{["Output", "Debug"].map((section, index) => (
							<div key={index} className="flex">
								<span
									className={
										"text-sm cursor-pointer p-1 rounded hover:bg-dark-1" +
										(terminalSection == section
											? " bg-dark-1"
											: "")
									}
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
		</Panel>
	);
};

export default Terminal;
