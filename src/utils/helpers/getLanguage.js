import Icon from "@/config/icons";

const getLanguage = (extension) => {
	let language = {
		icon: <Icon.Close />,
		name: "undefined",
		version: "",
	};

	switch (extension) {
		case "js":
			(language.name = "javascript"),
				(language.icon = <Icon.Javascript />);
			language.version = "18.15.0";
			break;
		case "php":
			(language.name = "php"), (language.icon = <Icon.Php />);
			language.version = "8.2.3";
			break;
		case "txt":
			(language.name = "markdown"), (language.icon = <Icon.File />);
			language.version = "";
			break;
		default:
			(language.name = "markdown"), (language.icon = <Icon.Md />);
			language.version = "";
			break;
	}

	return language;
};

export default getLanguage;
