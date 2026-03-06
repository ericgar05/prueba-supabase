import { useOrders } from "../src/contexts/OrderContext";
import { OrderCard } from "../src/components/OrderCard";
import { ChefHat } from "../src/assets/Icons/Icons";
import { BackButton } from "../src/components/BackButton";
import "./styles/Orders.css";

export function Orders() {
  const { ordersData } = useOrders();

  const ordersToPay = ordersData.filter(
    (order) => order.status === "pendiente",
  );

  const ordersPaid = ordersData.filter(
    (order) =>
      order.status === "Pagado" ||
      order.status === "en proceso" ||
      order.status === "Listo",
  );

  return (
    <main className="orders-page">
      <BackButton />

      <div className="chef-sections">
        <h2 className="chef-section-title">Por Pagar</h2>
        <section className="orders-container">
          {ordersToPay.length > 0 ? (
            ordersToPay.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <div className="no-orders">
              <p>No hay pedidos pendientes de pago.</p>
            </div>
          )}
        </section>

        <h2 className="chef-section-title" style={{ marginTop: "2rem" }}>
          Pagados / En proceso
        </h2>
        <section className="orders-container">
          {ordersPaid.length > 0 ? (
            ordersPaid.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
          ) : (
            <div className="no-orders">
              <p>No hay pedidos pagados aún.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
