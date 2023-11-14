import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "../../../components/DataTable";


export default function SubCategorieTable() {
  const [subCategorie, setSubCategorie] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/v1/SubCategories");
        if (response.status === 200) {
            setSubCategorie(response.data);
          setIsLoading(false);
        } else {
          setError("Failed to fetch categorie data.");
          setIsLoading(false);
        }
      } catch (error) {
        setError("Error: " + error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteUser = (id) => {};

  const clearError = () => {
    setError(null);
  };

  const handleSave = (data) => {
    axios
      .post("http://localhost:3000/v1/SubCategories", data)
      .then((response) => {
        console.log("User data saved successfully:", response.data);
        setSuccessMessage("User data saved successfully");

        setTimeout(() => {
          setSuccessMessage(null);
        }, 3000);
      })
      .catch((error) => {
        setError("Error: " + error.message);
        console.error("Error saving categorie data:", error);

        setTimeout(() => {
          clearError();
        }, 3000);
      });
  };

  return (
    <>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && (
        <p className="error-message" onClick={clearError}>
          Error: {error}
        </p>
      )}
      {isLoading && <p>Loading...</p>}
      {!isLoading && subCategorie.length > 0 && (
        <DataTable
          data={subCategorie}
          columns={[
            { field: "_id", label: "id" },
            { field: "subcategory_name", label: "subcategory_name" },
            { field: "category_name", label: "category_name" },
            { field: "active", label: "active",type:"Booleen"},
          ]}
          column={[
            { field: "subcategory_name", label: "subcategory_name" },
            { field: "category_id", label: "subcategory_name" },
        
          ]}
          onDelete={deleteUser}
          title="subCategorie List"
          onSave={handleSave}
          dialogTitle="Create subCategorie"
        />
      )}
    </>
  );
}
