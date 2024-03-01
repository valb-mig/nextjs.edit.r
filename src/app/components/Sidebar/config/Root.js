const SidebarRoot = ({children}) => {
    return (
        <div className="flex flex-col justify-content-between bg-dark-0 w-40 h-100 p-2 border-r-[1px] border-dark-3">
            <div className="flex flex-col">
                {children}
            </div>
            <span className="flex justify-content-center w-100 text-dark-3">
                <small><i>made by mig</i></small>
            </span>
        </div>
    );
}

export default SidebarRoot;