import { AiFillTag, AiFillHome, AiOutlineCheck } from "react-icons/ai";

import { FiCommand } from "react-icons/fi";

import { MdDragIndicator } from "react-icons/md";

import { BiSolidFolderOpen } from "react-icons/bi";

import { FaTrash, FaFile, FaGear, FaCaretRight } from "react-icons/fa6";

import { FaPhp, FaMarkdown, FaJava, FaPython, FaRust, FaTerminal } from "react-icons/fa";

import { SiLua, SiTypescript } from "react-icons/si";

import {
	BsLayoutSidebarInsetReverse,
	BsLayoutSidebarInset,
} from "react-icons/bs";

import { IoIosInformationCircle, IoMdClose } from "react-icons/io";

import { IoLogoJavascript } from "react-icons/io5";

import { BiMinus } from "react-icons/bi";

import { VscGrabber } from "react-icons/vsc";

import { GoDotFill } from "react-icons/go";

const Icon = {
	Tag: AiFillTag,
	SidebarRight: BsLayoutSidebarInsetReverse,
	SidebarLeft: BsLayoutSidebarInset,
	Close: IoMdClose,
	Home: AiFillHome,
	Folder: BiSolidFolderOpen,
	Trash: FaTrash,
	Check: AiOutlineCheck,
	Drag: MdDragIndicator,
	File: FaFile,
	Javascript: IoLogoJavascript,
	Java: FaJava,
	Python: FaPython,
	Lua: SiLua,
	Rust: FaRust,
	Typescript: SiTypescript,
	Php: FaPhp,
	Md: FaMarkdown,
	Gear: FaGear,
	Comma: FiCommand,
	Execute: FaCaretRight,
	Minus: BiMinus,
	Info: IoIosInformationCircle,
	Dot: GoDotFill,
	Terminal: FaTerminal,
	Grab: VscGrabber,
};

export default Icon;
