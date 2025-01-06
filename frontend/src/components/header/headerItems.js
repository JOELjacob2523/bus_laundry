import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { CiLogout } from "react-icons/ci";

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
    icon: <CiLogout />,
  },
];

export default items;
