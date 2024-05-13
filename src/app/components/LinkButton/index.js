import React from "react";

import Link from "next/link";

const LinkButton = ({ Url, Title, Icon, Type, Style, Format, Selected }) => {
	let buttonClasses =
		"flex p-2 transition-all gap-2 align-items-center rounded border-[1px] ";

	switch (Format) {
		case "full":
			buttonClasses += "w-full ";
			break;
		case "circle":
			buttonClasses += "w-[40px] h-[40px] rounded-full ";
			break;
		default:
			break;
	}

	buttonClasses +=
		Style === "primary"
			? "text-dark-0 bg-light-2 border-light-0 hover:bg-light-1 hover:border-light-3"
			: Selected
				? "text-white bg-dark-1 border-dark-2 hover:bg-dark-2 hover:border-dark-3"
				: "text-white bg-dark-0 border-[1px] border-dark-1 hover:bg-dark-1 hover:border-[1px] hover:border-dark-2";

	return (
		<Link href={Url} type={Type} className={buttonClasses}>
			<div className="flex gap-1 items-center justify-center w-full">
				<span>{Icon}</span>
				{Title}
			</div>
		</Link>
	);
};

export default LinkButton;
