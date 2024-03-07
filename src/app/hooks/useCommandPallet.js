import useFile from '@/app/hooks/useFile';

const useCommandPallet = () => {

    const { addFile, removeFile } = useFile();

    const runPallet = (command) => {

        if(command.includes('>')) // Run command
        {

        }
        else if(command.includes('+')) // Add
        {
            let file = command.replace(/\+/g, '');
            let type = file.split('.').pop();

            if(file != '' && file.includes('.') && type != "")
            {
                addFile(file);
                return true;
            }
        }
        else if(command.includes('-')) // Remove
        {
            let file = command.replace(/\-/g, '');
            
            let name = file.split('.').slice(0, -1).join('.');
            let type = file.split('.').pop();

            if(file != '' && file.includes('.') && type != "")
            {
                removeFile({name: name, type: type});
                return true;
            }
        }
        else
        {
            console.log('Comando não encontrado');
        }

        return false
    }

    return { runPallet };
}

export default useCommandPallet;