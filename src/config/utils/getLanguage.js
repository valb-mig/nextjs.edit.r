import Icon from "@/config/icons";

const getLanguage = (extension) => {

    let language = {
      icon:<Icon.Close/>,
      name:"undefined"
    };

    switch(extension) {
      case 'js':
        language.name = "javascript",
        language.icon = <Icon.Javascript/>
        break;
      case 'php':
        language.name = "php",
        language.icon = <Icon.Php/>
        break;
      case 'txt':
        language.name = "markdown",
        language.icon = <Icon.File/>
        break;
      default:
        language.name = "markdown",
        language.icon = <Icon.Md/>
        break;
    }

    return language;
}

export default getLanguage;