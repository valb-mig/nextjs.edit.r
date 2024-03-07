const Tag = ({ Icon, Title }) => {
    return(
        <span className="flex w-full items-center justify-start text-light-0 rounded p-1 gap-1">
            {Icon != undefined ? (
                <>
                    <div className="flex justify-center items-center h-[2rem] w-[2rem] bg-dark-1 border-1 border-dark-2 rounded">
                        {Icon}
                    </div>
                    {Title}
                </>
            ):(
                <div className="flex justify-center items-center p-1 bg-dark-1 border-1 border-dark-2 rounded">
                    {Title}
                </div>
            )}
        </span>
    );
}

export default Tag;