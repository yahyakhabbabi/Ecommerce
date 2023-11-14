import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import MiniDrawer from '../../../components/Sidnevbar';
import Box from '@mui/material/Box';
import Navbar from '../../../components/Navbar';
import Copyright from '../../../components/Footer';
import EditDetails from '../../../components/EditDetails';
import axios from 'axios';

export default function EditUserPage() {
  const { id } = useParams();
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3000/v1/users/${id}`);
      setUserData(response.data.user);
    } catch (error) {
      setError("Error fetching user data: " + error.message);
    }
  }, [id]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleUpdate = async (changedFields) => {
    try {
      await axios.put(`http://localhost:3000/v1/users/${id}`, changedFields);
      // Handle success, e.g., open modal with success message
      setIsModalOpen(true);
    } catch (error) {
      setError('Error updating user data: ' + error.message);
      // Handle error, e.g., open modal with error message
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    // Handle modal close, e.g., update state, navigate to another page, etc.
    console.log('Modal closed');
    setIsModalOpen(false);
  };

  const fields = [
    { field: 'firstName', label: 'First Name', type: 'text' },
    { field: 'lastName', label: 'Last Name', type: 'text' },
    { field: 'email', label: 'Email', type: 'email' },
    { field: 'role', label: 'Role', type: 'text' },
    { field: 'user_name', label: 'User Name', type: 'text' },
    { field: 'active', label: 'Active', type: 'Booleen', option1: 'Yes', option2: 'No' },
  ];

  return (
    <div className="bgcolor">
      <Navbar />
      <Box height={60} />
      <Box sx={{ display: 'flex' }}>
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
