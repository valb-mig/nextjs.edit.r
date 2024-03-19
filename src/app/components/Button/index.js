import React from "react";

import { tv } from "tailwind-variants";

const button = tv({
    base: "rounded relative flex p-1 text-light-0 bg-dark-0 border-1 border-dark-1 hover:bg-dark-1 hover:border-dark-2 justify-betwween",
    variants: {
        type: {
            primary:
                "text-dark-0 bg-light-2 border border-light-0 hover:bg-light-1 hover:border-[1px] hover:border-light-3",
            secondary: "",
            success: "",
            error: "",
        },
        format: {
            circle: "w-[2.5rem] h-[2.5rem]",
            full: "w-full h-[2.5rem]",
        },
    },
});

const Button = ({ OnClick, Title, Icon, Type, Attributes, Disabled, children }) => {
    return (
        <button
            onClick={OnClick}
            type={Type}
            className={button({
                type: Type,
                format: Attributes != undefined ? Attributes.format : "",
            })}
            disabled={Disabled}
        >
            <div className="flex gap-1 items-center justify-center w-full">
                <span>{Icon}</span>
                {Title}
            </div>
            {children}
        </button>
    );
};

export default Button;
