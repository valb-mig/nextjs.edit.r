import React from "react";

const Button = ({OnClick, Title, Icon}) => {
    
    return (
        <button 
            onClick={OnClick}
            className="btn btn-default text-center text-white rounded h-[40px]"
        >
            <div className="d-flex align-items-center gap-2 w-100">
                <span>{Icon}</span>{Title}
            </div>
        </button>
    );
}

export default Button;