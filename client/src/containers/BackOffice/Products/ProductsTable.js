import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "../../../components/GestionTableau"; // Import the DataTable component

export default function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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
    // Implement delete logic for products here
  };

  return (
    <>
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
            },

            { field: "categoryName", label: "Category Name" },
          ]}
          onDelete={deleteProduct}
          title="Products List"
        />
      )}
    </>
  );
}
