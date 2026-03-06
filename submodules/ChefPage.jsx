import { useOrders } from "../src/contexts/OrderContext";
import { OrderCard } from "../src/components/OrderCard";
import { BackButton } from "../src/components/BackButton";
import "./styles/Orders.css";

export const ChefPage = () => {
  const { ordersData } = useOrders();

  const ordersToDo = ordersData.filter(
    (order) => order.status === "Pagado" || order.status === "en proceso",
  );

  const ordersDone = ordersData.filter((order) => order.status === "Listo");

  return (
    <main className="orders-page">
      <BackButton />

      <div className="chef-sections">
        <h2 className="chef-section-title">Por Hacer</h2>
        <section className="orders-container">
          {ordersToDo.length > 0 ? (
            ordersToDo.map((order) => (
              <OrderCard key={order.id} order={order} isChef={true} />
            ))
          ) : (
            <div className="no-orders">
              <p>No hay pedidos pendientes de preparar.</p>
            </div>
          )}
        </section>

        <h2 className="chef-section-title" style={{ marginTop: "2rem" }}>
          Completados
        </h2>
        <section className="orders-container">
          {ordersDone.length > 0 ? (
            ordersDone.map((order) => (
              <OrderCard key={order.id} order={order} isChef={true} />
            ))
          ) : (
            <div className="no-orders">
              <p>No hay pedidos completados aún.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};
