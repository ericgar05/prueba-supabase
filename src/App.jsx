import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ProtectedRoute } from "./ProtectedRoute.jsx";
import AppToaster from "./components/AppToaster.jsx";

import { Login } from "./components/Login.jsx";
import { AdministracionPage } from "./pages/AdministracionPage.jsx";
import { NominaPage } from "../submodules/NominaPage.jsx";
import { OperationPage } from "./pages/OperationPage.jsx";
import { NotFoundPage } from "./pages/NotFoundPage.jsx";
import { TableInventory } from "./components/TableInventory.jsx";
import { Withdrawals } from "./components/WithDrawalls.jsx";

import { Inventory } from "../submodules/Inventory.jsx";
import { Orders } from "../submodules/Orders.jsx";

import Register from "./components/Register.jsx";
import { Menu } from "../submodules/Menu.jsx";
import { ChefPage } from "../submodules/ChefPage.jsx";

function App() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/login" && location.pathname !== "/register") {
      localStorage.setItem("lastPath", location.pathname);
    }
  }, [location]);

  return (
    <>
      <AppToaster />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/">
            <Route index element={<OperationPage />} />

            <Route index element={<TableInventory />} />
            <Route path="withdrawals" element={<Withdrawals />} />
            <Route path="inventario" element={<Inventory />}>
                
              <Route index element={<TableInventory />} />
              <Route path="withdrawals" element={<Withdrawals />} />
            </Route>
            <Route path="menu" element={<Menu />} />
            <Route path="pedidos" element={<Orders />} />
            <Route path="chef" element={<ChefPage />} />
          </Route>

          <Route path="/administracion">
            <Route index element={<AdministracionPage />} />
            <Route path="nomina" element={<NominaPage />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
