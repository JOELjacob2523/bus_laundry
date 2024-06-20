import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { BiSolidLogOutCircle } from "react-icons/bi";

const items = [
  {
    key: 1,
    label: "Profile",
    icon: <CgProfile />,
  },
  {
    key: 2,
    label: "Settings",
    icon: <IoMdSettings />,
  },
  {
    key: 3,
    label: "Logout",
    icon: <BiSolidLogOutCircle />,
  },
];

export default items;
