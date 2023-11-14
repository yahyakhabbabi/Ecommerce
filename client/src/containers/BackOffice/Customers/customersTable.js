import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "../../../components/DataTable";

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
  const handleSave = (data) => {
    // Implement save logic here for the data received from the modal
    // You can use the 'data' parameter to access the form input values
    console.log("Received data from modal:", data);
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
            { field: "valid_account", label: "Valid account",type:"Booleen" },
          ]}
          column={[
            { field: "firstName", label: "First Name" },
            { field: "lastName", label: "Last Name" },
            { field: "email", label: "Email",type:"email" },
            { field: "password", label: "password",type:"password" },
          ]}
          onDelete={deleteCustomer}
          title="Customers List"
          onSave={handleSave}
          dialogTitle="Create Customer"
          tableType="customer"
        />
      )}
    </>
  );
}
