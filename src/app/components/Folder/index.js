import React from "react";

import Link from "next/link";
import Icon from "@/config/icons";

const Folder = ({ Title, Path, Dropdown, Remove }) => {
    return(
        <button className="flex justify-between items-center p-1 rounded border-1 text-light-0 border-dark-2 bg-dark-1" onClick={Dropdown}>
            <div className="flex gap-1 items-center">
                <Icon.Folder/>
                <p className="truncate"> 
                    {Title} 
                    <span className="ml-1 text-dark-3">
                        <b>{Path}</b>
                    </span>
                </p>
            </div>
            <div onClick={Remove} className="text-dark-2">
                <Icon.Close />
            </div>
        </button>
    );
}

export default Folder;
