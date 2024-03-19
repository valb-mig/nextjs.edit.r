import { useGlobalContext } from "@/config/context/global/store";
import getRandomHash from "@/utils/helpers/getRandomHash";
import useFile from "@/app/hooks/useFile";

const useFolder = () => {
	const { getFiles } = useFile();
	const { storage, setStorage } = useGlobalContext();

	const getFolders = () => {
		console.info("[storage]: Updating storage!");

		let folders = [];

		if (typeof localStorage !== "undefined") {
			const keys = Object.keys(localStorage);

			keys.forEach((key) => {
				if (key.startsWith("folder[") && key.endsWith("]")) {
					const match = key.match(/\[(.*?)\]/);
					if (match) {
						const dataString = localStorage.getItem(key);
						if (dataString) {
							const data = JSON.parse(dataString);
							folders.push({
								name: data.name,
								parent: data.parent,
								key: match[1],
							});
						}
					}
				}
			});
		}

		return folders;
	};

	const addFolder = (folder) => {
		if (folder !== undefined && folder !== null && folder !== "") {
			let folders = folder.split("/");

			let lastPath = "/";

			folders.map((value, index) => {
				let name = value;
				let parent = lastPath;
				let hash = getRandomHash(5);

				localStorage.setItem(
					`folder[${hash + value}]`,
					JSON.stringify({
						name: name,
						parent: parent,
					}),
				);

				lastPath += value + "/";
			});
		} else {
			console.error("[Erro]");
		}

		console.info("[Add]: ", folder);

		// Update home useState
		setStorage({ ...storage, folders: getFolders() });
	};

	const removeFolder = (folder, path) => {
		console.log("[Remove]: " + path + folder.key);

		localStorage.removeItem("folder[" + folder.key + "]");

		getFiles().map((file, index) => {
			if (file.path === path + folder.name) {
				localStorage.removeItem(
					"file[" + file.name + "." + file.type + "]",
				);
			}
		});

		// Update home useState
		setStorage({
			files: getFiles(),
			folders: getFolders(),
		});
	};

	return { getFolders, addFolder, removeFolder };
};

export default useFolder;
