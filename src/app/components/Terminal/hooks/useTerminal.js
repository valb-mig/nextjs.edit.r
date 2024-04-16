import executeCode from "@/utils/api/piston";

const useTerminal = (file, terminal, setTerminal) => {
	const runCode = async () => {

		setTerminal({
			...terminal,
			output: "",
			debug:  ""
		});

		if (file.body !== "") {
			let response = await executeCode(file);
			let codeResponse = {};

			if (
				response.run.stdout === undefined ||
				response.run.stdout === ""
			) {
				codeResponse = {
					type: "debug",
					value: response.run.stderr,
				};
			} else {
				codeResponse = {
					type: "output",
					value: response.run.stdout,
				};
			}

			setTerminal({
				...terminal,
				[codeResponse.type]: codeResponse.value,
			});
		}
	};

	return { runCode };
};

export default useTerminal;
