import React, { useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import DataTable from "../../../components/DataTable";
import AuthContext from "../../../context/AuthContext";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

export default function ProductsTable() {
  const authContext = useContext(AuthContext);
  const { authTokens } = authContext;
  const tableName = "products"
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false); 

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/v1/products", {
        headers: {
          Authorization: `Bearer ${authTokens?.access_token}`,
        },
      });
      if (response.status === 200) {
        setProducts(response.data);
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
  const handleSave = async (data, imageFile) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
  
      if (imageFile) {
        formData.append("product_image", imageFile);
      }
  
      const response = await axios.post("http://localhost:3000/v1/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authTokens?.access_token}`,
        },
      });
  
      console.log("Product created successfully:", response.data);
      setSuccessMessage("Product saved successfully");
      setOpenSuccess(true); // Open success modal
  
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage(null);
        setOpenSuccess(false);
      }, 3000);
  
      fetchData();
      // Handle success message or any other logic after product creation
    } catch (error) {
      console.error("Error creating product:", error);
      setError("Error: " + error.message);
      setOpenError(true); // Open error modal
  
      // Clear error message after 3 seconds
      setTimeout(() => {
        setError(null);
        setOpenError(false); // Close error modal
      }, 3000);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/v1/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${authTokens?.access_token}`,
          },
        }
      );
      if (response.status === 200) {
        setProducts(products.filter((product) => product._id !== id));
        setSuccessMessage("products deleted successfully");
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
      {!isLoading && (
         
        <DataTable
       
          data={products}
          columns={[
            { field: "product_image", label: "product_image",type:"Image" },
            { field: "product_name", label: "Product Name" },
            { field: "price", label: "Price" },
            { field: "discount_price", label: "Discount Price" },
            { field: "options", label: "Options" },
            {
              field: "active",
              label: "Active",
              type:"Booleen"
            },
            { field: "categoryName", label: "Category Name" },
          ]}
          column={[
            { field: "sku", label: "SKU" },
            { field: "product_name", label: "Product Name" },
            { field: "subcategory_id", label: "subcategory_id" },
            { field: "price", label: "Price" },
            { field: "discount_price", label: "Discount Price" },
            { field: "options", label: "Options" },
            {
              field: "short_description",label: "short_description"
            },
            {
              field: "long_description",label: "long_description"
            },

            { field: "quantity", label: "quantity" },
            {field:"product_image",label:"product_image",type:"image"}
          ]}
          onDelete={deleteProduct}
          title="Products List"
          onSave={handleSave}
          dialogTitle="Create Product"
          tableName={tableName}
        />
      )}
    </Box>
  );
}
