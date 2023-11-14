import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "../../../components/DataTable"; // Import the DataTable component

export default function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/v1/products");
        if (response.status === 200) {
          setProducts(response.data);
          setIsLoading(false);
        } else {
          setError("Failed to fetch product data.");
          setIsLoading(false);
        }
      } catch (error) {
        setError("Error: " + error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteProduct = (id) => {
  
  };
  const handleSave = (data) => {

    axios
      .post("http://localhost:3000/v1/products", data)
      .then((response) => {

        console.log("User data saved successfully:", response.data);
        setSuccessMessage("User data saved successfully.");
    
      })
      .catch((error) => {
      
        console.error("Error saving user data:", error);
       
      });
  };

  return (
    <>
     {successMessage && <p>{successMessage}</p>}
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && !error && products.length > 0 && (
         
        <DataTable
       
          data={products}
          columns={[
            { field: "sku", label: "SKU" },
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
          ]}
          onDelete={deleteProduct}
          title="Products List"
          onSave={handleSave}
          dialogTitle="Create Product"
        />
      )}
    </>
  );
}
