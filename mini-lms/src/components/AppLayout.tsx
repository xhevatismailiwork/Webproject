import { Layout, Menu } from "antd";
import {
  UserOutlined,
  BookOutlined,
  TeamOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";

const { Header, Sider, Content } = Layout;

const AppLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { key: "/students", icon: <TeamOutlined />, label: <Link to="/students">Students</Link> },
    { key: "/courses", icon: <BookOutlined />, label: <Link to="/courses">Courses</Link> },
    { key: "/enrollments", icon: <UserOutlined />, label: <Link to="/enrollments">Enrollments</Link> },
    { key: "/profile", icon: <ProfileOutlined />, label: <Link to="/profile">Profile</Link> },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div
          style={{
            height: 64,
            margin: 16,
            background: "rgba(255, 255, 255, 0.2)",
            borderRadius: 8,
            textAlign: "center",
            lineHeight: "64px",
            color: "#fff",
            fontWeight: "bold",
          }}
        >
          LMS
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
        />
      </Sider>

      {/* Main content */}
      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 16px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 2px 8px #f0f1f2",
          }}
        >
          <h1 style={{ margin: 0, fontSize: 18 }}>📊 Mini LMS Dashboard</h1>
          <div>Welcome, User</div>
        </Header>

        <Content style={{ margin: "16px", padding: 24, background: "#fff", borderRadius: 8 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
