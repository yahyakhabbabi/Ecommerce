import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "../../../components/GestionTableau"; // Import the DataTable component

export default function OrdersTable() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/v1/orders");
        if (response.status === 200) {
          const ordersData = response.data.orders.map((order) => ({
            ...order,
            order_items: order.order_items.join(", "), // Convert order_items array to a string
            order_date: new Date(order.order_date).toLocaleString(), // Format order_date as a readable date string
          }));
          setOrders(ordersData);
          setIsLoading(false);
        } else {
          setError("Failed to fetch order data.");
          setIsLoading(false);
        }
      } catch (error) {
        setError("Error: " + error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteOrder = (id) => {
    // Implement delete logic here
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && !error && orders.length > 0 && (
        <DataTable
          data={orders}
          columns={[
            { field: "firstName", label: "First Name" },
            { field: "lastName", label: "Last Name" },
            { field: "order_items", label: "Order Items" },
            { field: "order_date", label: "Order Date" },
            { field: "cart_total_price", label: "Cart Total Price" },
            { field: "status", label: "Status" },
          ]}          
          onDelete={deleteOrder}
          title="Orders List"
        />
      )}
    </>
  );
}
