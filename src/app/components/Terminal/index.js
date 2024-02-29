import Icon from "@/config/icons";

const Terminal = ({output, open, setOpen}) => {
    return (
        (open &&
            <div id="debug" className="absolute bottom-0 h-[20vh] w-full border-t-[1px] border-t-dark-3 bg-dark-0 p-2 text-white flex flex-col resize-y">
                <header className="flex items-center justify-between mb-2 ">
                    <div className="flex items-center gap-3">
                        <span className="text-smcursor-pointer">Output</span>
                        <span className="text-sm text-zinc-700 hover:text-white cursor-pointer">Terminal</span>
                        <span className="text-sm text-zinc-700 hover:text-white cursor-pointer">Debug</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Icon.Minus className="cursor-pointer" onClick={() => setOpen(!open)}/>
                    </div>
                </header>
                <span>{">> " + output}</span>
            </div>
        )
    )
}

export default Terminal;