import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "../../../components/DataTable";


export default function CategorieTable() {
  const [categorie, setCategorie] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/v1/categories");
        if (response.status === 200) {
          setCategorie(response.data);
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
      .post("http://localhost:3000/v1/categories", data)
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
      {!isLoading && categorie.length > 0 && (
        <DataTable
          data={categorie}
          columns={[
            { field: "_id", label: "id" },
            { field: "category_name", label: "category_name" },
            { field: "active", label: "active",type:"Booleen"},
          ]}
          column={[
            { field: "category_name", label: "category_name" },
        
          ]}
          onDelete={deleteUser}
          title="Categorie List"
          onSave={handleSave}
          dialogTitle="Create Categorie"
        />
      )}
    </>
  );
}
