import { CircleArrowLeft, CircleArrowRight } from "../assets/Icons/Icons";
import { NavLink } from "react-router-dom";
import { useState } from "react";

import "./Sidebar.css";
import {
  BriefCase,
  ClipboardList,
  Utensils,
  ExitIcons,
} from "../assets/Icons/Icons";
import { useAuth } from "../contexts/AuthContext";
import { hasAccess } from "../utils/rbac";

export const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { handleLogout, userData } = useAuth();
  const handleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  const links = [
    { to: "/", name: "operaciones", icon: <Utensils /> },
    { to: "/administracion", name: "Administracion", icon: <BriefCase /> },
  ].filter((link) => hasAccess(userData?.roles, link.to));

  return (
    <aside className={!sidebarOpen ? "minimized" : ""}>
      <header>
        <img src="/isotipo.svg" alt="QuickFire Logo" className="logo-image" />
        <div className="header-text">
          <h1>
            QUICK<span>FIRE</span>
          </h1>
          <h3>KITCHEN</h3>
          <h4>Sistema de Gestión</h4>
        </div>
      </header>
      <nav>
        <button onClick={handleSidebar} className="toggle-sidebar">
          {sidebarOpen ? <CircleArrowLeft /> : <CircleArrowRight />}
        </button>
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <NavLink to={link.to}>
                {link.icon} <label>{link.name}</label>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <footer className="footer-sidebar">
        <button onClick={handleLogout}>
          <ExitIcons /> <label>Cerrar Sesión</label>
        </button>
      </footer>
    </aside>
  );
};
