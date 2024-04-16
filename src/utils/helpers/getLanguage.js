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
		case "ts":
			(language.name = "javascript"),
				(language.icon = <Icon.Typescript />);
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
		case "rs":
			(language.name = "rust"), (language.icon = <Icon.Rust />);
			language.version = "1.68.2";
			break;
		case "py":
			(language.name = "python"), (language.icon = <Icon.Python />);
			language.version = "3.10.0";
			break;
		case "lua":
			(language.name = "lua"), (language.icon = <Icon.Lua />);
			language.version = "5.4.4";
			break;
		case "java":
			(language.name = "java"), (language.icon = <Icon.Java />);
			language.version = "15.0.2";
			break;
		default:
			(language.name = "markdown"), (language.icon = <Icon.Md />);
			language.version = "";
			break;
	}

	return language;
};

export default getLanguage;
