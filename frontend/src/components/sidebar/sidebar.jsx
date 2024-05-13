import "./sidebar.css";
import items from "./sideBarItems";
import Sider from "antd/es/layout/Sider";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const Sidebar = () => {
  // const onClick = (e) => console.log("click ", e);
  return (
    <div className="sider_container">
      <Sider className="sider">
        <Menu
          // onClick={onClick}
          className="sidebar_menu"
          items={items.map((item) => ({
            key: item.key,
            label: item.label,
            icon: item.icon,
            path: <Link to={item.path}>{item.path}</Link>,
          }))}
        />
      </Sider>
    </div>
  );
};

export default Sidebar;
