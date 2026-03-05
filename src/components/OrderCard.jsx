import { ChefHat, CheckIcon } from "../assets/Icons/Icons";
import { useOrders } from "../contexts/OrderContext";
import "./styles/OrderCard.css";

export const OrderCard = ({ order, isChef }) => {
  const { handleUpdateOrderStatus } = useOrders();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const calculateTotal = () => {
    return order.order_items
      ?.reduce((acc, item) => acc + item.quantity * item.unit_price, 0)
      .toFixed(2);
  };

  return (
    <div className="order-card-premium">
      <section className="img-container-order">
        <img
          src={
            order.order_items?.[0]?.menus?.image ||
            "https://via.placeholder.com/300?text=Pedido"
          }
          alt="Orden"
        />
        <div className={`status-badge-premium ${order.status || "pendiente"}`}>
          {order.status === "pendiente" 
            ? "Por pagar" 
            : order.status === "Listo"
            ? (isChef ? "Platillo terminado" : "Pedido terminado")
            : order.status === "en proceso"
            ? (isChef ? "en proceso" : "platillo en proceso")
            : order.status}
        </div>
      </section>

      <div className="card-content-order">
        <header className="order-header-premium">
          <div className="title-group">
            <h3>Solicitud #{order.id}</h3>
            <span className="buyer-name">{order.buyer_name || "Cliente"}</span>
          </div>
          <span className="price-tag-order">${calculateTotal()}</span>
        </header>

        <section className="order-details-premium">
          <p className="order-date">Fecha: {formatDate(order.created_at)}</p>
          <div className="items-summary-premium">
            {order.order_items?.map((item) => (
              <div key={item.id} className="item-line">
                <span>
                  {item.quantity}x {item.menus?.name}
                </span>
                <span>${(item.quantity * item.unit_price).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {!isChef && order.status !== "Pagado" && order.status !== "Listo" && order.status !== "en proceso" && (
        <div className="order-actions-premium">
          <button
            className="btn-complete-order-premium"
            onClick={() => handleUpdateOrderStatus(order.id, "Pagado")}
          >
            <CheckIcon className="btn-icon-premium" />
            <span>Pedido Pagado</span>
          </button>
        </div>
      )}

      {isChef && order.status === "Pagado" && (
        <div className="order-actions-premium">
          <button
            className="btn-complete-order-premium"
            onClick={() => handleUpdateOrderStatus(order.id, "en proceso")}
          >
            <ChefHat className="btn-icon-premium" />
            <span>Comenzar platillo</span>
          </button>
        </div>
      )}

      {isChef && order.status === "en proceso" && (
        <div className="order-actions-premium">
          <button
            className="btn-complete-order-premium"
            style={{ backgroundImage: "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)" }}
            onClick={() => handleUpdateOrderStatus(order.id, "Listo")}
          >
            <CheckIcon className="btn-icon-premium" />
            <span>Terminar platillo</span>
          </button>
        </div>
      )}
    </div>
  );
};
