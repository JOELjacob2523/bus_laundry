import { TbWashMachine, TbBus, TbListDetails } from "react-icons/tb";
import { AiFillDatabase } from "react-icons/ai";
import { IoHome } from "react-icons/io5";
import { UserOutlined } from "@ant-design/icons";
import { useAuth } from "../AuthProvider/AuthProvider";
import { useMemo } from "react";

const Items = () => {
  const { authData } = useAuth();

  const items = useMemo(() => {
    const baseItems = [
      {
        key: "1",
        label: "היים",
        icon: <IoHome />,
        path: "",
      },
      {
        key: "2",
        label: "באס און וואשן",
        icon: <TbBus />,
        path: "buses",
      },
      {
        key: "3",
        label: "דעטאלן",
        icon: <TbListDetails />,
        path: "details",
      },
      {
        key: "4",
        label: "אלטע אינפארמאציע",
        icon: <AiFillDatabase />,
        path: "old_data",
      },
    ];

    if (authData.role === "Administrator") {
      baseItems.push({
        key: "5",
        label: "Uaer לייג צו א",
        icon: <UserOutlined />,
        path: "signup",
      });
    }
    return baseItems;
  }, [authData.role]);

  return items;
};

export default Items;
