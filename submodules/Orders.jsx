import { useOrders } from "../src/contexts/OrderContext";
import { OrderCard } from "../src/components/OrderCard";
import { ChefHat } from "../src/assets/Icons/Icons";
import "./styles/Orders.css";

export function Orders() {
  const { ordersData } = useOrders();

  // Renderizamos todos los pedidos para la lista de órdenes 
  const visibleOrders = ordersData.filter(
    (order) => order.status === "pendiente" || order.status === "Pagado" || order.status === "en proceso" || order.status === "Listo"
  );

  return (
    <main className="orders-page">
      <section className="orders-container">
        {visibleOrders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
        {visibleOrders.length === 0 && (
          <div className="no-orders">
            <p>No hay pedidos registrados.</p>
          </div>
        )}
      </section>
    </main>
  );
}
