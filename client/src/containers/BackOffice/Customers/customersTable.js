import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "../../../components/GestionTableau";

export default function CustomerTable() {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/v1/customers");
        if (response.status === 200) {
          setCustomers(response.data);
          setIsLoading(false);
        } else {
          setError("Failed to fetch customer data.");
          setIsLoading(false);
        }
      } catch (error) {
        setError("Error: " + error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const deleteCustomer = (id) => {
    // Implement delete logic here
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && !error && customers.length > 0 && (
        <DataTable
          data={customers}
          columns={[
            { field: "firstName", label: "First Name" },
            { field: "lastName", label: "Last Name" },
            { field: "email", label: "Email" },
            { field: "valid_account", label: "Valid account" },
          ]}
          onDelete={deleteCustomer}
          title="Customers List"
        />
      )}
    </>
  );
}
