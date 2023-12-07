import React, { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import DataTable from "../../../components/DataTable";
import AuthContext from "../../../context/AuthContext";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";


export default function UsersTable() {
  const authContext = useContext(AuthContext);
  const { authTokens } = authContext;
const tableName = "Subcategorie"
  const [subCategorie, setSubCategorie] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false); 
  
  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/v1/Subcategories", {
        headers: {
          Authorization: `Bearer ${authTokens?.access_token}`,
        },
      });
      if (response.status === 200) {
        setSubCategorie(response.data);
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
      .post("http://localhost:3000/v1/Subcategories", data, {
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
        setError("Error: " + error.message);
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
        `http://localhost:3000/v1/Subcategories/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authTokens?.access_token}`,
          },
        }
      );
      if (response.status === 200) {
        setSubCategorie(subCategorie.filter((subCategorie) => subCategorie._id !== id));
        setSuccessMessage("User deleted successfully");
        setOpenSuccess(true); // Open success modal

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage(null);
          setOpenSuccess(false); // Close success modal
        }, 3000);
      } else {
        setError("Failed to delete user");
        setOpenError(true); // Open error modal

        // Clear error message after 3 seconds
        setTimeout(() => {
          clearError();
          setOpenError(false); // Close error modal
        }, 3000);
      }
    } catch (error) {
      setError("Error: " + error.message);
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
      {!isLoading &&(
        <DataTable
        data={subCategorie}
        columns={[
          { field: "_id", label: "id" },
          { field: "subcategory_name", label: "subcategory_name" },
          { field: "category_name", label: "category_name" },
          { field: "active", label: "active",type:"Booleen"},
        ]}
        column={[
          { field: "category_id", label: "category_id" },
          { field: "subcategory_name", label: "subcategory_name" },
        
      
        ]}
        onDelete={deleteUser}
        title="subCategorie List"
        onSave={handleSave}
        dialogTitle="Create subCategorie"
          tableName={tableName}
        />
      )}
    </Box>
  );
}


