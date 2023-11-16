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
  const [userProducts, setUserProducts] = useState({});
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchproductsData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:3000/v1/products/${id}`);
      setUserProducts(response.data);
    } catch (error) {
      setError("Error fetching user data: " + error.message);
    }
  }, [id]);

  useEffect(() => {
    fetchproductsData();
  }, [fetchproductsData]);

  const handleUpdate = async (changedFields) => {
    try {
      await axios.patch(`http://localhost:3000/v1/products/${id}`, changedFields);
      // Handle success, e.g., open modal with success message
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 3000);
    } catch (error) {
      setError('Error updating products data: ' + error.message);
      // Handle error, e.g., open modal with error message
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
      }, 3000);
    }
  };

  const handleCloseModal = () => {
    // Handle modal close, e.g., update state, navigate to another page, etc.
    console.log('Modal closed');
    setIsModalOpen(false);
  };

  const fields = [
    { field: "product_image", label: "product_image",type:"Image" },
    { field: "product_name", label: "Product Name",type:"text" },
    { field: "price", label: "Price",type:"text" },
    { field: "discount_price", label: "Discount Price",type:"text" },
    { field: "options", label: "Options",type:"text" },
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
            data={userProducts}
            onUpdate={handleUpdate}
            onClose={handleCloseModal}
            open={isModalOpen}
            error={error}
            fields={fields}
            title="update products"
            subtitle={`Update products ID: ${id}`}
          />
        </Box>
      </Box>
      <Copyright />
    </div>
  );
}
