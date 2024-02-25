const FilesRoot = ({children}) => {
    return (
        <div className="d-flex flex-column justify-content-start bg-dark-0 w-40 h-100 p-2 border-r-[1px] border-dark-3">
            <span className="text-white text-center p-2 border-b-[1px] border-dark-3 text-2xl">
                Files
            </span>

            <div className="d-flex flex-column gap-2">
                {children}
            </div>
        </div>
    );
}

export default FilesRoot;