import React from "react";

import Link from "next/link";
import Icon from "@/config/icons";

const File = ({ Id, Url, FileIcon, Title, Remove, Selected }) => {
	return (
		<Link
			id={Id}
			href={Url}
			className={
				"flex no-underline justify-between items-center p-1 rounded border-1 transition-all text-light-0" +
				(Selected
					? " border-dark-2 bg-dark-1 active:border-dark-3 active:bg-dark-1"
					: " border-dark-1 hover:bg-dark-1 active:border-dark-2 active:bg-dark-0")
			}
		>
			<span className="flex gap-1 items-center">
				{FileIcon}
				<p>{Title}</p>
			</span>
			<span onClick={Remove} className="text-dark-2">
				<Icon.Close />
			</span>
		</Link>
	);
};

export default File;
