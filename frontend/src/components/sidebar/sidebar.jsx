import "./sidebar.css";
import React, { useEffect, useState } from "react";
import { useAuth } from "../AuthProvider/AuthProvider";
import Items from "./sideBarItems";
import { Layout, Menu, theme } from "antd";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import PageHeader from "../header/header";
import { Outlet, NavLink } from "react-router-dom";
const { Header, Content, Footer, Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [footerMessage, setFooterMessage] = useState("");
  const items = Items();
  const { authData } = useAuth();

  const onItemClick = (key) => {
    setSelectedItem(key);
  };

  // const isDarkMode = localStorage.getItem("darkMode") === "true";

  // useEffect(() => {
  //   document.body.className = isDarkMode ? "dark_mode" : "light_mode";
  // }, [isDarkMode]);

  useEffect(() => {
    if (authData.role === "Administrator") {
      setFooterMessage(
        <div>
          You are currently logged in as <strong>{authData.role}</strong>. If
          you are an admin, you can manage students and users.
        </div>
      );
    } else if (authData.role === "Manager") {
      setFooterMessage(
        <div>
          You are currently logged in as <strong>{authData.role}</strong>. You
          can view your profile and details and manage students.
        </div>
      );
    } else {
      setFooterMessage(
        <div>
          You are currently logged in as <strong>{authData.role}</strong>. You
          can view your profile and details.
        </div>
      );
    }
  }, [authData.role]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Header className="sidebar_header">
        <PageHeader />
      </Header>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{ position: "relative" }}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            // theme={isDarkMode ? "dark" : "light"}
            mode="inline"
            defaultSelectedKeys={["1"]}
            onSelect={({ key }) => onItemClick(key)}
          >
            {items.map((item) => (
              <Menu.Item key={item.key} icon={item.icon}>
                <NavLink to={item.path} style={{ textDecoration: "none" }}>
                  {item.label}
                </NavLink>
              </Menu.Item>
            ))}
          </Menu>
          <div
            onClick={() => setCollapsed(!collapsed)}
            className="sidebar_collapse_container"
          >
            {collapsed ? <IoIosArrowForward /> : <IoIosArrowBack />}
          </div>
        </Sider>
        <Layout>
          <Content
            style={{
              margin: "0 16px",
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: 725,
                display: "flex",
                alignItems: "center",
                background: colorBgContainer,
                // background: isDarkMode ? "#222" : colorBgContainer,
                // color: isDarkMode ? "#fff" : "#000",
                borderRadius: borderRadiusLG,
              }}
            >
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
      <Layout>
        <Footer
          style={{
            textAlign: "center",
            backgroundColor: "lightgray",
            borderTop: "2px solid #001529",
            zIndex: 1000,
          }}
        >
          <div>{footerMessage}</div>
          <div>
            &copy; Copyright {new Date().getFullYear()} Kadishes Yoel KJ. All
            Rights Reserved.
          </div>
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Sidebar;
