import { TbWashMachine, TbBus, TbListDetails } from "react-icons/tb";
import { IoHome } from "react-icons/io5";

const items = [
  {
    key: "1",
    label: "היים",
    icon: <IoHome />,
    path: "/",
  },
  {
    key: "2",
    label: "באס",
    icon: <TbBus />,
    path: "/buses",
  },
  {
    key: "3",
    label: "וואשן",
    icon: <TbWashMachine />,
    path: "/mainPage2",
  },
  {
    key: "4",
    label: "דעטאלן",
    icon: <TbListDetails />,
    path: "/details",
  },
];

export default items;
