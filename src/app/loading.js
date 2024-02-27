import Icon from "@/config/icons";

const loading = ({}) => {
    return(
        <span className="d-flex justify-content-center gap-2 text-dark-4 text-sm">
            <div className="d-flex justify-content-center align-items-center animate-spin">
                <Icon.Gear/>
            </div>
            Loading
        </span>
    );
}

export default loading;