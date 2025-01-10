import { CgProfile } from "react-icons/cg";
import { IoMdSettings } from "react-icons/io";
import { CiLogout } from "react-icons/ci";

const items = [
  {
    key: 1,
    label: <div style={{ fontSize: "medium" }}>Profile</div>,
    icon: <CgProfile style={{ fontSize: "large" }} />,
  },
  {
    key: 2,
    label: <div style={{ fontSize: "medium" }}>Settings</div>,
    icon: <IoMdSettings style={{ fontSize: "large" }} />,
  },
  {
    key: 3,
    label: <div style={{ fontSize: "medium" }}>Logout</div>,
    icon: <CiLogout style={{ fontSize: "large" }} />,
  },
];

export default items;
