import useFile from "@/app/hooks/useFile";
import useFolder from "@/app/hooks/useFolder";

const useCommandPalette = () => {
	const { addFile, removeFile } = useFile();
	const { addFolder } = useFolder();

	const runPalette = (command) => {
		if (command[0] == ">") {
			// Run command
		} else if (command[0] == "+") {
			// Add
			if (command[1] == "/") {
				// Create folder

				let folder = command.replace(/\+\//g, "");

				if (folder != "") {
					addFolder(folder);
					return true;
				}
			} else {
				// Create file

				let file = command.replace(/\+/g, "");
				let type = file.split(".").pop();

				if (file != "" && file.includes(".") && type != "") {
					addFile(file);
					return true;
				}
			}
		} else if (command[0] == "-") {
			// Remove
			let file = command.replace(/\-/g, "");

			let name = file.split(".").slice(0, -1).join(".");
			let type = file.split(".").pop();

			if (file != "" && file.includes(".") && type != "") {
				removeFile({ name: name, type: type });
				return true;
			}
		} else {
			console.log("Comando não encontrado");
		}

		return false;
	};

	return { runPalette };
};

export default useCommandPalette;
