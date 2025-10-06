import React, { ReactElement } from "react";

type NavItemProps = {
  icon: ReactElement<{ size?: number }>;
  label: string;
  active: boolean;
  onClick: () => void;
};

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => (
  <div className={`nav-item ${active ? "active" : ""}`} onClick={onClick}>
    {React.cloneElement(icon, { size: 24 })}
    <span style={{ fontSize: "12px", marginTop: "4px" }}>{label}</span>
  </div>
);

export default NavItem;
