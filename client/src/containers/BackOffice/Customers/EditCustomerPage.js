import React, { useState, useEffect, useCallback,useContext } from 'react';
import { useParams } from 'react-router-dom';
import MiniDrawer from '../../../components/Sidnevbar';
import Box from '@mui/material/Box';
import Navbar from '../../../components/Navbar';
import EditDetails from '../../../components/EditDetails';
import AuthContext from "../../../context/AuthContext";
import axios from 'axios';

export default function EditCustomerPage() {
  const authContext = useContext(AuthContext);
  const { authTokens } = authContext;
  const { id } = useParams();
  const [customerData, setCustomerData] = useState({});
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successMessage, /* setSuccessMessage */] = useState(null);

  const fetchCustomerData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3000/v1/customers/${id}`, {
        headers: {
          Authorization: `Bearer ${authTokens?.access_token}`,
        },
      });
      setCustomerData(response.data);
    } catch (error) {
      setError("Error fetching customer data: " + error.message);
    }
  }, [authTokens,id]);

  useEffect(() => {
    fetchCustomerData();
  }, [fetchCustomerData]);

  const handleUpdate = async (changedFields) => {
    try {
      await axios.put(`http://localhost:3000/v1/customers/${id}`, changedFields);
      // Handle success
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 3000);
    } catch (error) {
      setError('Error updating user data: ' + error.message);
      // Handle error, e.g., open modal with error message
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 3000);
    }}

  const handleCloseModal = () => {
    // Handle modal close, e.g., update state, navigate to another page, etc.
    console.log('Modal closed');
    setIsModalOpen(false);
  };

  const fields = [
    { field: 'firstName', label: 'First Name', type: 'text' },
    { field: 'lastName', label: 'Last Name', type: 'text' },
    { field: 'email', label: 'Email', type: 'email' },
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
            data={customerData}
            onUpdate={handleUpdate}
            onClose={handleCloseModal}
            open={isModalOpen}
            error={error || successMessage}
            fields={fields}
            title="Update Customer"
            subtitle={`Update Customer ID: ${id}`}
          />
        </Box>
      </Box>
    </div>
  );
}
