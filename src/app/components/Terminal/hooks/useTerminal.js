import executeCode from "@/utils/api/piston";

const useTerminal = (file, setTerminal, setTypedDebug, setTypedOutput) => {
	const runCode = async () => {
		setTypedOutput("");
		setTypedDebug("");

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

			let count = 1;

			const intervalId = setInterval(() => {
				if (codeResponse.type == "output") {
					setTypedOutput(codeResponse.value.substring(0, count));
				} else if (codeResponse.type == "debug") {
					setTypedDebug(codeResponse.value.substring(0, count));
				}
				count++;
			}, 10);

			setTimeout(() => {
				clearInterval(intervalId);
			}, codeResponse.value.length * 10);
		}
	};

	return { runCode };
};

export default useTerminal;
