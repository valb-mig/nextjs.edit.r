"use client";

import React, { useState, useEffect } from "react";

import MonacoEditor, { loader } from "@monaco-editor/react";
import useFile from "@/app/hooks/useFile";
import getLanguage from "@/utils/helpers/getLanguage";

const Editor = ({ file }) => {
	const { editFile } = useFile();

	const [code, setCode] = useState();

	useEffect(() => {
		console.log("[Editor]: " + file.name + "." + file.type);
		setCode(file.body);
	}, [file]);

	const editCode = (newValue) => {
		console.info("[Changed]: ", newValue);
		setCode(newValue);
	};

	/*
	 *   Keyboard Actions
	 */

	useEffect(() => {
		function handleKeyDown(event) {
			if ((event.key === "s" || event.key === "S") && event.ctrlKey) {
				editFile(file, { ...file, body: code, state: "static" });
				event.preventDefault();
			}
		}
		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
		// If editFile is on effect, the component will be rendered over and over again
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [file, code]);

	/*
	 *   Component
	 */

	loader.init().then((monaco) => {
		monaco.editor.defineTheme("myTheme", {
			base: "vs-dark",
			inherit: true,
			rules: [],
			colors: {
				"editor.background": "#000000",
			},
		});
	});

	return (
		<MonacoEditor
			theme="myTheme"
			language={getLanguage(file.type).name}
			value={file.body}
			onChange={(newValue, e) => editCode(newValue)}
			options={{
				automaticLayout: true,
				fontFamily: "CaskaydiaCove Nerd Font",
				fontSize: 20,
				minimap: {
					enabled: false,
				},
			}}
		/>
	);
};

export default Editor;
