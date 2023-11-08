import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "../../../components/GestionTableau";// Import the DataTable component

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/v1/users");
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
      }
    };

    fetchData();
  }, []);

  const deleteUser = (id) => {
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
      {!isLoading && !error && users.length > 0 && (
        <DataTable
          data={users}
          columns={[
            { field: "firstName", label: "First Name" },
            { field: "lastName", label: "Last Name" },
            { field: "email", label: "Email" },
            { field: "role", label: "Role" },
          ]}
          column={[
            { field: "firstName", label: "First Name" },
            { field: "lastName", label: "Last Name" },
            { field: "email", label: "Email" }
          ]}
          onDelete={deleteUser}
          title="Users List"
          onSave={handleSave}
        />
      )}
    </>
  );
}
