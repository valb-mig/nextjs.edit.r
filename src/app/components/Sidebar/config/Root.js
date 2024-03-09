const SidebarRoot = ({ children }) => {
  return (
    <div className="flex flex-col justify-content-between bg-dark-0 w-[12rem] h-full p-2 border-r-[1px] border-dark-3">
      <div className="flex flex-col">{children}</div>
      <span className="flex justify-content-center w-100 text-dark-3">
        <a href="https://github.com/valb-mig/edit.r" target="__blank">
          <small>
            <i>made by valb.mig</i>
          </small>
        </a>
      </span>
    </div>
  );
};

export default SidebarRoot;
