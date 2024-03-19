import { useGlobalContext } from "@/config/context/global/store";

import File from "@/app/components/File";
import Folder from "@/app/components/Folder";

import useFolder from "@/app/hooks/useFolder";
import getLanguage from "@/utils/helpers/getLanguage";

const TreeView = ({ FilePath }) => {
    const fileId = FilePath.split("/")[2];

    const { removeFolder } = useFolder();
    const { storage } = useGlobalContext();

    return (
        <>
            {storage.folders.length > 0
                ? storage.folders.map((folder, folderIndex) => (
                    <div key={folderIndex} className="flex flex-col">
                        <Folder 
                            Title={folder.name} 
                            Path={"~"+folder.parent}
                            Dropdown={() => console.log('down')}
                            Remove={() => removeFolder(folder, folder.parent)}
                        />
                        <div>
                            <div className="flex flex-col ml-8 pt-2">
                                {storage.files.map((file, fileIndex) =>
                                    file.path ===
                                    folder.parent + folder.name ? (
                                        <File 
                                            key={fileIndex}
                                            Id={fileIndex} 
                                            Url={"/edit/" + fileIndex} 
                                            FileIcon={getLanguage(file.type).icon}
                                            Title={file.name + "." + file.type}
                                            Selected={fileIndex == fileId}
                                            Remove={(e) => {console.log('Remove')}}
                                        />
                                    ) : null,
                                )}
                            </div>
                        </div>
                    </div>
                  ))
                : null}

            {storage.files.length > 0 // Search for root files
                ? storage.files.map((file, fileIndex) =>
                    file.path == "/" ? (
                        <File 
                            key={fileIndex}
                            Id={fileIndex} 
                            Url={"/edit/" + fileIndex} 
                            FileIcon={getLanguage(file.type).icon}
                            Title={file.name + "." + file.type}
                            Selected={fileIndex == fileId}
                            Remove={(e) => {console.log('Remove')}}
                        />
                    ) : null,
                )
            : null}
        </>
    );
};

export default TreeView;
