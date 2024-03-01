import React from "react";

const Button = ({ OnClick, Title, Icon, Type, Style, Format }) => {

    return (
        <button 
            onClick={OnClick}
            type={Type}
            className="flex"
        >
            <div className={"flex p-2 gap-2 align-items-center rounded border-[1px]"+(
                Style == "primary" ? 
                    " text-dark-0 bg-light-2 border-[1px] border-light-0 hover:bg-light-1 hover:border-[1px] hover:border-light-3" 
                    : 
                    " text-white bg-dark-0 border-[1px] border-dark-1 hover:bg-dark-1 hover:border-[1px] hover:border-dark-2")+(
                Format == "full" ? " w-full " : ""      
                )
                }>
                <span>{Icon}</span>{Title}
            </div>
        </button>
    );
}

export default Button;