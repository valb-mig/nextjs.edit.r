const ModalRoot = ({ Id, Show, children }) => {
    return (
        <>
            {Show && (
                <div
                    id={Id}
                    className="flex fixed w-100 h-100 items-center justify-center bg-black bg-opacity-50 ${Show ? '' : 'hidden'}"
                    style={{ zIndex: "999" }}
                >
                    {children}
                </div>
            )}
        </>
    );
};

export default ModalRoot;
