"use client";

import React from "react";

import { useGlobalContext } from "@/config/context/global/store";
import { Panel, PanelGroup } from "react-resizable-panels";

import useFile from "@/app/hooks/useFile";
import Icon from "@/config/icons";

import getLanguage from "@/utils/helpers/getLanguage";

import Editor from "@/app/components/Editor";
import Terminal from "@/app/components/Terminal";

const Edit = ({ params }) => {
	
	const { storage } = useGlobalContext();
	const { removeFile } = useFile();

	const file = storage.files[params.id];

	return (
		<>
			{file != undefined ? (
				<div className="flex flex-col w-full h-full overflow-y-hidden relative">
					<nav className="flex justify-content-between align-items-center bg-dark-1 gap-2 border-b-[20px] border-dark-0">
						<div className="flex gap-1 ml-10 rounded-t-lg bg-dark-0 text-light-0 p-2">
							<span className="flex gap-1 align-items-center">
								{getLanguage(file.type).icon}
								{file.name}.{file.type} <span className="text-sm text-dark-3">~{file.path}</span>
								{file.state == "static" ? (
									<Icon.Close
										onClick={() => removeFile(file)}
									/>
								) : (
									<Icon.Dot className="animate-pulse" />
								)}
							</span>
						</div>
					</nav>
					<PanelGroup>
						<Panel maxSize={75}>
							<Editor file={file} />
						</Panel>
						<Terminal file={file} />
					</PanelGroup>
				</div>
			) : (
				<div className="flex flex-col w-full h-full items-center justify-center">
					{<Icon.Trash className="text-[5rem] text-dark-1" />}
					<span className="text-dark-2">{'"File removed"'}</span>
				</div>
			)}
		</>
	);
};

export default Edit;
