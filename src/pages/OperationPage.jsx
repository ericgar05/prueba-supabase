import { ModulesCard } from "../components/ModulesCard";
import ModuleDescription from "../components/ModuleDescription";
import {
  OrderIcon,
  InventoryIcon,
  ShoppingIcon,
  CartArrowIcon,
} from "../assets/Icons/Icons";
import "../index.css";

export const OperationPage = () => {
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
  ];
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
