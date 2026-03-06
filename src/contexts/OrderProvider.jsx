import { useState, useEffect } from "react";
import supabase from "../api/supaBase";
import { OrderContext } from "./OrderContext";
import { sileo } from "sileo";

export const OrderProvider = ({ children }) => {
  const [ordersData, setOrdersData] = useState([]);

  const fetchOrders = async () => {
    // Obtenemos los pedidos con sus items y la info del platillo asociada
    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        id,
        buyer_name,
        payment_type,
        status,
        created_at,
        order_items (
          id,
          quantity,
          unit_price,
          menus (
            name,
            image
          )
        )
      `,
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      sileo.error("Error al obtener los pedidos");
      return;
    }

    setOrdersData(data);
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);

    if (error) {
      console.error(error);
      sileo.error("Error al actualizar el estado del pedido");
      return;
    }

    if (newStatus === "Pagado") {
      sileo.success("Orden pagada");
    } else {
      sileo.success(`Pedido #${orderId} actualizado a ${newStatus}`);
    }
    setOrdersData((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order,
      ),
    );
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <OrderContext.Provider
      value={{ ordersData, fetchOrders, handleUpdateOrderStatus }}
    >
      {children}
    </OrderContext.Provider>
  );
};
