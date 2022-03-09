import React from "react";
import { Layout, Menu, Dropdown } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser, logout } from "features/auth/authSlice";
import { useDispatch } from "react-redux";
import { ProfileOutlined, HomeOutlined } from "@ant-design/icons";

import "./styles.scss";

const { Header, Content } = Layout;

const PuzzleIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    data-prefix="fas"
    data-icon="puzzle-piece"
    className="svg-inline--fa fa-puzzle-piece fa-w-18"
    role="img"
    viewBox="0 0 576 512"
    width="14"
    height="14"
  >
    <path
      fill="currentColor"
      d="M519.442 288.651c-41.519 0-59.5 31.593-82.058 31.593C377.409 320.244 432 144 432 144s-196.288 80-196.288-3.297c0-35.827 36.288-46.25 36.288-85.985C272 19.216 243.885 0 210.539 0c-34.654 0-66.366 18.891-66.366 56.346 0 41.364 31.711 59.277 31.711 81.75C175.885 207.719 0 166.758 0 166.758v333.237s178.635 41.047 178.635-28.662c0-22.473-40-40.107-40-81.471 0-37.456 29.25-56.346 63.577-56.346 33.673 0 61.788 19.216 61.788 54.717 0 39.735-36.288 50.158-36.288 85.985 0 60.803 129.675 25.73 181.23 25.73 0 0-34.725-120.101 25.827-120.101 35.962 0 46.423 36.152 86.308 36.152C556.712 416 576 387.99 576 354.443c0-34.199-18.962-65.792-56.558-65.792z"
    />
  </svg>
);

const MainLayout = ({ children }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  var keyword = location.pathname.replace("/", "");
  const [tab, setTab] = React.useState(keyword || "home");

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/auth/login");
  };

  return (
    <Layout>
      <Header className="main-header">
        <div className="main-menu">
          <Link to="/quiz">
            <div className="logo">
              <img style={{ width: "180px" }} src="/img/logo.png" />
            </div>
          </Link>
          <Menu
            theme="light"
            style={{ paddingLeft: "76px", marginLeft: "38px" }}
            mode="horizontal"
            defaultSelectedKeys={[tab]}
          >
            <Menu.Item key="home" icon={<HomeOutlined />}>
              <Link to="/">Trang chủ</Link>
            </Menu.Item>
            <Menu.Item key="quiz" icon={PuzzleIcon}>
              <Link to="/quiz">Thư viện của tôi</Link>
            </Menu.Item>
            <Menu.Item key="report" icon={<ProfileOutlined />}>
              <Link to="/report">Báo cáo</Link>
            </Menu.Item>
          </Menu>
        </div>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="3" danger>
                <a onClick={handleLogout}>Đăng xuất</a>
              </Menu.Item>
            </Menu>
          }
        >
          <div className="current-user">
            <img width={45} height={45} src={user.picture} />
            <div>{user.name}</div>
          </div>
        </Dropdown>
      </Header>
      <Content>
        <div className="site-layout-content">{children}</div>
      </Content>
    </Layout>
  );
};

export default MainLayout;
