import React from "react";

const Button = ({ OnClick, Title, Icon, Selected, Type, Style }) => {

    return (
        <button 
            onClick={OnClick}
            className={"d-flex align-items-center text-white rounded h-[40px] border-[1px] hover:border-[1px] hover:border-dark-3"+(
                Selected == true ? " bg-dark-1 border-[1px] border-dark-3" : " border-dark-0"
            )+(
                Type == 'submit' ? " border-[1px] border-dark-1" : ""
            )}
            type={Type}
        >
            <div className={"d-flex align-items-center "+Style+" m-2 gap-2"}>
                <span>{Icon}</span>{Title}
            </div>
        </button>
    );
}

export default Button;