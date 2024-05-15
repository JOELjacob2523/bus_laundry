import "./sidebar.css";
import React, { useState } from "react";
import items from "./sideBarItems";
import Sider from "antd/es/layout/Sider";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const onItemClick = (key) => {
    setSelectedItem(key);
  };

  return (
    <div className="sider_container">
      <Sider className="sider">
        <Menu
          className="sidebar_menu"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onSelect={({ key }) => onItemClick(key)}
        >
          {items.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.path} style={{ textDecoration: "none" }}>
                {item.label}
              </Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      {selectedItem &&
        items.find((item) => item.key === selectedItem)?.component}
    </div>
  );
};

export default Sidebar;
