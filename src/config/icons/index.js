import { AiFillTag, AiFillHome, AiOutlineCheck } from "react-icons/ai";

import { FiCommand } from "react-icons/fi";

import { MdDragIndicator } from "react-icons/md";

import { BiSolidFolderOpen } from "react-icons/bi";

import { FaTrash, FaFile, FaGear, FaCaretRight } from "react-icons/fa6";

import { FaPhp, FaMarkdown, FaTerminal } from "react-icons/fa";

import {
    BsLayoutSidebarInsetReverse,
    BsLayoutSidebarInset,
} from "react-icons/bs";

import { IoIosInformationCircle, IoMdClose } from "react-icons/io";

import { IoLogoJavascript } from "react-icons/io5";

import { BiMinus } from "react-icons/bi";

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
    Php: FaPhp,
    Md: FaMarkdown,
    Gear: FaGear,
    Comma: FiCommand,
    Execute: FaCaretRight,
    Minus: BiMinus,
    Info: IoIosInformationCircle,
    Dot: GoDotFill,
    Terminal: FaTerminal,
};

export default Icon;
