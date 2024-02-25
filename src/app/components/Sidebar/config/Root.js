const SidebarRoot = ({children}) => {
    return (
        <div className="d-flex flex-column justify-content-between bg-dark-0 w-40 h-100 p-2 border-r-[1px] border-dark-3">
            <div className="d-flex flex-column">
                {children}
            </div>
            <span className="d-flex justify-content-center w-100 text-dark-3">
                made by mig
            </span>
        </div>
    );
}

export default SidebarRoot;