import { useOrders } from "../src/contexts/OrderContext";
import { OrderCard } from "../src/components/OrderCard";
import { BackButton } from "../src/components/BackButton";
import "./styles/Orders.css";

export const ChefPage = () => {
  const { ordersData } = useOrders();

  const chefOrders = ordersData.filter(
    (order) =>
      order.status === "Pagado" ||
      order.status === "en proceso" ||
      order.status === "Listo",
  );

  return (
    <main className="orders-page">
      <BackButton />
      <section className="orders-container">
        {chefOrders.map((order) => (
          <OrderCard key={order.id} order={order} isChef={true} />
        ))}
        {chefOrders.length === 0 && (
          <div className="no-orders">
            <p>No hay pedidos listos para preparar (Pendientes de pago).</p>
          </div>
        )}
      </section>
    </main>
  );
};
