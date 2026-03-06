import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { hasAccess } from "./utils/rbac";
import "./pages/styles/protectedRoute.css";
import { Sidebar } from "./components/Sidebar";
import { useState } from "react";

export const ProtectedRoute = () => {
  const { isAuthenticated, userData } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const location = useLocation();
  const currentPath = location.pathname;

  // Protect the route based on role
  if (!hasAccess(userData?.roles, currentPath)) {
    // If they try to access something they shouldn't, redirect to root operation page
    // (Everyone has access to root currently based on our rules)
    if (currentPath !== "/") {
      return <Navigate to="/" replace />;
    }
  }

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <main
        className={sidebarOpen ? "main-container active" : "main-container"}
      >
        {/* <section className="content-menu-hamburger">
            <button onClick={() => setSidebarOpen(!sidebarOpen)}></button>
          </section> */}
        <section className="sidebar-container">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        </section>
        <section className="outlet-container">
          <Outlet />
        </section>
      </main>
    </>
  );
};
