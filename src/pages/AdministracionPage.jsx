import ModuleDescription from "../components/ModuleDescription";
import { ModulesCard } from "../components/ModulesCard";
import { DollarBill, PersonMoney } from "../assets/Icons/Icons";
import { useAuth } from "../contexts/AuthContext";
import { hasAccess } from "../utils/rbac";
import "../index.css";
export const AdministracionPage = () => {
  const { userData } = useAuth();
  const DataCard = [
    {
      icon: <PersonMoney />,
      name: "Nomina & Personal",
      description: "Gestion de Nomina & Personal",
      path: "/administracion/nomina",
    },
  ].filter((card) => hasAccess(userData?.roles, card.path));
  return (
    <>
      <ModuleDescription
        title="Administración"
        description="Gestión integral de los aspectos administrativos y financieros "
      />
      <section className="modules-container">
        {DataCard.map((card) => (
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
