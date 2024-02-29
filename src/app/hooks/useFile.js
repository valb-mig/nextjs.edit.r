import { useGlobalContext } from '@/config/context/store';

const useFile = () => {

    const { file, setFile, setStorage } = useGlobalContext();

    const getFiles = () => {
        
        console.info('[storage]: Updating storage!');

        let files = [];
        
        if(typeof localStorage !== 'undefined')
        {
            const keys = Object.keys(localStorage);
    
            keys.forEach(key => {
                if (key.startsWith('file[') && key.endsWith(']')) {
                    const match = key.match(/\[(.*?)\]/);
                    if (match) {
                        const dataString = localStorage.getItem(key);
                        if (dataString) {
                            const data = JSON.parse(dataString);
                            files.push({
                                name: data.name,
                                body: data.body,
                                type: data.type
                            });
                        }
                    }
                }
            });
        }

        return files;
    }

    const addFile = (file) => {

        console.info('[Add]');

        if(file !== undefined && file !== null && file !== "")
        {
            let name = file.split('.').slice(0, -1).join('.');
            let type = file.split('.').pop();

            localStorage.setItem(`file[${file}]`, JSON.stringify({
                name: name,
                body: "",
                type: type
            }));
        }
        else
        {
            console.error("[Erro]");
        }
    
        // Update home useState
        setStorage(getFiles());
    }

    const editFile = (editedFile) => {

        let item = `file[${file.name+'.'+file.type}]`;

        console.log("[Edit]: "+item);

        let updatedFile = {
            name: editedFile.name,
            body: editedFile.body,
            type: editedFile.type
        }
        localStorage.setItem(item, JSON.stringify(updatedFile));

        console.log("[Edited]: ", updatedFile);

        // Update home useState
        setFile(updatedFile);
        setStorage(getFiles());
    }

    const removeFile = () => {

        console.log('[Remove]: '+file.name+'.'+file.type);
        localStorage.removeItem('file['+file.name+'.'+file.type+']');

        // Update home useState
        setStorage(getFiles());
    }

    return { getFiles, addFile, editFile, removeFile };
}

export default useFile;