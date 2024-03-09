const SidebarSection = ({ children, Title }) => {
  return (
    <div className="flex w-100 py-2 flex-col gap-2">
      <span className="text-white text-center p-2 border-b-[1px] border-dark-3 text-2xl">
        {Title}
      </span>
      {children}
    </div>
  );
};

export default SidebarSection;
