import "./header.css";
import React from "react";
import { Layout } from "antd";
import HebrewDate from "../hebrewDate/hebrewDate";
const { Header } = Layout;

const PageHeader = () => (
  <Layout className="layout">
    <div className="header_container">
      <Header className="header">
        <div className="hebrew_date">
          <HebrewDate />
        </div>
      </Header>
    </div>
    {/* <Content>Content</Content>
        <Footer>Footer</Footer> */}
  </Layout>
);
export default PageHeader;
