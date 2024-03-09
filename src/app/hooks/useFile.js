import { useGlobalContext } from "@/config/context/global/store";

const useFile = () => {
  const { storage, setStorage } = useGlobalContext();

  const getFiles = () => {
    console.info("[storage]: Updating storage!");

    let files = [];

    if (typeof localStorage !== "undefined") {
      const keys = Object.keys(localStorage);

      keys.forEach((key) => {
        if (key.startsWith("file[") && key.endsWith("]")) {
          const match = key.match(/\[(.*?)\]/);
          if (match) {
            const dataString = localStorage.getItem(key);
            if (dataString) {
              const data = JSON.parse(dataString);
              files.push({
                name: data.name,
                body: data.body,
                type: data.type,
                state: data.state,
                path: data.path,
              });
            }
          }
        }
      });
    }

    return files;
  };

  const addFile = (file) => {
    if (file !== undefined && file !== null && file !== "") {
      let filePath = "/";
      let name = "";
      let type = "";

      if (file.includes("(") && file.endsWith(")")) {
        //[TODO]: Verify if already have a file inside the same path

        let match = file.match(/\((.*?)\)/);
        filePath = match[1];

        let fileString = file.replace(match[0], "");

        name = fileString.split(".").slice(0, -1).join(".");
        type = fileString.split(".").pop();
      } else {
        name = file.split(".").slice(0, -1).join(".");
        type = file.split(".").pop();
      }

      localStorage.setItem(
        `file[${name + "." + type}]`,
        JSON.stringify({
          name: name,
          body: "",
          type: type,
          state: "static",
          path: filePath,
        }),
      );
    } else {
      console.error("[Erro]");
    }

    console.info("[Add]: ", file);

    // Update home useState
    setStorage({ ...storage, files: getFiles() });
  };

  const editFile = (file, editedFile) => {
    let item = `file[${file.name + "." + file.type}]`;

    console.log("[Edit]: " + item);

    let updatedFile = {
      name: editedFile.name,
      body: editedFile.body,
      type: editedFile.type,
      state: editedFile.state,
      path: file.path,
    };
    localStorage.setItem(item, JSON.stringify(updatedFile));

    console.log("[Edited]: ", updatedFile);

    // Update home useState
    setStorage({ ...storage, files: getFiles() });
  };

  const removeFile = (file) => {
    console.log("[Remove]: " + file.name + "." + file.type);
    localStorage.removeItem("file[" + file.name + "." + file.type + "]");

    // Update home useState
    setStorage({ ...storage, files: getFiles() });
  };

  return { getFiles, addFile, editFile, removeFile };
};

export default useFile;
