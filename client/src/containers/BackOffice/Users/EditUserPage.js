
import React, { useState, useEffect, useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import MiniDrawer from "../../../components/Sidnevbar";
import Box from "@mui/material/Box";
import Navbar from "../../../components/Navbar";
import Copyright from "../../../components/Footer";
import EditDetails from "../../../components/EditDetails";
import AuthContext from "../../../context/AuthContext";
import axios from "axios";

export default function EditUserPage() {
  const authContext = useContext(AuthContext);
  const { authTokens } = authContext;
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3000/v1/users/${id}`, {
        headers: {
          Authorization: `Bearer ${authTokens?.access_token}`,
        },
      });
      setUserData(response.data.user);
    } catch (error) {
      setError("Error fetching user data: " + error.message);
    }
  }, [authTokens, id]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleUpdate = async (changedFields) => {
    try {
      await axios.put(`http://localhost:3000/v1/users/${id}`, changedFields, {
        headers: {
          Authorization: `Bearer ${authTokens?.access_token}`,
        },
      });
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 3000);
    } catch (error) {
      setError("Error updating user data: " + error.message);
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 3000);
    }
  };
  const handleCloseModal = () => {
    console.log("Modal closed");
    setIsModalOpen(false);
  };

  const fields = [
    { field: "firstName", label: "First Name", type: "text" },
    { field: "lastName", label: "Last Name", type: "text" },
    { field: "email", label: "Email", type: "email" },
    { field: "role", label: "Role", type: "text" },
    { field: "user_name", label: "User Name", type: "text" },
    {
      field: "active",
      label: "Active",
      type: "Booleen",
      option1: "Yes",
      option2: "No",
    },
  ];

  return (
    <div className="bgcolor">
      <Navbar />
      <Box height={60} />
      <Box sx={{ display: "flex" }}>
        <MiniDrawer />
        <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
          <EditDetails
            data={userData}
            onUpdate={handleUpdate}
            onClose={handleCloseModal}
            open={isModalOpen}
            error={error}
            fields={fields}
            title="update users"
            subtitle={`Update User ID: ${id}`}
          />
        </Box>
      </Box>
      <Copyright />
    </div>

  );
}
