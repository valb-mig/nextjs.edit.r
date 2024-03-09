const Input = ({ Icon, Value, Name, formState, OnChange }) => {
  return (
    <div className="flex align-items-center gap-1 rounded p-2 text-white bg-dark-1">
      <span>{Icon}</span>
      <input
        type="text"
        value={Value}
        className="w-full bg-transparent outline-none"
        {...(formState !== undefined && formState(Name))}
        autoFocus={true}
        onChange={(e) => OnChange(e)}
      />
    </div>
  );
};

export default Input;
