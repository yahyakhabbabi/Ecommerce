import React, { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import DataTable from "../../../components/DataTable";
import AuthContext from "../../../context/AuthContext";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

export default function OrdersTable() {
  const authContext = useContext(AuthContext);
  const { authTokens } = authContext;
  const tableName = "orders"
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false); 

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/v1/orders", {
        headers: {
          Authorization: `Bearer ${authTokens?.access_token}`,
        },
      });
      if (response.status === 200) {
        const ordersData = response.data.orders.map((order) => ({
                      ...order,
                      order_items: order.order_items.join(", "), 
                      order_date: new Date(order.order_date).toLocaleString(),
                    }));
        setOrders(ordersData);
        setIsLoading(false);
      } else {
        setError("Failed to fetch user data.");
        setIsLoading(false);
      }
    } catch (error) {
      setError("Error: " + error.message);
      setIsLoading(false);
      setOpenError(true); 
    }
  }, [authTokens]);

  useEffect(() => {
    fetchData();
  }, [fetchData, authTokens]);
  const clearError = () => {
    setError(null);
  };
  // const deleteOrders = async (id) => {
  //   try {
  //     const response = await axios.delete(
  //       `http://localhost:3000/v1/orders/${id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${authTokens?.access_token}`,
  //         },
  //       }
  //     );
  //     if (response.status === 200) {
  //       setOrders(orders.filter((order) => order._id !== id));
  //       setSuccessMessage("User deleted successfully");
  //       setOpenSuccess(true); 

       
  //       setTimeout(() => {
  //         setSuccessMessage(null);
  //         setOpenSuccess(false); // Close success modal
  //       }, 3000);
  //     } else {
  //       setError("Failed to delete user");
  //       setOpenError(true); // Open error modal

  //       // Clear error message after 3 seconds
  //       setTimeout(() => {
  //         clearError();
  //         setOpenError(false); // Close error modal
  //       }, 3000);
  //     }
  //   } catch (error) {
  //     setError("Error: " + error.message);
  //     setOpenError(true); // Open error modal

  //     // Clear error message after 3 seconds
  //     setTimeout(() => {
  //       clearError();
  //       setOpenError(false); // Close error modal
  //     }, 3000);
  //   }
  // };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
    <Modal
      open={openSuccess}
      onClose={() => setOpenSuccess(false)}
      closeAfterTransition
    >
      <Fade in={openSuccess}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Alert
            severity="success"
            onClose={() => {
              setSuccessMessage(null);
              setOpenSuccess(false);
            }}
            sx={{ width: "80%" }}
          >
            {successMessage}
          </Alert>
        </Box>
      </Fade>
    </Modal>
    <Modal
      open={openError}
      onClose={() => setOpenError(false)}
      closeAfterTransition
    >
      <Fade in={openError}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Alert
            severity="error"
            onClose={() => {
              clearError();
              setOpenError(false);
            }}
            sx={{ width: "80%" }}
          >
            Error: {error}
          </Alert>
        </Box>
      </Fade>
    </Modal>
      {isLoading && <p>Loading...</p>}
      {!isLoading && !error && orders.length > 0 && (
        <DataTable
          data={orders}
          columns={[
            { field: "firstName", label: "First Name" },
            { field: "lastName", label: "Last Name" },
            // { field: "order_items", label: "Order Items" },
            { field: "order_date", label: "Order Date" },
            { field: "cart_total_price", label: "Cart Total Price" },
            { field: "status", label: "Status" },
          ]}
          column={[
            { field: "firstName", label: "First Name" },
            { field: "lastName", label: "Last Name" },
            { field: "order_items", label: "Order Items" },
            { field: "order_date", label: "Order Date" },
            { field: "cart_total_price", label: "Cart Total Price" },
            { field: "status", label: "Status" },
          ]}
          // onDelete={deleteOrders}
          title="Orders List"
          tableType="order"
          tableName={tableName}
        />
      )}
</Box>
  );
}


