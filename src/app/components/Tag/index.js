const Tag = ({ Icon, Title, OnClick }) => {
    return (
        <span
            className="flex items-center text-light-0 rounded"
            onClick={OnClick}
        >
            {Icon != undefined ? (
                <>
                    <div className="flex justify-center items-center h-[2rem] w-[2rem] bg-dark-1 border-1 border-dark-2 rounded">
                        {Icon}
                    </div>
                    <span className="text-[0.8rem] ml-2">
                        {Title}
                    </span>
                </>
            ) : (
                <div className="flex justify-center items-center p-1 bg-dark-1 border-1 border-dark-2 rounded text-sm">
                    {Title}
                </div>
            )}
        </span>
    );
};

export default Tag;
