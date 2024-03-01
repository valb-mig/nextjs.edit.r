const Tag = ({ Title }) => {
    return(
        <span className="flex gap-1 p-1 align-items-center text-sm rounded bg-dark-1 border-[1px] border-dark-2">
            {Title}
        </span>
    );
}

export default Tag;