const Input = ({Icon, Name, formState}) => {
    return(
        <div className="flex align-items-center gap-1 rounded p-2 text-white bg-dark-1">
            <span>{Icon}</span>
            <input 
                type="text"
                className="w-full bg-transparent outline-none"
                {...formState(Name)}
                autoFocus={true}
            />
        </div>
    );
}

export default Input;