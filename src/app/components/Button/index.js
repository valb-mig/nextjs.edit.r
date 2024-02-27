import React from "react";

const Button = ({ OnClick, Title, Icon, Selected, Type }) => {
    
    return (
        <button 
            onClick={OnClick}
            className={"d-flex align-items-center w-100 text-white rounded h-[40px] hover:border-[1px] hover:border-dark-3"+(
                Selected == true ? " bg-dark-1 border-[1px] border-dark-3" : ""
            )+(
                Type == 'submit' ? " border-[1px] border-dark-1" : ""
            )}
            type={Type}
        >
            <div className="d-flex align-items-center justify-content-center gap-2 w-100">
                <span>{Icon}</span>{Title}
            </div>
        </button>
    );
}

export default Button;