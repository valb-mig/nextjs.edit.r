import { useGlobalContext } from "@/config/context/global/store";
import getRandomHash from "@/utils/helpers/getRandomHash";

const useFolder = () => {
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
        console.log("[Remove]: " + path + folder);
        localStorage.removeItem("folder[" + folder + "]");

        // Update home useState
        setStorage({ ...storage, folders: getFolders() });
    };

    return { getFolders, addFolder, removeFolder };
};

export default useFolder;
