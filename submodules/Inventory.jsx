import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import StatsCard from "../src/components/StatsCard.jsx";
import { InventoryIcon } from "../src/assets/Icons/Icons.jsx";
import Header from "../src/components/Header.jsx";
import { Preview } from "../src/components/Preview.jsx";
import supabase from "../src/api/supaBase.js";
import { BackButton } from "../src/components/BackButton.jsx";
import "./Inventory.css";

export function Inventory() {
  const [statsData, setStatsData] = useState({
    products: 0,
    categories: 0,
    movements: 0,
  });

  const fetchStats = async () => {
    const { count: countProducts } = await supabase
      .from("products_inventory")
      .select("*", { count: "exact", head: true });

    const { count: countCategories } = await supabase
      .from("categories")
      .select("*", { count: "exact", head: true });

    const { count: countMovements } = await supabase
      .from("inventory_movements")
      .select("*", { count: "exact", head: true });

    setStatsData({
      products: countProducts || 0,
      categories: countCategories || 0,
      movements: countMovements || 0,
    });
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const stats = [
    {
      title: "Total Productos",
      value: statsData.products,
      icon: <InventoryIcon />,
    },
    {
      title: "Categorias",
      value: statsData.categories,
      icon: <InventoryIcon />,
    },
    {
      title: "Total Movimientos",
      value: statsData.movements,
      icon: <InventoryIcon />,
    },
  ];

  const tabs = [
    { path: "/inventario", label: "Inventario" },
    {
      path: "/inventario/withdrawals",
      label: "Historial de Movimientos",
    },
  ];
  const [activeTab, setActiveTab] = useState("/inventario");

  const handleTabChange = (tab) => {
    setActiveTab(tab.path);
  };
  return (
    <main className="inventory-container">
      <BackButton />
      <section className="stats-container">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
          />
        ))}
      </section>

      <section className="add-inventory-container">
        <Header tabs={tabs} />
        <section className="inventory-outlet-wrapper">
          <Outlet context={{ updateStats: fetchStats }} />
        </section>
      </section>
    </main>
  );
}
