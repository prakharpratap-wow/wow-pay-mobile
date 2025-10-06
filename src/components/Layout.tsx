// src/components/Layout.tsx
import React from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { History, Home, Settings } from "lucide-react";
import NavItem from "./Nav"; // Assuming this is your existing NavItem
import wowPayLogo from "../assets/wow-logo.png"; // Adjust path as necessary
import "../App.scss"; // Assuming styles are here

const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Define routes that should NOT have the Header/BottomNav
  const hideLayoutRoutes = ["/login"];
  const isPublicRoute = hideLayoutRoutes.includes(location.pathname);

  // If on a public route, just render the content of the nested route
  if (isPublicRoute) {
    return <Outlet />;
  }

  // Render the full layout for protected routes
  return (
    <div className="app-container">
      {/* Header (Hidden only on /history) */}
      {location.pathname !== "/history" && (
        <div className="header">
          <div></div>
          <div className="header-title">
            <img
              src={wowPayLogo}
              style={{ width: "100px" }}
              alt="WowPay Logo"
            />
          </div>
          <div
            className="header-settings-btn"
            onClick={() => navigate("/settings")}
          >
            <Settings size={24} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div
        className="main-content"
        style={{
          // Use Outlet to render the actual route component (Home, History, Settings)
          justifyContent:
            location.pathname !== "/history" ? "center" : undefined,
        }}
      >
        <Outlet />
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        <div className="nav-items">
          <NavItem
            icon={<Home />}
            label="Home"
            active={location.pathname === "/home"}
            onClick={() => navigate("/home")}
          />
          <NavItem
            icon={<History />}
            label="History"
            active={location.pathname === "/history"}
            onClick={() => navigate("/history")}
          />
          <NavItem
            icon={<Settings />}
            label="Settings"
            active={location.pathname === "/settings"}
            onClick={() => navigate("/settings")}
          />
        </div>
      </nav>
    </div>
  );
};

export default Layout;
