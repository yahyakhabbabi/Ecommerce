import React, { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import DataTable from "../../../components/DataTable";
import AuthContext from "../../../context/AuthContext";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import "./users.css";

export default function UsersTable() {
  const authContext = useContext(AuthContext);
  const { authTokens } = authContext;
  const tableName = "users"
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false); 

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/v1/users", {
        headers: {
          Authorization: `Bearer ${authTokens?.access_token}`,
        },
      });
      if (response.status === 200) {
        setUsers(response.data.users);
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

  const handleSave = (data) => {
    axios
      .post("http://localhost:3000/v1/users", data, {
        headers: {
          Authorization: `Bearer ${authTokens?.access_token}`,
        },
      })
      .then((response) => {
        console.log("User data saved successfully:", response.data);
        setSuccessMessage("User data saved successfully");
        setOpenSuccess(true); // Open success modal

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage(null);
          setOpenSuccess(false);
        }, 3000);

        fetchData();
      })
      .catch((error) => {
        setError("Error: " + error.response.data.message);
        console.error("Error saving user data:", error);
        setOpenError(true); // Open error modal

        // Clear error message after 3 seconds
        setTimeout(() => {
          clearError();
          setOpenError(false); // Close error modal
        }, 3000);
      });
  };

  const clearError = () => {
    setError(null);
  };

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/v1/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authTokens?.access_token}`,
          },
        }
      );
      if (response.status === 200) {
        setUsers(users.filter((user) => user._id !== id));
        setSuccessMessage("User deleted successfully");
        setOpenSuccess(true); 
        setTimeout(() => {
          setSuccessMessage(null);
          setOpenSuccess(false);
        }, 3000);
      } else {
        setError("Failed to delete user");
        setOpenError(true); //

        // Clear error message after 3 seconds
        setTimeout(() => {
          clearError();
          setOpenError(false); // Close error modal
        }, 3000);
      }
    } catch (error) {
      console.log(error)
      setError("Error: " + error.response.data.message);
      setOpenError(true); // Open error modal

      // Clear error message after 3 seconds
      setTimeout(() => {
        clearError();
        setOpenError(false); // Close error modal
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
      {!isLoading && users.length > 0 && (
        <DataTable
          data={users}
          columns={[
            { field: "firstName", label: "First Name" },
            { field: "lastName", label: "Last Name" },
            { field: "email", label: "Email" },
            { field: "role", label: "Role" },
          ]}
          column={[
            { field: "user_name", label: "Username" },
            { field: "firstName", label: "First Name" },
            { field: "lastName", label: "Last Name" },
            { field: "email", label: "Email", type: "email" },
            {
              field: "role",
              label: "Role",
              type: "Booleen",
              option1: "Admin",
              option2: "Manager",
            },
            { field: "password", label: "Password", type: "password" },
          ]}
          onDelete={deleteUser}
          title="Users List"
          onSave={handleSave}
          dialogTitle="Create User"
          tableName={tableName}
        />
      )}
    </Box>
  );
}
