import React, { useEffect, useState, useCallback, useContext } from "react";
import axios from "axios";
import DataTable from "../../../components/DataTable";
import AuthContext from "../../../context/AuthContext";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

export default function CustomerTable() {
  const tableName = "customers";
  const authContext = useContext(AuthContext);
  const { authTokens } = authContext;
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/v1/customers", {
        headers: {
          Authorization: `Bearer ${authTokens?.access_token}`,
        },
      });
      if (response.status === 200) {
        setCustomers(response.data);
        setIsLoading(false);
      } else {
        throw new Error("Failed to fetch user data.");
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

  const handleDeleteCustomer = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/v1/customers/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authTokens?.access_token}`,
          },
        }
      );
      if (response.status === 200) {
        setCustomers(customers.filter((customer) => customer._id !== id));
        setSuccessMessage("User deleted successfully");
        setOpenSuccess(true);

        setTimeout(() => {
          setSuccessMessage(null);
          setOpenSuccess(false);
        }, 3000);
      } else {
        throw new Error("Failed to delete user");
      }
    } catch (error) {
      setError("Error: " + error.message);
      setOpenError(true);

      setTimeout(() => {
        clearError();
        setOpenError(false);
      }, 3000);
    }
  };

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
      {error && <p>Error: {error}</p>}
      {!isLoading && !error && customers.length > 0 && (
        <DataTable
          data={customers}
          columns={[
            { field: "firstName", label: "First Name" },
            { field: "lastName", label: "Last Name" },
            { field: "email", label: "Email" },
            { field: "valid_account", label: "Valid account", type: "Booleen" },
          ]}
          column={[
            { field: "firstName", label: "First Name" },
            { field: "lastName", label: "Last Name" },
            { field: "email", label: "Email" },
            { field: "valid_account", label: "Valid account", type: "Boolean" },
          ]}
          onDelete={handleDeleteCustomer}
          title="Customers List"
          dialogTitle="Create Customer"
          tableType="customer"
          tableName={tableName}
        />
      )}
    </Box>
  );
}
