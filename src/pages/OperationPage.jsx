import { ModulesCard } from "../components/ModulesCard";
import ModuleDescription from "../components/ModuleDescription";
import {
  OrderIcon,
  InventoryIcon,
  ShoppingIcon,
  CartArrowIcon,
} from "../assets/Icons/Icons";
import { useAuth } from "../contexts/AuthContext";
import { hasAccess } from "../utils/rbac";
import "../index.css";

export const OperationPage = () => {
  const { userData } = useAuth();
  const CardData = [
    {
      icon: <InventoryIcon />,
      name: "Inventario",
      description: "Gestion de Inventario",
      path: "/inventario",
    },
    {
      icon: <OrderIcon />,
      name: "Pedidos",
      description: "Gestion de Pedidos",
      path: "/pedidos",
    },
    {
      icon: <CartArrowIcon />,
      name: "Menu",
      description: "Gestion de Compras",
      path: "/menu",
    },
    {
      icon: <OrderIcon />,
      name: "Chef",
      description: "Pedidos en Cocina",
      path: "/chef",
    },
  ].filter((card) => hasAccess(userData?.roles, card.path));
  return (
    <>
      <ModuleDescription
        title="Operaciones"
        description="Gestión y control integral de las operaciones"
      />
      <section className="modules-container">
        {CardData.map((card) => (
          <ModulesCard
            key={card.name}
            icon={card.icon}
            name={card.name}
            description={card.description}
            path={card.path}
          />
        ))}
      </section>
    </>
  );
};
