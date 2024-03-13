import { useGlobalContext } from "@/config/context/global/store";

import Icon from "@/config/icons";

import Button from "@/app/components/Button";
import LinkButton from "@/app/components/LinkButton";
import Tag from "@/app/components/Tag";

import useFolder from "@/app/hooks/useFolder";
import getLanguage from "@/utils/helpers/getLanguage";

const RootTreeView = ({ FilePath }) => {
    const fileId = FilePath.split("/")[2];

    const { removeFolder } = useFolder();
    const { storage } = useGlobalContext();

    return (
        <>
            {storage.folders.length > 0 // [TODO]: Move to treeview component
                ? storage.folders.map((folder, folderIndex) => (
                      <div key={folderIndex} className="flex flex-col gap-2">
                          <Button
                              Icon={<Icon.Folder />}
                              Title={folder.name}
                              Attributes={{ format: "full" }}
                          >
                              <Tag
                                  Icon={<Icon.Close />}
                                  Attributes={{ format: "full" }}
                                  OnClick={() =>
                                      removeFolder(folder.key, folder.parent)
                                  }
                              />
                          </Button>
                          <div className="border-l border-dark-1">
                              <div className="flex flex-col gap-1 ml-4">
                                  {storage.files.map((file, fileIndex) =>
                                      file.path ===
                                      folder.parent + folder.name ? (
                                          <LinkButton
                                              key={fileIndex}
                                              Url={"/edit/" + fileIndex}
                                              Icon={getLanguage(file.type).icon}
                                              Title={
                                                  file.name + "." + file.type
                                              }
                                              Selected={fileIndex == fileId}
                                              Format="full"
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
                          <LinkButton
                              key={fileIndex}
                              Url={"/edit/" + fileIndex}
                              Icon={getLanguage(file.type).icon}
                              Title={file.name + "." + file.type}
                              Selected={fileIndex == fileId}
                              Format="full"
                          />
                      ) : null,
                  )
                : null}
        </>
    );
};

export default RootTreeView;
