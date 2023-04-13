import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { adminMenu, userMenu } from "../Sidebar/SIdebarMenuData";
import { Badge, message } from "antd";
import "../Styles/Layout.css";
function Layout({ children }) {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    message.success("Logout Successful");
    navigate("/login");
  };

  // Doctor Menu List
  let doctorMenu = [
    {
      id: 1,
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      id: 2,
      name: "Appointment",
      path: "/appointment",
      icon: "fa-solid fa-list",
    },
    {
      id: 3,
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];

  // side Bar Menu
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;

  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>DOCRTOR</h6>
              <hr />
            </div>
            <div className="menu">
              {SidebarMenu.map((e) => {
                const isActive = location.pathname === e.path;
                return (
                  <div
                    key={e.id}
                    className={`menu-item ${isActive && "active"}`}
                  >
                    <i className={e.icon}></i>
                    <Link to={e.path}>{e.name}</Link>
                  </div>
                );
              })}
              <div className={`menu-item`} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              {/* Header */}
              <div className="header-content" style={{ cursor: "pointer" }}>
                <Badge
                  count={user && user.notification.length}
                  onClick={() => {
                    navigate("/notification");
                  }}
                >
                  {/* <Avatar shape="square" size="large" /> */}
                  <i className="fa-solid fa-bell"></i>
                </Badge>

                <Link to="/profile">{user?.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Layout;
