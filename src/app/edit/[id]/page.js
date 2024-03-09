"use client";

import React from "react";

import { useGlobalContext } from "@/config/context/global/store";

import useFile from "@/app/hooks/useFile";
import Icon from "@/config/icons";

import getLanguage from "@/utils/helpers/getLanguage";

import PageTemplate from "@/app/components/PageTemplate";
import Editor from "@/app/components/Editor";
import Terminal from "@/app/components/Terminal";

const Edit = ({ params }) => {
  const { storage } = useGlobalContext();
  const { removeFile } = useFile();

  const file = storage.files[params.id];

  const removeSelectedFile = () => {
    removeFile(file);
  };

  return (
    <PageTemplate>
      {file != undefined && (
        <div className="flex flex-col w-full h-full overflow-y-hidden relative">
          <nav className="flex justify-content-between align-items-center bg-dark-1 gap-2 border-b-[20px] border-dark-0">
            <div className="flex gap-1 rounded-0 bg-dark-0 text-light-0 p-2">
              <span className="flex gap-1 align-items-center">
                {getLanguage(file.type).icon}
                {file.name}.{file.type}
                {file.state == "static" ? (
                  <Icon.Close onClick={() => removeSelectedFile()} />
                ) : (
                  <Icon.Dot className="animate-pulse" />
                )}
              </span>
            </div>
          </nav>
          <Editor file={file} />
          <Terminal file={file} />
        </div>
      )}
    </PageTemplate>
  );
};

export default Edit;
