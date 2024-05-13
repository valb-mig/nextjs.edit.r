import React, { useState } from "react";

import Icon from "@/config/icons";
import Button from "@/app/components/Button";

const SidebarRoot = ({ children }) => {
	const [showSidebar, setShowSidebar] = useState(true);

	return (
		<div className="flex relative z-[999]">
			{showSidebar && (
				<div className="flex flex-col justify-content-between bg-dark-0 w-[12rem] h-full p-2 border-r-[1px] border-dark-3">
					<div className="flex flex-col">{children}</div>
					<span className="flex justify-content-center w-100">
						<a
							href="https://github.com/valb-mig/nextjs.edit.r"
							target="__blank"
							className="text-dark-3 no-underline"
						>
							<small>
								<i>made by valb.mig</i>
							</small>
						</a>
					</span>
				</div>
			)}
			<div className="flex absolute right-[-2rem] top-[0.5rem]">
				<Button
					Icon={
						showSidebar ? (
							<Icon.SidebarRight />
						) : (
							<Icon.SidebarLeft />
						)
					}
					OnClick={() => setShowSidebar(!showSidebar)}
				/>
			</div>
		</div>
	);
};

export default SidebarRoot;
