const useFile = (setFiles) => {

    const getFiles = () => {
        
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

    const addFile = (formData) => {

        if(formData !== undefined && formData !== null && formData.name !== "")
        {
            let file = `file[${formData.name.split('.').slice(0, -1).join('.')+'.'+formData.name.split('.').pop()}]`;

            localStorage.setItem(file, JSON.stringify({
                name: formData.name.split('.').slice(0, -1).join('.'),
                body: formData.body,
                type: formData.name.split('.').pop()
            }));
    
            setFiles(getFiles());
        }
    }

    const editFile = (file) => {

        let item = `file[${file.name+'.'+file.type}]`;

        console.log(item);

        localStorage.setItem(item, JSON.stringify({
            name: file.name,
            body: file.body,
            type: file.type
        }));

        setFiles(getFiles());
    }

    const removeFile = (name) => {
        localStorage.removeItem('file['+name+']');
        setFiles(getFiles());
    }

    return { getFiles, addFile, editFile, removeFile };
}

export default useFile;